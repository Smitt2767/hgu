import RenderBlocks from '@/components/blocks'
import ArticleDetails from '@/components/content-details/article-details'
import LivePreviewListener from '@/components/live-preview-listener'
import { getArticlesSlugs, getArticleWithTemplate } from '@/data/article'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getDBSlug } from '@/utils/slug'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const articles = await getArticlesSlugs()
  const slugs = routing.locales.map((locale) => articles.map((slug) => ({ locale, slug }))).flat()
  return slugs
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> => {
  const { locale, slug } = await params
  const { isEnabled: draft } = await draftMode()

  const article = await getArticleWithTemplate(getDBSlug(slug), locale, draft)

  const title = article?.meta?.title || article?.title
  const description = article?.meta?.description
  const image = getImageUrl(article?.meta?.image)

  return { title, description, ...(image && { openGraph: { images: [image] } }) }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await params
  setRequestLocale(locale)

  const article = await getArticleWithTemplate(getDBSlug(slug), locale, draft)
  if (!article) notFound()

  // Determine which layout to use: custom layout or template layout
  const layout = article.useCustomLayout ? article.layout : article.resolvedTemplate?.layout

  return (
    <>
      {draft && <LivePreviewListener />}
      <ArticleDetails article={article} />
      <RenderBlocks data={layout} />
    </>
  )
}
