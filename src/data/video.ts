import { DEFAULT_SLUG } from '@/constants'
import { Template, Video } from '@/payload-types'
import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import { getDefaultTemplate } from './template'

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

    const slugs = data.docs.map((doc) => getSiteSlug(doc.slug))
    return slugs.length > 0 ? slugs : [DEFAULT_SLUG]
  } catch {
    return [DEFAULT_SLUG]
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
      depth: 2, // Populate template and media relationships
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

export type VideoWithTemplate = Video & {
  resolvedTemplate: Template | null
}

/**
 * Fetches a video with its resolved template.
 * If the video has a custom layout enabled, no template is resolved.
 * If the video has a selected template, that template is used.
 * Otherwise, falls back to the system default template for videos.
 */
export const getVideoWithTemplate = cache(
  async (slug: string, locale: string, draft: boolean): Promise<VideoWithTemplate | null> => {
    'use cache'
    cacheLife('days')
    cacheTag('*', 'pages', 'pages:videos', `pages:videos:${slug}`, 'templates')

    const video = await getVideo(slug, locale, draft)
    if (!video) return null

    // If using custom layout, no need to resolve template
    if (video.useCustomLayout) {
      return { ...video, resolvedTemplate: null }
    }

    // If template is already populated (object), use it
    if (video.template && typeof video.template === 'object') {
      return { ...video, resolvedTemplate: video.template as Template }
    }

    // Fallback to system default template
    const defaultTemplate = await getDefaultTemplate('videos', locale)
    return { ...video, resolvedTemplate: defaultTemplate }
  },
)
