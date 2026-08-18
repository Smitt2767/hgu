# The core modules

Generic implementations. Rename freely; the shapes and the comments are the part
that matters.

## `src/flags/constants.ts`

```ts
/**
 * Deliberately import-free. Proxy needs the cookie name, and pulling it from a
 * module that imports `next/headers` or an SDK drags both into the proxy bundle.
 * Anything proxy and the render both need lives here.
 */

/**
 * Anonymous visitor id. Every experiment hashes on this, so a visitor who loses
 * it is re-bucketed and their conversions land in the wrong arm.
 *
 * `httpOnly` at the set site: an id JavaScript can rewrite is an id an injected
 * script can use to move someone between variants.
 */
export const VISITOR_COOKIE = 'app_vid'
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
```

## `src/flags/ruleset.ts`

```ts
import type { FeatureApiResponse } from '@growthbook/growthbook'
import { cacheLife, cacheTag } from 'next/cache'

export const RULESET_TAG = 'flag-ruleset'

/**
 * Every flag, rule and experiment as JSON. Byte-identical for every visitor on
 * Earth, which is what makes it ordinary cacheable content — the per-visitor part
 * of a decision lives in the attributes, not here.
 *
 * The only network read in the whole system. Once it is cached, every flag on the
 * page is free.
 */
export async function getRuleset(): Promise<FeatureApiResponse | null> {
  'use cache'
  cacheTag(RULESET_TAG)

  const payload = await fetchRuleset()

  if (payload) {
    cacheLife('hours')
  } else {
    // A failed read is cached on a *prerenderable* profile, and that is the point
    // of these numbers rather than an aside about retry latency. A `revalidate`
    // shorter than the prerender's effective lifetime makes the scope a dynamic
    // hole; anything awaiting it outside <Suspense> then takes the whole route
    // down with "uncached or runtime data during prerendering". The build passes,
    // because the provider is reachable at build time and the happy path uses
    // `hours` — only a cache miss during an outage trips it, and the error names
    // the render rather than the fetch.
    cacheLife({ stale: 300, revalidate: 300, expire: 300 })
  }

  return payload
}

/**
 * How long one isolate may reuse a ruleset it already fetched.
 *
 * Bound it by what the CDN already permits rather than picking freely: if the
 * payload ships `cache-control: max-age=300`, a POP is entitled to hand you a
 * five-minute-old copy anyway, so a TTL inside that envelope adds no staleness
 * that was not already there. It only stops you paying for the same bytes on
 * every request.
 */
const MEMO_TTL_MS = 60_000

/**
 * Failed reads are held far more briefly, so a blip costs one retry per isolate
 * per ten seconds instead of disabling precompute for a full minute or stampeding
 * a struggling origin once per request.
 */
const MEMO_FAILURE_TTL_MS = 10_000

type Memo = {
  /** When the fetch was started, not when it resolved. */
  at: number
  /** How long past `at` this entry may be reused. Widened on a good read. */
  ttl: number
  /**
   * The in-flight promise, not the resolved value, so requests arriving together
   * on a cold isolate share one fetch — which is the case that matters, since a
   * burst is exactly when a cold isolate appears.
   */
  pending: Promise<FeatureApiResponse | null>
}

let memo: Memo | null = null

/**
 * The same read for proxy: uncached by Next, memoised per isolate.
 *
 * Proxy runs before any render exists and `use cache` is a render-time directive,
 * so `getRuleset` cannot be called there at all. Module scope is the only cache
 * available, and it is enough — the runtime reuses an isolate across requests.
 *
 * The alternatives are worse. Fronting the CDN with your own route adds a hop to a
 * region-pinned function when the provider's CDN already serves this from the POP
 * nearest the visitor. Pushing the payload into an edge config store on the webhook
 * removes the fetch but its writes take seconds to propagate globally, so proxy
 * would decide on one ruleset while the render path held another.
 */
export function readRulesetForProxy(): Promise<FeatureApiResponse | null> {
  if (memo && Date.now() - memo.at < memo.ttl) return memo.pending

  const entry: Memo = {
    at: Date.now(),
    // Starts short and is widened once the payload proves good, rather than
    // starting long and being cut back — so a failed read is never reusable for
    // the long TTL even briefly, and the promotion happens inside the promise the
    // caller already awaits, leaving no detached work to cancel.
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
 * Never throws. A throw inside `use cache` fails the *build*, turning a provider
 * outage into a failed deploy — and React surfaces it to the prerender before the
 * caller's own catch runs, so catching at the call site does not help.
 */
async function fetchRuleset(): Promise<FeatureApiResponse | null> {
  const key = env.GROWTHBOOK_CLIENT_KEY
  // Unset until someone adds it. Returning null rather than throwing means every
  // flag falls back to its declared default and the app renders normally.
  if (!key) return null

  try {
    const res = await fetch(`${env.GROWTHBOOK_API_HOST}/api/features/${key}`)
    if (!res.ok) throw new Error(`ruleset responded ${res.status}`)
    return (await res.json()) as FeatureApiResponse
  } catch (error) {
    console.error('[flags] ruleset unreachable', error)
    return null
  }
}
```

`revalidateTag` reaches the render cache instantly and **cannot reach into a
running isolate's memory**, so the proxy memo bounds a window in which proxy and
the render path can disagree after a webhook. That is the one thing this trades
away; keep the TTL short enough that it does not matter.

## `src/flags/attributes.ts`

```ts
export type Attributes = {
  /** Stable bucketing key. Every experiment hashes on this. */
  id: string
  /** Sent for debugging, deliberately not declared as a targetable attribute. */
  country: string
  /** The bounded bucket geo rules target. */
  audience: Audience
  deviceType: 'mobile' | 'tablet' | 'desktop'
  locale: string
}

/**
 * Structural types rather than the concrete store classes: `next/headers`' stores,
 * NextRequest's stores and an SDK's sealed stores all satisfy these, and only
 * structural typing lets one function serve all three.
 */
type HeaderReader = { get(name: string): string | null | undefined }
type CookieReader = { get(name: string): { value: string } | undefined }

type Source = {
  headers: HeaderReader
  cookies: CookieReader
  /**
   * The locale actually being rendered, where the caller knows it. Pass it
   * whenever you can: an i18n locale cookie is written on the *response* while a
   * flag is evaluated against the *request*, so it is always one navigation
   * behind, and a visitor's first request to a non-default locale carries no
   * cookie at all. Invisible until a rule targets `locale`, and silent even then.
   */
  locale?: string
}

/** Pure over (headers, cookies): proxy, the render and route handlers all call it. */
export function resolveAttributes(r: Source): Attributes {
  const ua = r.headers.get('user-agent') ?? ''
  // Resolved at the edge by the host. Absent locally, which is why geo targeting
  // cannot be verified on a dev machine.
  const country = r.headers.get('x-vercel-ip-country') ?? 'unknown'

  return {
    // A constant, never a random value: a random id per request puts the same
    // visitor in a different bucket on every page load, which reads as an
    // experiment with no effect rather than as a missing cookie.
    id: r.cookies.get(VISITOR_COOKIE)?.value ?? 'anonymous',
    country,
    audience: audienceOf(country),
    deviceType: classifyDevice(ua),
    locale: r.locale ?? 'en',
  }
}

/**
 * Coarse device class from the UA string. Three buckets deliberately: anything
 * finer needs Client Hints, which are Chromium-only and absent on a browser's
 * first request, so a flag targeting them would mis-target every new visitor.
 */
function classifyDevice(ua: string): Attributes['deviceType'] { /* … */ }
```

`readAttributes()` is the thin `next/headers` wrapper for Server Components and
route handlers. Where the locale comes from a request-scoped i18n library, ask for
it in a `try/catch` — a handler outside the locale segment is a question with no
answer, not an error worth propagating.

## `src/flags/audience.ts`

```ts
/**
 * The bounded bucket a visitor falls into, and the only geographic thing a rule
 * may target.
 *
 * Country has ~250 values and a campaign name has infinitely many; precompute
 * builds one page per distinct answer, so targeting either directly makes the page
 * set unbounded. An audience is a handful of values by construction.
 *
 * Adding a market means adding a value here. Under precompute that costs no extra
 * pages at all — permutations are over flag *values*, not attributes — which is
 * exactly the property a raw country code would destroy.
 */
export type Audience = 'us' | 'gb' | 'row'
```

## `src/flags/evaluate.ts`

```ts
/**
 * Joins a ruleset to a set of attributes. No network, no cache: a hash and a walk
 * over rules already in memory.
 *
 * Caching *this* is wrong in both directions — a cache lookup costs more than the
 * hash it avoids, and keying it per visitor is one entry per human being.
 *
 * Untyped by design. The expected type lives in the CMS: a flag attached to a
 * block is matched against rows an editor sees, so there is no TypeScript type to
 * check against. `undefined` means "no answer", and the caller decides what that
 * means — for a module it means rendering the base content.
 */
export function evaluateValueWith(
  ruleset: FeatureApiResponse | null,
  key: string,
  attributes: Partial<Attributes>,
): unknown {
  if (!ruleset) return undefined

  // Built per call and thrown away. A client holds timers and is not
  // serialisable, so it could never be returned from a `use cache` scope anyway;
  // constructing one around an already-fetched payload is just an assignment.
  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })
  const result = client.evalFeature(key, { attributes })
  client.destroy()

  return result.value ?? undefined
}
```

## The visitor cookie, in proxy

```ts
// Minted here because this is the only place that can. A Server Component may not
// set a cookie, so an id created during render would never reach the browser —
// every request would look like a new visitor and no experiment could hold anyone
// in a bucket for longer than one page view.
//
// Written to `request.cookies` as well as the response, and that is not belt and
// braces: any decision made later in this same request would otherwise bucket on
// the `anonymous` fallback and then render under the visitor's real new id — one
// visitor, two variants, on the one request nobody re-checks.
if (!request.cookies.get(VISITOR_COOKIE)) {
  const id = crypto.randomUUID()
  request.cookies.set(VISITOR_COOKIE, id)
  response.cookies.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: VISITOR_COOKIE_MAX_AGE,
  })
}
```
