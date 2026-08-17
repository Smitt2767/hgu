import RenderBlocks from '@/components/blocks'
import MockContentHeader from '@/components/content-details/mock-content-header'
import LivePreviewListener from '@/components/live-preview-listener'
import TemplateLoading from '@/components/ui/template-loading'
import { DEFAULT_SLUG } from '@/constants'
import { getTemplateById } from '@/data/template'
import { routing } from '@/i18n/routing'
import configPromise from '@payload-config'
import { setRequestLocale } from 'next-intl/server'
import { draftMode, headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Suspense } from 'react'

// Return empty array to skip prerendering at build time
// Routes will be generated on-demand at request time
export const generateStaticParams = async () =>
  routing.locales.map((locale) => ({ locale, id: DEFAULT_SLUG }))

async function TemplatePreviewContent({ id, locale }: { id: string; locale: string }) {
  const { isEnabled: draft } = await draftMode()

  // Authenticate Payload user
  const headersList = await headers()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    notFound()
  }

  const template = await getTemplateById(id, locale, draft)

  if (!template) {
    notFound()
  }

  return (
    <>
      {draft && <LivePreviewListener />}
      <MockContentHeader contentType={template.contentType} />
      <RenderBlocks data={template.layout} locale={locale} />
    </>
  )
}

async function TemplatePreviewContentWrapper({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  setRequestLocale(locale)
  return <TemplatePreviewContent id={id} locale={locale} />
}

export default function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  return (
    <Suspense fallback={<TemplateLoading />}>
      <TemplatePreviewContentWrapper params={params} />
    </Suspense>
  )
}
