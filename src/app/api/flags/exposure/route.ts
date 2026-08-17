import { resolveAttributes, VISITOR_COOKIE } from '@/flags/attributes'
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

/**
 * Every exit from this handler is a 204, which is right for a beacon nobody reads and
 * useless for debugging — so each one says why on the way out. Filter Vercel's logs on
 * `[exposure]` to see a beacon's whole path, here and through `@/flags/exposure`.
 */
const TAG = '[exposure]'

export async function POST(request: Request) {
  const raw = await request.text().catch(() => '')

  let payload: unknown = null
  try {
    payload = JSON.parse(raw)
  } catch {
    // Logged with the raw bytes because the usual cause is something other than our
    // beacon posting here, and the body identifies it.
    console.warn(`${TAG} unparseable body (${raw.length} bytes): ${raw.slice(0, 200)}`)
    return new Response(null, { status: 204 })
  }

  const parsed = Body.safeParse(payload)

  if (!parsed.success) {
    // A shape mismatch usually means a prebuilt page from an older deploy is still
    // beaconing with the previous contract, which is worth being able to see.
    console.warn(
      `${TAG} rejected body: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
    )
    return new Response(null, { status: 204 })
  }

  const { code, keys, locale } = parsed.data

  console.info(
    `${TAG} beacon: keys=[${keys.join(',')}] locale=${locale} code=${code.slice(0, 12)}…` +
      ` (${code.length} chars) referer=${request.headers.get('referer') ?? 'none'}`,
  )

  const secret = process.env.FLAGS_SECRET

  if (!secret) {
    console.warn(`${TAG} FLAGS_SECRET unset: cannot verify the code, so nothing is recorded`)
    return new Response(null, { status: 204 })
  }

  // Read before `after`, not inside it. Attributes come from this request, and the
  // whole point is that they belong to this visitor rather than to a build.
  const [h, c] = await Promise.all([headers(), cookies()])
  const attributes = resolveAttributes({ headers: h, cookies: c, locale })

  if (attributes.id === 'anonymous') {
    // Every experiment hashes on this, so a missing visitor cookie means the whole
    // batch buckets on a constant and the arms cannot be told apart.
    console.warn(`${TAG} no ${VISITOR_COOKIE} cookie: bucketing on the fallback id`)
  }

  after(async () => {
    const decisions = await decode(code, secret)

    // Fails closed. A code that does not verify tells us nothing about what was
    // rendered, and a guessed exposure is worse than a missing one.
    if (!decisions) {
      console.warn(
        `${TAG} code did not verify (${code.slice(0, 12)}…) — a FLAGS_SECRET that differs` +
          ' between proxy and this route would do exactly this',
      )
      return
    }

    try {
      await recordExposures({ decisions, keys, attributes })
    } catch (error) {
      // `recordExposures` is written not to throw; if it ever does, the response has
      // already been sent and this is the only place the reason could surface.
      console.error(`${TAG} recording threw after the response was sent`, error)
    }
  })

  return new Response(null, { status: 204 })
}
