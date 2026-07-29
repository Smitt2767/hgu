import RenderBlocks from '@/components/blocks'
import VideoDetails from '@/components/content-details/video-details'
import LivePreviewListener from '@/components/live-preview-listener'
import StageBanner from '@/components/stage-banner'
import { getPreviewVideoWithTemplate, getVideosSlugs, getVideoWithTemplate } from '@/data/video'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getDBSlug } from '@/utils/slug'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const videos = await getVideosSlugs()
  const slugs = routing.locales.map((locale) => videos.map((slug) => ({ locale, slug }))).flat()
  return slugs
}

/**
 * Resolves the video for this request — see the note on `resolvePage` in
 * `[[...slug]]/page.tsx` for why reading draft mode first keeps this route
 * prerendered for the public.
 */
const resolveVideo = async (videoSlug: string, locale: string) => {
  const { isEnabled: draft } = await draftMode()
  const slug = getDBSlug(videoSlug)

  const video = draft
    ? await getPreviewVideoWithTemplate(slug, locale)
    : await getVideoWithTemplate(slug, locale)

  return { draft, video }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> => {
  const { locale, slug } = await params

  const { video } = await resolveVideo(slug, locale)

  const title = video?.meta?.title || video?.title
  const description = video?.meta?.description
  const image = getImageUrl(video?.meta?.image)

  return { title, description, ...(image && { openGraph: { images: [image] } }) }
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const { draft, video } = await resolveVideo(slug, locale)
  if (!video) notFound()

  // Determine which layout to use: custom layout or template layout
  const layout = video.useCustomLayout ? video.layout : video.resolvedTemplate?.layout

  return (
    <>
      {draft && (
        <>
          <LivePreviewListener />
          <StageBanner stage={video.stage} status={video._status} />
        </>
      )}
      <VideoDetails video={video} />
      <RenderBlocks data={layout} />
    </>
  )
}
