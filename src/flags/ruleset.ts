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

  const payload = await fetchRuleset()

  if (payload) {
    // `hours` is revalidate 3600, so a flag change propagates within the hour on
    // its own. The SDK webhook is what makes it immediate.
    cacheLife('hours')
  } else {
    // Retry sooner than the happy path, but `stale` stays at five minutes: below
    // that this scope stops being eligible for the route's static shell, and the
    // build fails with a message about runtime data rather than cache lifetimes.
    cacheLife({ stale: 300, revalidate: 30, expire: 300 })
  }

  return payload
}

/**
 * The same read, uncached, for proxy.
 *
 * Proxy runs before any render exists and `use cache` is a render-time directive,
 * so `getRuleset` cannot be called there at all. Precompute needs the ruleset in
 * proxy — that is where the decision has to happen — so this is the forced
 * duplicate.
 *
 * Every request through a precomputed route pays a CDN round trip for it. That is
 * the honest cost of deciding before the render, and it is why the precomputed set
 * is kept small rather than covering every route.
 */
export async function readRulesetForProxy(): Promise<FeatureApiResponse | null> {
  return fetchRuleset()
}

/**
 * Never throws. A throw inside `use cache` fails the *build*, turning a GrowthBook
 * outage into a failed deploy — and React surfaces it to the prerender before the
 * caller's own catch ever runs, so catching at the call site does not help.
 */
async function fetchRuleset(): Promise<FeatureApiResponse | null> {
  const key = serverEnv.GROWTHBOOK_CLIENT_KEY
  // Unset locally until someone adds it. Returning null rather than throwing means
  // every flag falls back to its declared default and the app renders normally.
  if (!key) return null

  try {
    const res = await fetch(`${serverEnv.GROWTHBOOK_API_HOST}/api/features/${key}`)
    if (!res.ok) throw new Error(`ruleset responded ${res.status}`)

    return (await res.json()) as FeatureApiResponse
  } catch (error) {
    console.error('[flags] ruleset unreachable', error)
    return null
  }
}
