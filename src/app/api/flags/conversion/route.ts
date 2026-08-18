import { resolveAttributes } from '@/flags/attributes'
import { sendEvents, TRACKED_EVENTS } from '@/flags/ingest'
import { routing } from '@/i18n/routing'
import { cookies, headers } from 'next/headers'
import { after } from 'next/server'
import z from 'zod'

/**
 * Records that a visitor did the thing an experiment was meant to cause.
 *
 * The other half of `/api/flags/exposure`. GrowthBook joins the two itself, by the
 * identifier attribute the experiment assigns on, so nothing here needs to know which
 * variant the visitor saw — and deliberately does not accept one. A browser asserting
 * "I converted on variant B" would be forgeable in a way that quietly rewrites results;
 * the exposure event already established the arm from a signed code.
 *
 * Attributes are resolved from this request rather than sent, for the same reason. The
 * visitor id lives in an httpOnly cookie the page cannot read, which is what makes the
 * join key trustworthy.
 */
const Body = z.object({
  /**
   * Closed set, because this endpoint is public and unauthenticated — it has to be,
   * since the caller is a beacon. An open event name would let anyone write arbitrary
   * rows into the warehouse.
   */
  event: z.enum(TRACKED_EVENTS),
  /**
   * Free-form, but bounded: enough for a label or a block id to slice results by,
   * without becoming a channel for writing whatever someone likes into the warehouse.
   */
  properties: z.record(z.string().max(64), z.union([z.string().max(256), z.number(), z.boolean()])).optional(),
  locale: z.enum(routing.locales as unknown as [string, ...string[]]),
})

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null))

  // A malformed beacon is a stale deploy or a probe, and answering 204 either way keeps
  // this from being a probe that tells anyone anything.
  if (!parsed.success) return new Response(null, { status: 204 })

  const { event, properties, locale } = parsed.data

  // Read before `after`, not inside it: these belong to this request.
  const [h, c] = await Promise.all([headers(), cookies()])
  const attributes = resolveAttributes({ headers: h, cookies: c, locale })

  after(async () => {
    await sendEvents([{ event_name: event, properties: properties ?? {}, attributes }])
  })

  return new Response(null, { status: 204 })
}
