import { resolveAttributes } from '@/flags/attributes'
import { recordExposures } from '@/flags/exposure'
import { decode } from '@/flags/precompute'
import { routing } from '@/i18n/routing'
import { cookies, headers } from 'next/headers'
import { after } from 'next/server'
import z from 'zod'

/**
 * Records which experiment variants a visitor was shown.
 *
 * This is where `after()` belongs. The pattern is right — schedule the analytics write
 * so it cannot delay the response — but it only behaves that way somewhere that runs
 * per request, and a Route Handler always does. The same call inside a precomputed page
 * would fire at build time instead; see `@/flags/exposure`.
 *
 * Returns 204 before any of that happens. Nothing reads the body: the caller is
 * `navigator.sendBeacon`, which is fire-and-forget by design.
 */
const Body = z.object({
  /**
   * The signed segment the page was rendered under.
   *
   * Trusted only because it is HMAC-signed. It has to come from the browser because the
   * proxy rewrite is invisible there — the address bar still shows the clean path — so
   * the page reads its own segment and passes it down.
   */
  code: z.string().min(1).max(512),
  /** Flag keys whose module was present in the rendered layout. */
  keys: z.array(z.string().min(1).max(128)).min(1).max(32),
  /**
   * A bounded enum, so the worst a hostile caller achieves is claiming a different
   * supported locale — and the mismatch check then discards the event anyway.
   *
   * Sent rather than resolved here because this route sits outside the `[locale]`
   * segment, where `getLocale()` has no answer and the fallback reads next-intl's
   * `NEXT_LOCALE` cookie, which lags the request by one navigation.
   */
  locale: z.enum(routing.locales as unknown as [string, ...string[]]),
})

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null))

  // A malformed beacon is a stale deploy or a probe, not something to explain.
  if (!parsed.success) return new Response(null, { status: 204 })

  const { code, keys, locale } = parsed.data
  const secret = process.env.FLAGS_SECRET

  if (!secret) return new Response(null, { status: 204 })

  // Read before `after`, not inside it. Attributes come from this request, and the
  // whole point is that they belong to this visitor rather than to a build.
  const [h, c] = await Promise.all([headers(), cookies()])
  const attributes = resolveAttributes({ headers: h, cookies: c, locale })

  after(async () => {
    const decisions = await decode(code, secret)

    // Fails closed. A code that does not verify tells us nothing about what was
    // rendered, and a guessed exposure is worse than a missing one.
    if (!decisions) {
      console.warn('[flags] exposure beacon carried a code that did not verify')
      return
    }

    await recordExposures({ decisions, keys, attributes })
  })

  return new Response(null, { status: 204 })
}
