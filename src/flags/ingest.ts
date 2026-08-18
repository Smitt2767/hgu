import { serverEnv } from '@/env/server'

/**
 * Forwarding events to GrowthBook's Managed Warehouse.
 *
 * Both halves of an experiment come through here: the exposure that says a visitor was
 * shown a variant, and the conversion that says they did the thing it was meant to
 * cause. GrowthBook joins them itself, by the identifier attribute the experiment
 * assigns on — which is why every event carries the full attribute set rather than a
 * variant, and why a conversion never needs to know which arm it belongs to.
 */

/** GrowthBook's documented ceiling for one ingest request. */
const MAX_EVENTS_PER_REQUEST = 100

/**
 * The events this app may send, as a closed set.
 *
 * Closed because the routes that call this are public and unauthenticated — they have
 * to be, since a beacon fires from the browser — so an open `event_name` would let
 * anyone write arbitrary rows into the warehouse and quietly poison a metric. The
 * allowlist means the worst a hostile caller manages is inflating an event that already
 * exists, which the visitor id at least makes visible.
 */
export const TRACKED_EVENTS = ['Experiment Viewed', 'CTA Clicked'] as const

export type TrackedEvent = (typeof TRACKED_EVENTS)[number]

export type IngestEvent = {
  event_name: TrackedEvent
  properties: Record<string, unknown>
  /**
   * Must include the attribute the experiment assigns by. That is the join key between
   * an exposure and a later conversion; without it a row lands in the warehouse and
   * belongs to no one.
   */
  attributes: Record<string, unknown>
}

/**
 * Posts a batch, or explains why it did not.
 *
 * Never throws. This runs inside `after()` behind a beacon whose response nobody reads,
 * so a failure has nowhere to surface except a log line.
 */
export async function sendEvents(events: IngestEvent[]): Promise<number> {
  const host = serverEnv.GROWTHBOOK_INGEST_HOST
  const key = serverEnv.GROWTHBOOK_CLIENT_KEY

  if (!events.length) return 0

  // Named separately because they fail for different reasons: no host means the Managed
  // Warehouse was never wired up, no key means GrowthBook itself is unconfigured.
  //
  // Vercel bakes environment variables in at deploy time, so a variable added after the
  // running deployment was built is invisible here until a redeploy. That reads exactly
  // like the ingest being broken.
  if (!host || !key) {
    console.warn(
      `[flags] ${events.length} event(s) not sent: ` +
        `${!host ? 'GROWTHBOOK_INGEST_HOST' : 'GROWTHBOOK_CLIENT_KEY'} unset`,
    )
    return 0
  }

  const batch = events.slice(0, MAX_EVENTS_PER_REQUEST)

  if (batch.length < events.length) {
    console.warn(`[flags] truncated ${events.length} events to ${batch.length} for one request`)
  }

  try {
    const res = await fetch(`${host}/track?client_key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(batch),
    })

    if (!res.ok) {
      // The body is the useful half of a rejection — it names the offending field — and
      // it is gone by the time this surfaces anywhere else.
      const detail = await res.text().catch(() => '<unreadable>')
      console.error(`[flags] ingest rejected ${res.status}: ${detail}`)
      return 0
    }

    return batch.length
  } catch (error) {
    // A throw here is the network rather than GrowthBook: DNS for a mistyped region, or
    // the request outliving the invocation.
    console.error('[flags] ingest request failed', error)
    return 0
  }
}
