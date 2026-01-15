import { getPage, getPagesSlugs } from '@/data/page'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getDBSlug } from '@/utils/slug'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const pages = await getPagesSlugs()
  const slugs = routing.locales
    .map((locale) => pages.map((slug) => ({ locale, slug: [slug] })))
    .flat()
  return slugs
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}): Promise<Metadata> => {
  const { locale, slug } = await params

  const pageSlug = slug?.[0] ?? ''

  const page = await getPage(getDBSlug(pageSlug), locale)

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

  const pageSlug = slug?.[0] ?? ''

  const page = await getPage(getDBSlug(pageSlug), locale)

  if (!page) notFound()

  return <div>{JSON.stringify(page, null, 2)}</div>
}
