import { asUser } from '@/access'
import { buildCatalog } from '@/flags/catalog'
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

  return Response.json({
    // Distinguishes "GrowthBook has no features" from "we could not reach it", which
    // otherwise both render as an empty dropdown with nothing to explain it.
    reachable: ruleset !== null,
    dateUpdated: ruleset?.dateUpdated ?? null,
    flags: buildCatalog(ruleset),
  })
}
