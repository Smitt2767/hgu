import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getVideosSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'videos',
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

export const getVideo = cache(async (slug: string, locale: string, draft: boolean) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', 'pages:videos', `pages:videos:${slug}`)

  try {
    const payload = await getPayload({ config })

    const videos = await payload.find({
      collection: 'videos',
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

    return videos.docs[0] ?? null
  } catch {
    return null
  }
})
