import { DEFAULT_SLUG } from '@/constants'
import { Article, Template } from '@/payload-types'
import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import { getPreviewUser } from './preview'
import { getDefaultTemplate } from './template'

export const getArticlesSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'articles',
      select: {
        slug: true,
      },
      // Only published articles may be prerendered — see the note in `data/page.ts`.
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 10,
    })

    const slugs = data.docs.map((doc) => getSiteSlug(doc.slug))
    return slugs.length > 0 ? slugs : [DEFAULT_SLUG]
  } catch {
    return [DEFAULT_SLUG]
  }
})

/**
 * The published article, for the public. Cached and prerendered.
 */
export const getArticle = cache(async (slug: string, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', 'pages:articles', `pages:articles:${slug}`)

  try {
    const payload = await getPayload({ config })

    const articles = await payload.find({
      collection: 'articles',
      locale: getTypedLocale(locale),
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      depth: 2, // Populate template and media relationships
      limit: 1,
      pagination: false,
    })

    return articles.docs[0] ?? null
  } catch {
    return null
  }
})

/**
 * The latest version of an article for draft-mode previews, gated by
 * `canReadStaged` — see `getPreviewPage` for why this is not a cached function,
 * and why it falls back to the published article instead of returning nothing.
 */
export const getPreviewArticle = cache(async (slug: string, locale: string) => {
  const user = await getPreviewUser()

  if (user) {
    try {
      const payload = await getPayload({ config })

      const articles = await payload.find({
        collection: 'articles',
        locale: getTypedLocale(locale),
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2, // Populate template and media relationships
        limit: 1,
        pagination: false,
        draft: true,
        user,
        overrideAccess: false,
      })

      if (articles.docs[0]) return articles.docs[0]
    } catch {
      // Fall through to the published article.
    }
  }

  return getArticle(slug, locale)
})

export type ArticleWithTemplate = Article & {
  resolvedTemplate: Template | null
}

/**
 * Resolves the template an article should render with.
 * If the article has a custom layout enabled, no template is resolved.
 * If the article has a selected template, that template is used.
 * Otherwise, falls back to the system default template for articles.
 */
const withTemplate = async (
  article: Article | null,
  locale: string,
): Promise<ArticleWithTemplate | null> => {
  if (!article) return null

  // If using custom layout, no need to resolve template
  if (article.useCustomLayout) {
    return { ...article, resolvedTemplate: null }
  }

  // If template is already populated (object), use it
  if (article.template && typeof article.template === 'object') {
    return { ...article, resolvedTemplate: article.template as Template }
  }

  // Fallback to system default template
  const defaultTemplate = await getDefaultTemplate('articles', locale)
  return { ...article, resolvedTemplate: defaultTemplate }
}

/**
 * Fetches the published article with its resolved template.
 */
export const getArticleWithTemplate = cache(
  async (slug: string, locale: string): Promise<ArticleWithTemplate | null> => {
    'use cache'
    cacheLife('days')
    cacheTag('*', 'pages', 'pages:articles', `pages:articles:${slug}`, 'templates')

    return withTemplate(await getArticle(slug, locale), locale)
  },
)

/**
 * Fetches the previewable article with its resolved template.
 */
export const getPreviewArticleWithTemplate = cache(
  async (slug: string, locale: string): Promise<ArticleWithTemplate | null> => {
    return withTemplate(await getPreviewArticle(slug, locale), locale)
  },
)
