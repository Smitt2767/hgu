import type { Attributes } from '@/flags/attributes'
import { buildCatalog } from '@/flags/catalog'
import { serverEnv } from '@/env/server'
import { sendEvents, type IngestEvent } from '@/flags/ingest'
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
    // Neither skip is a failure: the first means the flag is not an experiment, so there
    // is nothing to attribute; the second that it is not in this page's code, so it was
    // decided some other way.
    if (!experiments.has(key) || !(key in decisions)) continue

    // A visitor who was never assigned produces no callback and no event, correctly —
    // the SDK invokes `trackingCallback` only on genuine assignment, which is the whole
    // reason this re-evaluates rather than trusting the decoded value.
    client.evalFeature(key, {
      attributes,
      // Per user context rather than on the client, so the closure can see which
      // decision this particular key was rendered under.
      trackingCallback: (experiment, assignment) => {
        if (!sameValue(assignment.value, decisions[key])) {
          mismatched += 1
          // Both values, because which way round it went is the whole diagnosis: the
          // rendered one came from proxy at rewrite time, this one from re-evaluating
          // moments later. They differ only if the ruleset changed in between.
          console.warn(
            `[flags] exposure mismatch on ${key}: rendered=${JSON.stringify(decisions[key])}` +
              ` re-evaluated=${JSON.stringify(assignment.value)} — dropped`,
          )
          return
        }

        events.push(toEvent(experiment.key, assignment, attributes))
      },
    })
  }

  client.destroy()

  const sent = await sendEvents(events)

  return { sent, mismatched, dryRun: !serverEnv.GROWTHBOOK_INGEST_HOST }
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

/** Serialised comparison, so object-valued flags compare by content. */
function sameValue(a: unknown, b: unknown): boolean {
  return a === b || JSON.stringify(a) === JSON.stringify(b)
}
