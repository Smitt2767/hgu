import { serverEnv } from '@/env/server'
import { getRuleset, readAttributes } from '@/flags'
import { timingSafeEqual } from 'crypto'

/**
 * End-to-end check of the setup: is the ruleset reachable, and what attributes
 * did this request resolve to.
 *
 * This is the fastest way to tell apart failures that look identical from a page
 * — a missing client key, an unreachable GrowthBook, and a ruleset that arrived
 * but is empty all leave every future flag sitting at its default.
 *
 * Not public. It reports the feature keys defined in GrowthBook and this
 * visitor's bucketing attributes, so in production it answers only to a caller
 * holding FLAGS_SECRET; with no secret set there is nothing to check against and
 * it stays off entirely.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const secret = serverEnv.FLAGS_SECRET
    const provided = new URL(request.url).searchParams.get('secret')
    // Fail closed: no secret configured means no way in at all, rather than an
    // endpoint that is open because someone forgot a variable.
    if (!secret || !safeEqual(provided ?? '', secret)) {
      // 404 rather than 401, so the endpoint does not advertise that it exists.
      return Response.json({ error: 'not found' }, { status: 404 })
    }
  }

  const [ruleset, attributes] = await Promise.all([getRuleset(), readAttributes()])

  return Response.json({
    ruleset: {
      // Distinguishes "no key configured" from "fetch failed" — both yield null.
      configured: Boolean(serverEnv.GROWTHBOOK_CLIENT_KEY),
      apiHost: serverEnv.GROWTHBOOK_API_HOST,
      reachable: ruleset !== null,
      dateUpdated: ruleset?.dateUpdated ?? null,
      featureKeys: Object.keys(ruleset?.features ?? {}),
      experimentCount: ruleset?.experiments?.length ?? 0,
    },
    attributes,
    // No flags are declared yet. `featureKeys` above is what GrowthBook has; this
    // is what the app reads. They stay empty until the first `flag()` lands in
    // src/flags/index.ts.
    flags: {},
  })
}

/**
 * Length-checked first: `timingSafeEqual` throws on a length mismatch, which
 * would turn a wrong secret into a 500 that confirms the endpoint exists.
 */
function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}
