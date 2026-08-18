import AdminBar from '@/components/admin-bar'
import Maintenance from '@/components/maintenance'
import { getSiteData } from '@/data/site'
import { clientEnv } from '@/env/client'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { getImageUrl } from '@/utils'
import { getBrandingCssVars } from '@/utils/color'
import { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Merriweather, Oswald } from 'next/font/google'
import { draftMode } from 'next/headers'
import { connection } from 'next/server'

import { notFound } from 'next/navigation'
import React from 'react'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  // Metadata is rendered in its own pass, so the opt-out has to be repeated here rather
  // than inherited from the layout body.
  const { isEnabled } = await draftMode()
  if (isEnabled) await connection()

  const { locale } = await params

  const site = await getSiteData(locale)

  const title = site?.meta?.title || site?.title || ''
  const description = site?.meta?.description
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

/**
 * Resolves the route's params inside a cache scope.
 *
 * Under Cache Components `params` counts as runtime data, so awaiting it in the layout
 * body takes any route that is not already prebuilt out of its prerender — and because
 * this layout wraps every page, one read here is enough to fail all of them with
 * "encountered uncached or runtime data during prerendering". Prebuilt routes survive
 * only because the value is settled at build time, which is exactly why the bug is
 * invisible until something renders on demand.
 *
 * Handing the unresolved promise to a `use cache` scope and awaiting it *inside* is
 * what makes the read legal. The pages route already does this for its own segment;
 * see `decode` in `[locale]/[code]/[[...slug]]/page.tsx`.
 *
 * `cacheLife('max')` because this is a pure function of the segment and can never go
 * stale.
 */
async function resolveParams(params: Promise<{ locale: string }>) {
  'use cache'
  cacheLife('max')

  return await params
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { isEnabled } = await draftMode()

  // Same reason as the pages route: draft mode force-revalidates every cached scope
  // without storing it, so a preview must not attempt a prerender. This layout wraps
  // every page, and `getSiteData` below is the first cached call a preview reaches.
  if (isEnabled) await connection()

  const { locale } = await resolveParams(params)
  const site = await getSiteData(locale)

  setRequestLocale(locale)

  if (!locale) notFound()

  const showMaintenancePage = Boolean(site?.maintenanceMode)

  const brandingCss = getBrandingCssVars(site)

  return (
    <html className="dark" lang={locale}>
      <head>{brandingCss && <style dangerouslySetInnerHTML={{ __html: brandingCss }} />}</head>
      <body className={cn(merriweather.className, merriweather.variable, oswald.variable)}>
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
