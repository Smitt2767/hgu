import { audienceOf, type Audience } from '@/flags/audience'
import { VISITOR_COOKIE } from '@/flags/constants'
import { getLocale } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

export { VISITOR_COOKIE }

export type Attributes = {
  /** Stable bucketing key. Every experiment hashes on this. */
  id: string
  /**
   * Sent, but deliberately not declared in GrowthBook — target `audience` instead.
   * It is here so `/api/flags/debug` can confirm geo resolution actually works on a
   * deployment, which is otherwise impossible to tell apart from a broken rule.
   */
  country: string
  /** The bounded bucket geo rules target. See `./audience`. */
  audience: Audience
  deviceType: 'mobile' | 'tablet' | 'desktop'
  locale: string
}

/**
 * Structural types rather than the concrete store classes: `next/headers`'
 * stores, NextRequest's stores, and the Flags SDK's sealed stores all satisfy
 * these, and only structural typing lets one function serve all three.
 */
type HeaderReader = { get(name: string): string | null | undefined }
type CookieReader = { get(name: string): { value: string } | undefined }

type Source = {
  headers: HeaderReader
  cookies: CookieReader
  /**
   * The locale actually being rendered, where the caller knows it.
   *
   * Pass it whenever you can. The fallback below reads next-intl's `NEXT_LOCALE`
   * cookie, and that cookie is set on the *response* while a flag is evaluated
   * against the *request* — so it is always one navigation behind. A visitor's first
   * ever request to `/es/...` carries no cookie at all and would evaluate as `en`,
   * serving the English treatment on a Spanish page. Invisible until a rule targets
   * `locale`, and silent even then.
   */
  locale?: string
}

/**
 * Attribute resolution as a pure function over (headers, cookies).
 *
 * Written this way on purpose: two callers need it and only one of them may use
 * `next/headers`. A Server Component can; proxy cannot, and proxy is where the
 * precompute decision is made.
 */
export function resolveAttributes(r: Source): Attributes {
  const ua = r.headers.get('user-agent') ?? ''
  // Vercel resolves this at the edge. Absent locally, which is why geo targeting
  // cannot be verified on a dev machine — every local request buckets as `row`.
  const country = r.headers.get('x-vercel-ip-country') ?? 'unknown'

  return {
    // Falls back to a constant rather than a random value: a random id per request
    // would put the same visitor in a different bucket on every page load, which
    // reads as an experiment with no effect rather than as a missing cookie.
    id: r.cookies.get(VISITOR_COOKIE)?.value ?? 'anonymous',
    country,
    // Derived rather than carried, because it is a pure function of data already
    // read. The day a campaign can also decide the bucket, that input has to come
    // from proxy — it lives in the landing request's query string and nowhere else —
    // and this becomes `r.audience ?? audienceOf(country)`.
    audience: audienceOf(country),
    deviceType: classifyDevice(ua),
    locale: r.locale ?? r.cookies.get('NEXT_LOCALE')?.value ?? 'en',
  }
}

/**
 * Coarse device class from the UA string. Deliberately three buckets: anything
 * finer (is this a *cheap* phone?) needs Client Hints, which are Chromium-only
 * and absent on a browser's first request, so a flag targeting them would
 * mis-target every new visitor.
 */
function classifyDevice(ua: string): Attributes['deviceType'] {
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini/i.test(ua)) return 'mobile'
  return 'desktop'
}

/**
 * The `next/headers` wrapper, for Server Components and Route Handlers.
 *
 * Takes locale from the render rather than from a cookie, so a flag can never
 * disagree with the page it is deciding for — see `Source.locale`.
 */
export async function readAttributes(): Promise<Attributes> {
  const [h, c, locale] = await Promise.all([headers(), cookies(), renderedLocale()])
  return resolveAttributes({ headers: h, cookies: c, locale })
}

/**
 * The locale next-intl resolved for this request, or `undefined` where there is no
 * request locale to resolve — a Route Handler under `/api` sits outside the
 * `[locale]` segment, and asking there is a question with no answer rather than an
 * error worth propagating.
 */
async function renderedLocale(): Promise<string | undefined> {
  try {
    return await getLocale()
  } catch {
    return undefined
  }
}
