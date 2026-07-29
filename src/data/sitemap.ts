import { routing } from '@/i18n/routing'
import { clientEnv } from '@/env/client'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { ISitemapField } from 'next-sitemap'

const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL
const locales = routing.locales
const defaultLocale = routing.defaultLocale

// Types
type SitemapEntry = {
  slug: string
  updatedAt?: string
}

type StaticPage = {
  path: string
  priority?: number
  changefreq?: ISitemapField['changefreq']
}

// Helper: Build localized URL (English at root, others with prefix)
function buildLocalizedUrl(locale: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  if (locale === defaultLocale) {
    return `${siteUrl}/${cleanPath}`
  }

  return `${siteUrl}/${locale}/${cleanPath}`
}

// Helper: Create alternate refs for all locales
function createAlternateRefs(path: string): ISitemapField['alternateRefs'] {
  return locales.map((locale) => ({
    href: buildLocalizedUrl(locale, path),
    hreflang: locale,
  }))
}

// Helper: Create sitemap entries for all locales
function createSitemapEntry(
  path: string,
  options?: {
    lastmod?: string
    priority?: number
    changefreq?: ISitemapField['changefreq']
  },
): ISitemapField[] {
  const { lastmod, priority = 0.7, changefreq = 'weekly' } = options ?? {}

  return locales.map((locale) => ({
    loc: buildLocalizedUrl(locale, path),
    lastmod: lastmod ?? new Date().toISOString(),
    changefreq,
    priority,
    alternateRefs: createAlternateRefs(path),
  }))
}

// Fetch all pages (no limit for sitemap)
const getAllPagesSlugs = cache(async (): Promise<SitemapEntry[]> => {
  'use cache'
  cacheLife('days')
  cacheTag('sitemap', 'pages')

  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'pages',
      select: { slug: true, updatedAt: true },
      // The sitemap is public, so it must never advertise a URL that is still in
      // internal, alpha or beta. Unpublished documents keep a main-table row and the
      // Local API defaults to `overrideAccess: true`, so nothing excludes them here
      // but this filter.
      where: { _status: { equals: 'published' } },
      limit: 0, // No limit
      pagination: false,
    })
    return data.docs.map((doc) => ({
      slug: getSiteSlug(doc.slug),
      updatedAt: doc.updatedAt,
    }))
  } catch {
    return []
  }
})

// Fetch all articles (no limit for sitemap)
const getAllArticlesSlugs = cache(async (): Promise<SitemapEntry[]> => {
  'use cache'
  cacheLife('days')
  cacheTag('sitemap', 'articles')

  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'articles',
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
      limit: 0,
      pagination: false,
    })
    return data.docs.map((doc) => ({
      slug: getSiteSlug(doc.slug),
      updatedAt: doc.updatedAt,
    }))
  } catch {
    return []
  }
})

// Fetch all videos (no limit for sitemap)
const getAllVideosSlugs = cache(async (): Promise<SitemapEntry[]> => {
  'use cache'
  cacheLife('days')
  cacheTag('sitemap', 'videos')

  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'videos',
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
      limit: 0,
      pagination: false,
    })
    return data.docs.map((doc) => ({
      slug: getSiteSlug(doc.slug),
      updatedAt: doc.updatedAt,
    }))
  } catch {
    return []
  }
})

// Static pages - easy to extend in future
const STATIC_PAGES: StaticPage[] = [
  // Uncomment when list pages are ready:
  // { path: 'articles', priority: 0.8, changefreq: 'daily' },
  // { path: 'videos', priority: 0.8, changefreq: 'daily' },
]

// Main cached function for sitemap data
export const getSitemapData = cache(async (): Promise<ISitemapField[]> => {
  'use cache'
  cacheLife('days')
  cacheTag('sitemap')

  const [pages, articles, videos] = await Promise.all([
    getAllPagesSlugs(),
    getAllArticlesSlugs(),
    getAllVideosSlugs(),
  ])

  const sitemapEntries: ISitemapField[] = []

  // Add CMS pages
  for (const page of pages) {
    sitemapEntries.push(
      ...createSitemapEntry(page.slug, {
        lastmod: page.updatedAt,
        priority: page.slug === '' ? 1.0 : 0.8,
        changefreq: 'weekly',
      }),
    )
  }

  // Add articles
  for (const article of articles) {
    sitemapEntries.push(
      ...createSitemapEntry(`articles/${article.slug}`, {
        lastmod: article.updatedAt,
        priority: 0.7,
        changefreq: 'weekly',
      }),
    )
  }

  // Add videos
  for (const video of videos) {
    sitemapEntries.push(
      ...createSitemapEntry(`videos/${video.slug}`, {
        lastmod: video.updatedAt,
        priority: 0.7,
        changefreq: 'weekly',
      }),
    )
  }

  // Add static pages
  for (const staticPage of STATIC_PAGES) {
    sitemapEntries.push(
      ...createSitemapEntry(staticPage.path, {
        priority: staticPage.priority,
        changefreq: staticPage.changefreq,
      }),
    )
  }

  return sitemapEntries
})
