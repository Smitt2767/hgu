import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'

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

    return data.docs.map((doc) => getSiteSlug(doc.slug))
  } catch {
    return []
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
