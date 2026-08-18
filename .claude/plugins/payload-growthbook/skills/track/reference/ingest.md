# Sending events

Both halves of an experiment go through one function: the exposure that says a
visitor was shown a variant, and the conversion that says they did the thing it
was meant to cause. The warehouse joins them itself, by the identifier attribute
the experiment assigns on — which is why **every event carries the full attribute
set** rather than a variant, and why a conversion never needs to know its arm.

```ts
/** The provider's documented ceiling for one ingest request. */
const MAX_EVENTS_PER_REQUEST = 100

/**
 * The events this app may send, as a closed set.
 *
 * Closed because the routes that call this are public and unauthenticated — they
 * have to be, since a beacon fires from the browser — so an open `event_name`
 * would let anyone write arbitrary rows into the warehouse and quietly poison a
 * metric. The allow-list means the worst a hostile caller manages is inflating an
 * event that already exists, which the visitor id at least makes visible.
 */
export const TRACKED_EVENTS = ['Experiment Viewed', 'CTA Clicked'] as const

export type IngestEvent = {
  event_name: (typeof TRACKED_EVENTS)[number]
  properties: Record<string, unknown>
  /**
   * Must include the attribute the experiment assigns by. That is the join key
   * between an exposure and a later conversion; without it a row lands in the
   * warehouse and belongs to no one.
   */
  attributes: Record<string, unknown>
}

/**
 * Posts a batch, or explains why it did not. Never throws — this runs inside
 * `after()` behind a beacon whose response nobody reads, so a failure has nowhere
 * to surface except a log line.
 */
export async function sendEvents(events: IngestEvent[]): Promise<number> {
  const host = env.GROWTHBOOK_INGEST_HOST
  const key = env.GROWTHBOOK_CLIENT_KEY
  if (!events.length) return 0

  // Named separately because they fail for different reasons: no host means the
  // warehouse was never wired up, no key means GrowthBook itself is unconfigured.
  //
  // Vercel bakes environment variables in at deploy time, so a variable added
  // after the running deployment was built is invisible here until a redeploy.
  // That reads exactly like the ingest being broken.
  if (!host || !key) {
    console.warn(
      `[flags] ${events.length} event(s) not sent: ` +
        `${!host ? 'GROWTHBOOK_INGEST_HOST' : 'GROWTHBOOK_CLIENT_KEY'} unset`,
    )
    return 0
  }

  const batch = events.slice(0, MAX_EVENTS_PER_REQUEST)
  if (batch.length < events.length)
    console.warn(`[flags] truncated ${events.length} events to ${batch.length}`)

  try {
    const res = await fetch(`${host}/track?client_key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(batch),
    })

    if (!res.ok) {
      // The body is the useful half of a rejection — it names the offending field
      // — and it is gone by the time this surfaces anywhere else.
      const detail = await res.text().catch(() => '<unreadable>')
      console.error(`[flags] ingest rejected ${res.status}: ${detail}`)
      return 0
    }
    return batch.length
  } catch (error) {
    // A throw here is the network rather than the provider: DNS for a mistyped
    // region, or the request outliving the invocation.
    console.error('[flags] ingest request failed', error)
    return 0
  }
}
```

**The client key authenticates ingest on the query string**, which is why the host
is read on the server and never shipped to the browser: that key also fetches the
full ruleset, so exposing it hands over every flag rule in the project.

**While the host is unset, count and log but do not send.** That is the useful
failure — an experiment silently recording nothing looks exactly like an
experiment nobody has entered yet.

## The exposure event

```ts
/**
 * `result.key` rather than `result.variationId`: `variationId` is the numeric
 * index, while `key` is the variation's identifier and is what the warehouse
 * joins on.
 *
 * The hash attribute is written last and read off the result rather than assumed
 * to be `id`. Ingest requires the attribute the experiment assigns by, and an
 * experiment re-pointed at a different one in the dashboard has to keep working
 * with no deploy. Everything else rides along so results can be sliced by country
 * or device without a second event.
 */
function toEvent(experimentId: string, result: Result<unknown>, attributes: Attributes) {
  return {
    event_name: 'Experiment Viewed' as const,
    properties: { experimentId, variationId: result.key },
    attributes: { ...attributes, [result.hashAttribute]: result.hashValue },
  }
}
```

## The conversion route

```ts
const Body = z.object({
  // Closed set: this endpoint is public and unauthenticated.
  event: z.enum(TRACKED_EVENTS),
  // Free-form but bounded: enough for a label or a block id to slice results by,
  // without becoming a channel for writing whatever someone likes.
  properties: z
    .record(z.string().max(64), z.union([z.string().max(256), z.number(), z.boolean()]))
    .optional(),
  locale: z.enum(LOCALES),
})

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null))
  // A malformed beacon is a stale deploy or a probe, and answering 204 either way
  // keeps this from being a probe that tells anyone anything.
  if (!parsed.success) return new Response(null, { status: 204 })

  // Read before `after`, not inside it: these belong to this request.
  const [h, c] = await Promise.all([headers(), cookies()])
  const attributes = resolveAttributes({ headers: h, cookies: c, locale: parsed.data.locale })

  after(async () => {
    await sendEvents([{ event_name: parsed.data.event, properties: parsed.data.properties ?? {}, attributes }])
  })

  return new Response(null, { status: 204 })
}
```

**No variant field, deliberately.** The exposure established the arm from a signed
code; accepting one here would let a browser rewrite results.
