import type { Attributes } from '@/flags/attributes'
import { buildCatalog } from '@/flags/catalog'
import { serverEnv } from '@/env/server'
import type { Decisions } from '@/flags/precompute'
import { getRuleset } from '@/flags/ruleset'
import { GrowthBookClient, type Result } from '@growthbook/growthbook'

/**
 * Recording which variant a visitor actually saw.
 *
 * An A/B test is an exposure event paired with a later conversion. The variant
 * rendering is not the experiment; this file is.
 *
 * ## Why this cannot live in the page
 *
 * The obvious shape — `trackingCallback` plus `after()` in the Server Component that
 * renders the module — is correct on a route that renders per request, and wrong here.
 * `after` is not a request-time API: *"if it's used within a static page, the callback
 * will execute at build time, or whenever a page is revalidated"*. Every precomputed
 * page is a static page, so that callback fires once per prebuilt file and never
 * again. Twenty-four prebuilt pages would record twenty-four exposures while
 * conversions kept attaching to every real visitor, and every dashboard would look
 * populated.
 *
 * So the browser has to start it. A prerendered response involves no server work at
 * all — it is a file on disk — and there is no server moment to hook.
 *
 * ## Why the browser does not send the decision
 *
 * It cannot see it. Proxy rewrites `/about` to `/en/<code>/about` without touching the
 * address bar, so `window.location` never carries the code. The page knows it, passes
 * it to the beacon, and the beacon hands it back — and because the code is HMAC-signed
 * the route can trust it. A browser asserting "I was shown variant B" is forgeable;
 * a signed code is not.
 *
 * ## Why the value is re-evaluated rather than read from the code
 *
 * The code carries the flag's *value*, and a value does not say whether an experiment
 * happened. `"control"` arises two ways: assigned to variation 0, or never entered the
 * experiment and fell through to `defaultValue`. Those must be counted differently and
 * no amount of decoding separates them.
 *
 * Re-evaluating does separate them, for free: the SDK invokes `trackingCallback` only
 * on genuine assignment, so "was this visitor in the experiment" is answered by the
 * library that owns the question rather than reconstructed here.
 */

/** GrowthBook's documented ceiling for one ingest request. */
const MAX_EVENTS_PER_REQUEST = 100

export type ExposureReport = {
  /** Events accepted by the ingest endpoint. */
  sent: number
  /**
   * Assignments dropped because the re-evaluated variant disagreed with the one the
   * page was built for. Expected to be zero; see `recordExposures`.
   */
  mismatched: number
  /** True when no ingest host is configured, so nothing left the process. */
  dryRun: boolean
}

/**
 * Evaluates the named experiments for one visitor and forwards their exposures.
 *
 * `keys` comes from the page and lists only flags whose module was present in the
 * rendered layout. Without that the denominator is wrong: proxy decides every
 * precomputable flag on every request, including on pages containing none of those
 * modules, so tracking from proxy would count visitors who never saw the thing.
 *
 * Note it is *present*, not *visible*. A variant that hides the module still exposed
 * the visitor — for them the absence is the treatment — and dropping that arm would
 * bias the result far worse than including it.
 *
 * Never throws. Analytics failing is not a reason for a visitor's request to fail, and
 * this runs behind a beacon whose response nobody reads.
 */
export async function recordExposures(args: {
  decisions: Decisions
  keys: string[]
  attributes: Attributes
}): Promise<ExposureReport> {
  const { decisions, keys, attributes } = args

  const ruleset = await getRuleset()
  if (!ruleset) return { sent: 0, mismatched: 0, dryRun: true }

  // Only experiments produce exposures. A flag forced by a rule has no variant to
  // attribute a conversion to, and counting it would invent an experiment that does
  // not exist in the dashboard.
  const experiments = new Set(
    buildCatalog(ruleset)
      .filter((entry) => entry.hasExperiment)
      .map((entry) => entry.key),
  )

  const events: IngestEvent[] = []
  let mismatched = 0

  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })

  for (const key of new Set(keys)) {
    if (!experiments.has(key) || !(key in decisions)) continue

    client.evalFeature(key, {
      attributes,
      // Per user context rather than on the client, so the closure can see which
      // decision this particular key was rendered under.
      trackingCallback: (experiment, result) => {
        if (!sameValue(result.value, decisions[key])) {
          mismatched += 1
          return
        }

        events.push(toEvent(experiment.key, result, attributes))
      },
    })
  }

  client.destroy()

  if (mismatched) {
    // Only reachable when the ruleset changed in the seconds between proxy's rewrite
    // and this beacon. Worth a line each time: a rising count means codes and renders
    // are drifting apart, which no other signal here would reveal.
    console.warn(`[flags] ${mismatched} exposure(s) disagreed with the rendered variant`)
  }

  const sent = await send(events)

  return { sent, mismatched, dryRun: !serverEnv.GROWTHBOOK_INGEST_HOST }
}

type IngestEvent = {
  event_name: 'Experiment Viewed'
  properties: { experimentId: string; variationId: string }
  attributes: Record<string, unknown>
}

/**
 * `result.key` rather than `result.variationId`, matching GrowthBook's own server
 * examples: `variationId` is the numeric index, while `key` is the variation's
 * identifier and is what the warehouse joins on.
 *
 * The hash attribute is written last and read off the result rather than assumed to be
 * `id`. Ingest requires the attribute the experiment assigns by, and an experiment
 * re-pointed at a different one in the dashboard has to keep working with no deploy —
 * the same property the rest of this system is built for. Everything else rides along
 * so results can be sliced by country or device without a second event.
 */
function toEvent(
  experimentId: string,
  result: Result<unknown>,
  attributes: Attributes,
): IngestEvent {
  return {
    event_name: 'Experiment Viewed',
    properties: { experimentId, variationId: result.key },
    attributes: { ...attributes, [result.hashAttribute]: result.hashValue },
  }
}

/**
 * Posts the batch, or reports what it would have posted.
 *
 * One request per page view, which is inside GrowthBook's documented default of one
 * request per second only while traffic is. Past that the endpoint rate-limits and
 * events are lost — the fix is a queue that batches across requests up to
 * `MAX_EVENTS_PER_REQUEST`, and the honest signal that it is needed is a 429 here.
 */
async function send(events: IngestEvent[]): Promise<number> {
  const host = serverEnv.GROWTHBOOK_INGEST_HOST
  const key = serverEnv.GROWTHBOOK_CLIENT_KEY

  if (!events.length) return 0

  if (!host || !key) {
    console.info(`[flags] ${events.length} exposure(s) not sent: ingest not configured`)
    return 0
  }

  const batch = events.slice(0, MAX_EVENTS_PER_REQUEST)

  try {
    const res = await fetch(`${host}/track?client_key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(batch),
    })

    if (!res.ok) throw new Error(`ingest responded ${res.status}`)

    return batch.length
  } catch (error) {
    console.error('[flags] exposure ingest failed', error)
    return 0
  }
}

/** Serialised comparison, so object-valued flags compare by content. */
function sameValue(a: unknown, b: unknown): boolean {
  return a === b || JSON.stringify(a) === JSON.stringify(b)
}
