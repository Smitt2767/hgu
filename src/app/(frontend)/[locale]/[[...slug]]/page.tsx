import RenderBlocks from '@/components/blocks'
import LivePreviewListener from '@/components/live-preview-listener'
import StageBanner from '@/components/stage-banner'
import { getPage, getPagesSlugs, getPreviewPage } from '@/data/page'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getDBSlug } from '@/utils/slug'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const pages = await getPagesSlugs()
  const slugs = routing.locales
    .map((locale) => pages.map((slug) => ({ locale, slug: [slug] })))
    .flat()
  return slugs
}

/**
 * Resolves the page for this request, and only ever touches request-scoped data
 * behind the draft-mode check.
 *
 * `draftMode().isEnabled` is free to read during a prerender — Next only tracks
 * dynamic usage for `enable()`/`disable()`, and hands a prerender a null provider
 * whose `isEnabled` is always `false` (see
 * `next/dist/server/request/draft-mode.js`). So this resolves to the cached,
 * published page at build time and the route stays fully prerendered. Only
 * requests carrying the `__prerender_bypass` cookie fall into the preview branch,
 * which reads the auth cookie to decide what that account is allowed to see.
 *
 * That ordering is the whole trick: pull identity out before checking draft mode
 * and every anonymous visitor would go dynamic too.
 */
const resolvePage = async (pageSlug: string, locale: string) => {
  const { isEnabled: draft } = await draftMode()
  const slug = getDBSlug(pageSlug)

  const page = draft ? await getPreviewPage(slug, locale) : await getPage(slug, locale)

  return { draft, page }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> => {
  const { locale, slug } = await params

  const { page } = await resolvePage(slug?.[0] ?? '', locale)

  const title = page?.meta?.title || page?.title
  const description = page?.meta?.description
  const image = getImageUrl(page?.meta?.image)

  return { title, description, ...(image && { openGraph: { images: [image] } }) }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const { draft, page } = await resolvePage(slug?.[0] ?? '', locale)

  // In the preview branch this also covers the stage gate: a tester requesting a
  // page above their granted stages gets no document back from `canReadStaged` and
  // no published version to fall back on, so they get a 404 rather than a 403
  // confirming it exists.
  if (!page) notFound()

  return (
    <>
      {draft && (
        <>
          <LivePreviewListener />
          <StageBanner stage={page.stage} status={page._status} />
        </>
      )}
      <RenderBlocks data={page.layout} />
    </>
  )
}
