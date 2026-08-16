import { VISITOR_COOKIE } from '@/flags/constants'
import type { Identify } from 'flags'
import { dedupe } from 'flags/next'
import { cookies, headers } from 'next/headers'

export { VISITOR_COOKIE }

export type Attributes = {
  /** Stable bucketing key. Every experiment hashes on this. */
  id: string
  country: string
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

/**
 * Attribute resolution as a pure function over (headers, cookies).
 *
 * Written this way from the start on purpose: three callers need it and only one
 * of them may use `next/headers`. A Server Component can, proxy cannot, and the
 * Flags SDK hands `identify` sealed stores instead. Retrofitting this shape later
 * means touching every call site.
 */
export function resolveAttributes(r: { headers: HeaderReader; cookies: CookieReader }): Attributes {
  const ua = r.headers.get('user-agent') ?? ''

  return {
    // Falls back to a constant rather than a random value: a random id per request
    // would put the same visitor in a different bucket on every page load, which
    // reads as an experiment with no effect rather than as a missing cookie.
    id: r.cookies.get(VISITOR_COOKIE)?.value ?? 'anonymous',
    // Vercel resolves this at the edge. Absent locally, which is why targeting by
    // country cannot be verified on a dev machine.
    country: r.headers.get('x-vercel-ip-country') ?? 'unknown',
    deviceType: classifyDevice(ua),
    locale: r.cookies.get('NEXT_LOCALE')?.value ?? 'en',
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

/** The `next/headers` wrapper, for Server Components and Route Handlers. */
export async function readAttributes(): Promise<Attributes> {
  const [h, c] = await Promise.all([headers(), cookies()])
  return resolveAttributes({ headers: h, cookies: c })
}

/**
 * Reads the stores the SDK hands it rather than calling `next/headers` itself.
 *
 * That distinction matters: a flag evaluated against the synthetic request used
 * by `readStatic` would otherwise answer from the *real* request, targeting on
 * one visitor's attributes while claiming to be a build-time read.
 *
 * `dedupe` makes it run once per request no matter how many flags ask.
 */
export const identify = dedupe((({ headers, cookies }) =>
  resolveAttributes({ headers, cookies })) satisfies Identify<Attributes>)
