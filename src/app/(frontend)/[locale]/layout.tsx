import AdminBar from '@/components/admin-bar'
import Maintenance from '@/components/maintenance'
import { getSiteData } from '@/data/site'
import { clientEnv } from '@/env/client'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getBrandingCssVars } from '@/utils/color'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'

import { notFound } from 'next/navigation'
import React from 'react'

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params

  const site = await getSiteData(locale)

  const title = site?.meta?.title || site?.title || ''
  const description = site?.meta?.description || ''
  const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL

  const ogImage = getImageUrl(site?.meta?.image)
  const faviconUrl = getImageUrl(site?.favicon) ?? '/favicon.ico'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: siteUrl ? new URL(siteUrl) : null,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: 'website',
      locale,
      siteName: site?.title || '',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { isEnabled } = await draftMode()
  const { locale } = await params
  const site = await getSiteData(locale)

  setRequestLocale(locale)

  if (!locale) notFound()

  const showMaintenancePage = Boolean(site?.maintenanceMode)

  const brandingCss = getBrandingCssVars(site)

  return (
    <html lang={locale}>
      <head>
        {brandingCss && <style dangerouslySetInnerHTML={{ __html: brandingCss }} />}
      </head>
      <body>
        <main>
          <NextIntlClientProvider locale={locale}>
            <AdminBar draft={isEnabled} />
            {showMaintenancePage ? <Maintenance /> : children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
