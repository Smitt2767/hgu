import { asUser } from '@/access'
import { buildCatalog } from '@/flags/catalog'
import { precomputable } from '@/flags/precompute'
import { getRuleset } from '@/flags'
import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

/**
 * The flag list the Payload admin's flag picker renders.
 *
 * Authenticated as a CMS user rather than gated by a shared secret: this endpoint
 * exists for the admin UI, so the admin's own session is the natural credential and
 * there is no extra token to distribute or rotate. `asUser` narrows to the `users`
 * collection specifically — the MCP plugin registers a second auth collection, and a
 * request holding an MCP API key must not read the flag list.
 *
 * Not a leak of anything secret, but flag keys describe unreleased work, so it does
 * not belong on the public internet either.
 */
export async function GET() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!asUser(user)) {
    return Response.json({ error: 'unauthorised' }, { status: 401 })
  }

  const ruleset = await getRuleset()

  // Annotated here rather than inside `buildCatalog`, because whether a flag is
  // precomputed depends on the whole set: the permutation cap can exclude one that
  // qualifies on its own. This is the same call proxy and the build make, so the
  // admin cannot disagree with what actually ships.
  const precomputedKeys = new Set(precomputable(ruleset).flags.map((entry) => entry.key))

  return Response.json({
    // Distinguishes "GrowthBook has no features" from "we could not reach it", which
    // otherwise both render as an empty dropdown with nothing to explain it.
    reachable: ruleset !== null,
    dateUpdated: ruleset?.dateUpdated ?? null,
    flags: buildCatalog(ruleset).map((entry) => ({
      ...entry,
      precomputed: precomputedKeys.has(entry.key),
    })),
  })
}
