import { DEFAULT_SLUG } from '@/constants'
import { Article, Template } from '@/payload-types'
import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import { getDefaultTemplate } from './template'

export const getArticlesSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'articles',
      select: {
        slug: true,
      },
      limit: 10,
    })

    const slugs = data.docs.map((doc) => getSiteSlug(doc.slug))
    return slugs.length > 0 ? slugs : [DEFAULT_SLUG]
  } catch {
    return [DEFAULT_SLUG]
  }
})

export const getArticle = cache(async (slug: string, locale: string, draft: boolean) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', 'pages:articles', `pages:articles:${slug}`)

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
      ...(draft && {
        draft: true,
        overrideAccess: true,
      }),
    })

    return articles.docs[0] ?? null
  } catch {
    return null
  }
})

export type ArticleWithTemplate = Article & {
  resolvedTemplate: Template | null
}

/**
 * Fetches an article with its resolved template.
 * If the article has a custom layout enabled, no template is resolved.
 * If the article has a selected template, that template is used.
 * Otherwise, falls back to the system default template for articles.
 */
export const getArticleWithTemplate = cache(
  async (slug: string, locale: string, draft: boolean): Promise<ArticleWithTemplate | null> => {
    'use cache'
    cacheLife('days')
    cacheTag('*', 'pages', 'pages:articles', `pages:articles:${slug}`, 'templates')

    const article = await getArticle(slug, locale, draft)
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
  },
)
