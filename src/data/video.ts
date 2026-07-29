import { DEFAULT_SLUG } from '@/constants'
import { Template, Video } from '@/payload-types'
import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import { getPreviewUser } from './preview'
import { getDefaultTemplate } from './template'

export const getVideosSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'videos',
      select: {
        slug: true,
      },
      // Only published videos may be prerendered — see the note in `data/page.ts`.
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
 * The published video, for the public. Cached and prerendered.
 */
export const getVideo = cache(async (slug: string, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', 'pages:videos', `pages:videos:${slug}`)

  try {
    const payload = await getPayload({ config })

    const videos = await payload.find({
      collection: 'videos',
      locale: getTypedLocale(locale),
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      depth: 2, // Populate template and media relationships
      limit: 1,
      pagination: false,
    })

    return videos.docs[0] ?? null
  } catch {
    return null
  }
})

/**
 * The latest version of a video for draft-mode previews, gated by `canReadStaged` —
 * see `getPreviewPage` for why this is not a cached function, and why it falls back
 * to the published video instead of returning nothing.
 */
export const getPreviewVideo = cache(async (slug: string, locale: string) => {
  const user = await getPreviewUser()

  if (user) {
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
        draft: true,
        user,
        overrideAccess: false,
      })

      if (videos.docs[0]) return videos.docs[0]
    } catch {
      // Fall through to the published video.
    }
  }

  return getVideo(slug, locale)
})

export type VideoWithTemplate = Video & {
  resolvedTemplate: Template | null
}

/**
 * Resolves the template a video should render with.
 * If the video has a custom layout enabled, no template is resolved.
 * If the video has a selected template, that template is used.
 * Otherwise, falls back to the system default template for videos.
 */
const withTemplate = async (
  video: Video | null,
  locale: string,
): Promise<VideoWithTemplate | null> => {
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
}

/**
 * Fetches the published video with its resolved template.
 */
export const getVideoWithTemplate = cache(
  async (slug: string, locale: string): Promise<VideoWithTemplate | null> => {
    'use cache'
    cacheLife('days')
    cacheTag('*', 'pages', 'pages:videos', `pages:videos:${slug}`, 'templates')

    return withTemplate(await getVideo(slug, locale), locale)
  },
)

/**
 * Fetches the previewable video with its resolved template.
 */
export const getPreviewVideoWithTemplate = cache(
  async (slug: string, locale: string): Promise<VideoWithTemplate | null> => {
    return withTemplate(await getPreviewVideo(slug, locale), locale)
  },
)
