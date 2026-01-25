import LivePreviewListener from '@/components/live-preview-listener'
import { getVideo, getVideosSlugs } from '@/data/video'
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

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> => {
  const { locale, slug } = await params
  const { isEnabled: draft } = await draftMode()

  const video = await getVideo(getDBSlug(slug), locale, draft)

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
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await params
  setRequestLocale(locale)

  const video = await getVideo(getDBSlug(slug), locale, draft)
  if (!video) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <div>video details goes here.</div>
    </>
  )
}
