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
 * How long one edge isolate may reuse a ruleset it already fetched.
 *
 * Bounded by what the CDN already permits rather than picked freely: the payload
 * ships `cache-control: max-age=300`, so the Fastly POP in front of GrowthBook is
 * entitled to hand us a five-minute-old copy however often we ask. A TTL inside
 * that envelope therefore adds no staleness that was not already in the response —
 * it only stops us paying for the same 900 bytes on every request. A minute keeps
 * well clear of the ceiling and bounds the window in which proxy and the render
 * path can disagree after a webhook, which is the one thing this trades away:
 * `revalidateTag` reaches the render cache instantly and cannot reach into a
 * running isolate's memory.
 */
const MEMO_TTL_MS = 60_000

/**
 * Failed reads are held far more briefly, so a GrowthBook blip costs one retry per
 * isolate per ten seconds instead of either disabling precompute for a full minute
 * or stampeding a struggling origin once per request. Same asymmetry `getRuleset`
 * applies with `cacheLife` a few lines up.
 */
const MEMO_FAILURE_TTL_MS = 10_000

type Memo = {
  /** When the fetch was started, not when it resolved. */
  at: number
  /** How long past `at` this entry may be reused. Widened on a good read. */
  ttl: number
  /**
   * The in-flight promise, not the resolved value. Requests arriving together on a
   * cold isolate then share one fetch rather than each starting their own — which
   * is the case that matters, since a burst is exactly when a cold isolate appears.
   */
  pending: Promise<FeatureApiResponse | null>
}

let memo: Memo | null = null

/**
 * The same read for proxy: uncached by Next, memoised per isolate.
 *
 * Proxy runs before any render exists and `use cache` is a render-time directive,
 * so `getRuleset` cannot be called there at all. Precompute needs the ruleset in
 * proxy — that is where the decision has to happen — so this is the forced
 * duplicate.
 *
 * Module scope is the only cache available here, and it is enough: the edge runtime
 * reuses an isolate across requests, so every request after the first one it serves
 * costs nothing. The alternative shapes are both worse. Fronting the CDN with our
 * own route adds a hop to a region-pinned function, when Fastly is already serving
 * this from the POP nearest the visitor in about a millisecond. Pushing the payload
 * into Vercel Global Config on the webhook removes the fetch entirely, but its
 * writes take up to ten seconds to propagate globally — so proxy would decide on
 * one ruleset while the render path, still reading the CDN, holds another.
 */
export function readRulesetForProxy(): Promise<FeatureApiResponse | null> {
  if (memo && Date.now() - memo.at < memo.ttl) return memo.pending

  const entry: Memo = {
    at: Date.now(),
    // Starts short and is widened below only once the payload proves good, rather
    // than starting long and being cut back. A failed read is then never reusable
    // for the long TTL even briefly, and the promotion happens inside the promise
    // the caller already awaits, so there is no detached work for the runtime to
    // cancel when the response goes out.
    ttl: MEMO_FAILURE_TTL_MS,
    pending: fetchRuleset().then((payload) => {
      if (payload) entry.ttl = MEMO_TTL_MS
      return payload
    }),
  }

  memo = entry
  return entry.pending
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
