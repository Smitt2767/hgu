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

/**
 * One prefix for every line this path emits.
 *
 * Filtering Vercel's logs on `[exposure]` should show the complete story of a beacon —
 * what arrived, what each key resolved to, what was sent and what came back — and
 * nothing else. That matters because every interesting failure here is silent: an
 * experiment that records nothing looks exactly like an experiment nobody entered, and
 * a 204 is returned either way.
 *
 * Logged at `info` on the happy path so the trail exists without an error to trigger it.
 * If the volume ever becomes a problem the fix is to gate the `info` calls on an env
 * flag, not to remove them — the `warn`/`error` lines are the ones that pay for
 * themselves and should stay unconditional.
 */
const TAG = '[exposure]'

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

  console.info(
    `${TAG} recording: keys=[${keys.join(',')}] decided=[${Object.keys(decisions).join(',')}]` +
      ` id=${attributes.id} locale=${attributes.locale} country=${attributes.country}` +
      ` audience=${attributes.audience} device=${attributes.deviceType}`,
  )

  const ruleset = await getRuleset()

  if (!ruleset) {
    // Not an error state on its own — GROWTHBOOK_CLIENT_KEY may simply be unset — but
    // it means nothing can be attributed, so say so rather than returning a quiet zero.
    console.warn(`${TAG} no ruleset available, nothing can be recorded`)
    return { sent: 0, mismatched: 0, dryRun: true }
  }

  // Only experiments produce exposures. A flag forced by a rule has no variant to
  // attribute a conversion to, and counting it would invent an experiment that does
  // not exist in the dashboard.
  const experiments = new Set(
    buildCatalog(ruleset)
      .filter((entry) => entry.hasExperiment)
      .map((entry) => entry.key),
  )

  console.info(`${TAG} experiments in ruleset: [${[...experiments].join(',')}]`)

  const events: IngestEvent[] = []
  let mismatched = 0

  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })

  for (const key of new Set(keys)) {
    // Both skips are ordinary rather than broken, and both are worth naming: the first
    // says the flag is not an experiment (so there is nothing to attribute), the second
    // that it is not in this page's code (so it was decided some other way).
    if (!experiments.has(key)) {
      console.info(`${TAG} skip ${key}: not an experiment in the current ruleset`)
      continue
    }

    if (!(key in decisions)) {
      console.info(`${TAG} skip ${key}: absent from the decoded code`)
      continue
    }

    let fired = false

    const result = client.evalFeature(key, {
      attributes,
      // Per user context rather than on the client, so the closure can see which
      // decision this particular key was rendered under.
      trackingCallback: (experiment, assignment) => {
        fired = true

        if (!sameValue(assignment.value, decisions[key])) {
          mismatched += 1
          // Both values, because which way round it went is the whole diagnosis: the
          // rendered one came from proxy at rewrite time, this one from re-evaluating
          // moments later. They differ only if the ruleset changed in between.
          console.warn(
            `${TAG} mismatch ${key}: rendered=${JSON.stringify(decisions[key])}` +
              ` re-evaluated=${JSON.stringify(assignment.value)} — dropping, not guessing`,
          )
          return
        }

        events.push(toEvent(experiment.key, assignment, attributes))

        console.info(
          `${TAG} queued ${key}: experimentId=${experiment.key} variationId=${assignment.key}` +
            ` (index ${assignment.variationId}) via ${assignment.hashAttribute}=${assignment.hashValue}`,
        )
      },
    })

    // The quiet case, and the one most likely to be mistaken for a bug. The SDK calls
    // `trackingCallback` only on genuine assignment, so a visitor who did not qualify
    // produces no event and no warning — correctly. `source` says which rule answered
    // instead, which is the difference between "not in the experiment" and "the
    // experiment is not reaching anyone".
    if (!fired) {
      const outcome = result.experimentResult
      console.info(
        `${TAG} no exposure for ${key}: value=${JSON.stringify(result.value)}` +
          ` source=${result.source} inExperiment=${outcome?.inExperiment ?? 'n/a'}` +
          ` hashUsed=${outcome?.hashUsed ?? 'n/a'} — visitor was not assigned, so there is` +
          ' nothing to attribute',
      )
    }
  }

  client.destroy()

  const sent = await send(events)
  const report = { sent, mismatched, dryRun: !serverEnv.GROWTHBOOK_INGEST_HOST }

  console.info(
    `${TAG} done: built=${events.length} sent=${sent} mismatched=${mismatched}` +
      ` dryRun=${report.dryRun}`,
  )

  return report
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

  if (!events.length) {
    console.info(`${TAG} nothing to send`)
    return 0
  }

  // Named separately because they fail for different reasons: no host means the
  // Managed Warehouse was never wired up, no key means GrowthBook itself is not
  // configured and the ruleset would have been null too.
  if (!host || !key) {
    console.warn(
      `${TAG} ${events.length} event(s) NOT sent: ` +
        `${!host ? 'GROWTHBOOK_INGEST_HOST unset' : 'GROWTHBOOK_CLIENT_KEY unset'}` +
        ' — note Vercel bakes env vars in at deploy time, so a variable added after the' +
        ' running deployment was built is not visible here until you redeploy',
    )
    return 0
  }

  const batch = events.slice(0, MAX_EVENTS_PER_REQUEST)

  if (batch.length < events.length) {
    console.warn(`${TAG} truncated ${events.length} events to ${batch.length} for one request`)
  }

  const url = `${host}/track?client_key=${encodeURIComponent(key)}`
  const body = JSON.stringify(batch)

  // The host without the key, so the region is visible in logs and the credential is
  // not. Sending to the wrong region succeeds and silently lands in a different
  // ClickHouse cluster than the warehouse, which is otherwise indistinguishable from
  // events never arriving.
  console.info(`${TAG} POST ${host}/track — ${batch.length} event(s), ${body.length} bytes`)
  console.info(`${TAG} payload ${body}`)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    })

    if (!res.ok) {
      // The body is the useful half of a rejection — it names the offending field —
      // and it is gone by the time this surfaces anywhere else.
      const detail = await res.text().catch(() => '<unreadable>')
      console.error(`${TAG} ingest rejected ${res.status} ${res.statusText}: ${detail}`)
      return 0
    }

    console.info(`${TAG} ingest accepted ${batch.length} event(s) (${res.status})`)
    return batch.length
  } catch (error) {
    // A throw here is the network, not GrowthBook: DNS for a mistyped region, or the
    // request outliving the invocation.
    console.error(`${TAG} ingest request failed before a response`, error)
    return 0
  }
}

/** Serialised comparison, so object-valued flags compare by content. */
function sameValue(a: unknown, b: unknown): boolean {
  return a === b || JSON.stringify(a) === JSON.stringify(b)
}
