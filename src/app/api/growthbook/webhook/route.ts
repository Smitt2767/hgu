import { serverEnv } from '@/env/server'
import { RULESET_TAG } from '@/flags'
import { createHmac, timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'

/** How far a delivery's timestamp may be from now. Standard Webhooks' recommendation. */
const TOLERANCE_SECONDS = 5 * 60

/**
 * Expires the cached ruleset when a flag changes in GrowthBook.
 *
 * This is an **SDK Webhook**, not an Event Webhook — GrowthBook has both and they
 * sign differently, so pointing the wrong one at this URL produces a 401 that
 * looks like a bug here. An SDK Webhook follows Standard Webhooks: it sends
 * `webhook-id`, `webhook-timestamp` and `webhook-signature`, and signs
 * `{id}.{timestamp}.{body}` with a base64 digest under a secret you read from
 * SDK Configuration → SDK Connections. An Event Webhook signs the raw body alone,
 * hex, under `X-GrowthBook-Signature`.
 *
 * The SDK Webhook is the right one here specifically *because* we read the
 * ruleset from GrowthBook's CDN rather than syncing it into Vercel Edge Config.
 * On the free plan an organisation gets one SDK webhook, and an Edge Config
 * integration would have claimed it. Nothing else wants the slot, and the SDK
 * webhook is the better contract: its signature covers a timestamp, so a captured
 * delivery expires. An Event Webhook signs the body alone and is therefore
 * replayable forever with nothing able to detect it.
 *
 * Reading the CDN directly also side-steps the race that makes invalidation
 * briefly *worse*: there is no intermediate store whose write our refetch could
 * beat, so the payload we re-read is always at least as fresh as the change that
 * triggered this.
 *
 * The delivery carries the new payload in `data.payload`, but we ignore it and
 * re-read instead — `use cache` entries cannot be written from outside, and a
 * refetch of a five-minute-stale tag is cheap.
 */
export async function POST(request: Request) {
  // The raw text, before any parsing: the signature covers these exact bytes and a
  // JSON round-trip does not reproduce them.
  const body = await request.text()
  const secret = serverEnv.GROWTHBOOK_WEBHOOK_SECRET

  if (!secret) return Response.json({ error: 'not configured' }, { status: 500 })

  const id = request.headers.get('webhook-id')
  const timestamp = request.headers.get('webhook-timestamp')
  const signatureHeader = request.headers.get('webhook-signature')

  if (!id || !timestamp || !signatureHeader) {
    return Response.json({ error: 'missing signature headers' }, { status: 401 })
  }

  // The timestamp is signed, so this cannot be forged — which is the whole reason
  // to prefer this webhook over the event one. Without the check the signature is
  // still valid forever and a captured delivery replays indefinitely.
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp))
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) {
    return Response.json({ error: 'timestamp outside tolerance' }, { status: 401 })
  }

  const expected = createHmac('sha256', secret).update(`${id}.${timestamp}.${body}`).digest('base64')

  // Standard Webhooks allows a space-delimited list so a secret can be rotated
  // without dropping deliveries; GrowthBook's own sample reads only the first and
  // would reject every delivery mid-rotation.
  const matches = signatureHeader
    .split(' ')
    .some((entry) => safeEqual(entry.split(',')[1] ?? '', expected))

  if (!matches) return Response.json({ error: 'invalid signature' }, { status: 401 })

  // 'max' is stale-while-revalidate: nobody blocks on the refetch, so a flag
  // change cannot stampede every instance at once.
  revalidateTag(RULESET_TAG, 'max')
  return Response.json({ ok: true, revalidated: RULESET_TAG })
}

/**
 * `timingSafeEqual` **throws** when the buffers differ in length, so calling it
 * directly on attacker-controlled input turns a forged signature into a 500
 * instead of a 401. Compare lengths first. (GrowthBook's documented sample has
 * exactly this bug.)
 */
function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}
