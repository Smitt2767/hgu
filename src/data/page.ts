import { DEFAULT_SLUG } from '@/constants'
import { getTypedLocale } from '@/utils/i18n'
import { getSiteSlug } from '@/utils/slug'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import { getPreviewUser } from './preview'

const PAGE_SELECT = {
  title: true,
  slug: true,
  meta: true,
  layout: true,
  stage: true,
  _status: true,
} as const

export const getPagesSlugs = cache(async () => {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'pages',
      select: {
        slug: true,
      },
      // Only published pages may be prerendered. Drafts keep a main-table row with
      // `_status: 'draft'` and the Local API defaults to `overrideAccess: true`, so
      // without this filter the build would enumerate pages sitting in alpha or beta
      // and emit their draft content as public static HTML.
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
 * The published page, for the public. Cached and prerendered — this is the only
 * version that is ever baked into static HTML.
 */
export const getPage = cache(async (slug: string, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('*', 'pages', `pages:${slug}`)

  try {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      locale: getTypedLocale(locale),
      select: PAGE_SELECT,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      pagination: false,
    })

    return pages.docs[0] ?? null
  } catch {
    return null
  }
})

/**
 * The latest version of a page for draft-mode previews, gated by Payload access
 * control: `canReadStaged` decides whether the requesting account may see this
 * page at its current stage, and returns nothing when it may not.
 *
 * Falls back to the published page when there is nothing to preview, so that
 * turning draft mode on can never show an account *less* than it would see
 * signed out. The fallback is load-bearing rather than defensive: `draft: true`
 * resolves through `queryDrafts`, which only ever considers the version row with
 * `latest = true`. Once a live page has a newer draft sitting in alpha, that one
 * row is what the access `Where` is matched against, so the `PUBLISHED` branch of
 * `canReadStaged` cannot match it and a beta tester would 404 on a page the
 * public can read. A page that was never published still yields nothing here, so
 * an unreleased draft keeps 404ing rather than confirming it exists.
 *
 * Deliberately not a `'use cache'` function. It reads the request's auth cookie,
 * which is illegal inside a cache scope, and there would be nothing to gain
 * anyway — while draft mode is on Next force-revalidates every cache in the tree
 * and refuses to store the result (`shouldForceRevalidate` in
 * `next/dist/server/use-cache/use-cache-wrapper.js`), precisely so previews cannot
 * serve or poison public cache entries.
 */
export const getPreviewPage = cache(async (slug: string, locale: string) => {
  const user = await getPreviewUser()

  if (user) {
    try {
      const payload = await getPayload({ config })

      const pages = await payload.find({
        collection: 'pages',
        locale: getTypedLocale(locale),
        select: PAGE_SELECT,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
        pagination: false,
        draft: true,
        user,
        overrideAccess: false,
      })

      if (pages.docs[0]) return pages.docs[0]
    } catch {
      // Fall through to the published page.
    }
  }

  return getPage(slug, locale)
})
