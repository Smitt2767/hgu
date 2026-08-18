# Ruleset invalidation

## Pick the right webhook, first

GrowthBook has **two** webhook systems and they sign differently. Pointing the
wrong one at your URL produces a 401 that looks like a bug in your verification
code.

| | SDK Webhook | Event Webhook |
| --- | --- | --- |
| Headers | `webhook-id`, `webhook-timestamp`, `webhook-signature` | `X-GrowthBook-Signature` |
| Signs | `{id}.{timestamp}.{body}` | the raw body alone |
| Digest | base64 | hex |
| Secret | SDK Configuration → SDK Connections | the webhook's own secret |
| Replayable | no — the timestamp is signed | **yes, forever** |

Use the **SDK Webhook** when you read the ruleset from GrowthBook's CDN. Its
signature covers a timestamp, so a captured delivery expires; an Event Webhook
signs the body alone and replays indefinitely with nothing able to detect it.

On the free plan an organisation gets **one SDK webhook slot**, and an edge-config
integration would claim it. Reading the CDN directly leaves the slot free and
side-steps the race that makes invalidation briefly *worse*: with no intermediate
store, the payload you re-read is always at least as fresh as the change that
triggered the delivery.

## The route

```ts
export async function POST(request: Request) {
  // The raw text, before any parsing: the signature covers these exact bytes and
  // a JSON round-trip does not reproduce them.
  const body = await request.text()
  const secret = env.GROWTHBOOK_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: 'not configured' }, { status: 500 })

  const id = request.headers.get('webhook-id')
  const timestamp = request.headers.get('webhook-timestamp')
  const signatureHeader = request.headers.get('webhook-signature')
  if (!id || !timestamp || !signatureHeader) {
    return Response.json({ error: 'missing signature headers' }, { status: 401 })
  }

  // The timestamp is signed, so this cannot be forged — which is the whole reason
  // to prefer this webhook. Without the check the signature is valid forever.
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp))
  if (!Number.isFinite(age) || age > 5 * 60) {
    return Response.json({ error: 'timestamp outside tolerance' }, { status: 401 })
  }

  const expected = createHmac('sha256', secret)
    .update(`${id}.${timestamp}.${body}`)
    .digest('base64')

  // Standard Webhooks allows a space-delimited list so a secret can be rotated
  // without dropping deliveries. Reading only the first entry — as GrowthBook's
  // own sample does — rejects every delivery mid-rotation.
  const matches = signatureHeader
    .split(' ')
    .some((entry) => safeEqual(entry.split(',')[1] ?? '', expected))

  if (!matches) return Response.json({ error: 'invalid signature' }, { status: 401 })

  // 'max' is stale-while-revalidate: nobody blocks on the refetch, so a flag
  // change cannot stampede every instance at once.
  revalidateTag(RULESET_TAG, 'max')
  return Response.json({ ok: true })
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
```

**Ignore the payload the delivery carries.** `use cache` entries cannot be written
from outside, so re-reading is the only option — and a refetch of a five-minute-
stale tag is cheap.

**The secret is the raw HMAC key**, not base64-decoded first.

## What this does and does not buy

It makes a flag change **immediate**. It is not what makes the change *happen* —
`cacheLife('hours')` is `stale: 300`, so a change propagates on its own within
five minutes regardless.

It also cannot reach a running isolate's module-scope memo (the proxy read), so
for the length of that TTL proxy and the render path may disagree. Keep the memo
TTL short and that window stays a non-event.
