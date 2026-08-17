import { serverEnv } from '@/env/server'
import type { FeatureApiResponse } from '@growthbook/growthbook'
import { cacheLife, cacheTag } from 'next/cache'

/**
 * Cache tag for the GrowthBook ruleset. The event webhook expires this; see
 * src/app/api/growthbook/webhook/route.ts.
 */
export const RULESET_TAG = 'flag-ruleset'

/**
 * The ruleset: every flag, rule and experiment as JSON. It is byte-identical for
 * every visitor on Earth, which is exactly what makes it ordinary cacheable
 * content — the per-visitor part of a flag decision lives in the attributes, not
 * here.
 *
 * This is the only network read in the whole flag system. Evaluation against an
 * already-fetched payload is a hash and a walk over rules in memory, so once this
 * is cached every flag on the page is free.
 *
 * Deliberately not `@flags-sdk/growthbook`: the stock adapter fetches the ruleset
 * itself and memoises it in a WeakMap keyed by the request, which dedupes within
 * one request and caches nothing between them — one network read per request. Its
 * fetch is also uncached, so a page reading a flag through it cannot prerender at
 * all. Writing `decide` against this function removes both problems.
 */
export async function getRuleset(): Promise<FeatureApiResponse | null> {
  'use cache'
  cacheTag('*', RULESET_TAG)

  const key = serverEnv.GROWTHBOOK_CLIENT_KEY
  // Unset locally until someone adds it. Returning null rather than throwing means
  // every flag falls back to its declared default and the app renders normally.
  if (!key) {
    cacheLife({ stale: 60, revalidate: 60, expire: 300 })
    return null
  }

  try {
    const res = await fetch(`${serverEnv.GROWTHBOOK_API_HOST}/api/features/${key}`)
    if (!res.ok) throw new Error(`ruleset responded ${res.status}`)
    const payload = (await res.json()) as FeatureApiResponse

    // `hours` is stale: 300, so a flag change propagates within five minutes on
    // its own. The webhook only makes it immediate.
    cacheLife('hours')
    return payload
  } catch (error) {
    // Never throw from here. A throw inside `use cache` fails the *build*, which
    // turns a GrowthBook outage into a failed deploy. Retry sooner than the happy
    // path instead, and let flags serve their defaults meanwhile.
    console.error('[flags] ruleset unreachable', error)
    cacheLife({ stale: 300, revalidate: 30, expire: 300 })
    return null
  }
}
