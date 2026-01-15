import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPagesSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'pages',
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

export const getPage = cache(async (slug: string, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', `pages:${slug}`)

  try {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      locale: getTypedLocale(locale),
      select: {
        title: true,
        slug: true,
        meta: true,
        layout: true,
      },
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      pagination: false,
    })

    return pages.docs[0] ?? null
  } catch {
    return null
  }
})
