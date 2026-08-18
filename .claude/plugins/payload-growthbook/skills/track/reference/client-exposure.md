# Exposure from the browser

For pages whose HTML is prebuilt. Three pieces: a client component that fires
once per page view, a route that verifies what it was handed, and a re-evaluation
that decides whether an experiment actually happened.

## The beacon component

```tsx
'use client'

/**
 * Reports the experiment variants this page view actually showed.
 *
 * A client component because it is the only thing on a precomputed page that runs
 * once per visitor. The HTML is a prebuilt file, so every server component in it
 * ran at build time — an exposure there is counted once per prebuilt page and
 * never again, while conversions keep arriving from real people.
 *
 * Renders nothing, and deliberately sits outside every block so a variant that
 * hides its module still reports.
 */
export default function ExposureBeacon({ code, keys, locale }) {
  const sent = useRef(false)
  // Joined so the effect's dependency is a value rather than a fresh array
  // identity on every render.
  const list = keys.join(',')

  useEffect(() => {
    // React remounts effects in development, and a page view is one exposure.
    if (sent.current) return
    sent.current = true
    beacon('/api/flags/exposure', { code, keys: list.split(','), locale })
  }, [code, list, locale])

  return null
}
```

```ts
/**
 * `sendBeacon` is the right primitive for both callers, and for the same reason:
 * the page may be gone before the request finishes. An exposure fires on a page a
 * visitor might leave immediately, and a conversion fires on a click that is
 * *about* to navigate away — a plain `fetch` there is cancelled when the document
 * unloads, which loses exactly the clicks the experiment exists to count.
 */
export function beacon(url: string, body: unknown): void {
  const payload = JSON.stringify(body)
  // `false` means the browser refused to queue it — over the size cap, or the API
  // is disabled — rather than that delivery failed.
  const queued = navigator.sendBeacon?.(url, new Blob([payload], { type: 'application/json' }))
  if (queued) return

  // `keepalive` asks for the same survive-the-unload behaviour, which is the only
  // part of `sendBeacon` worth reproducing here.
  void fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}
```

## The route

```ts
const Body = z.object({
  /**
   * The signed segment the page was rendered under. Trusted only because it is
   * HMAC-signed. It has to come from the browser because the proxy rewrite is
   * invisible there — the address bar still shows the clean path.
   */
  code: z.string().min(1).max(512),
  /** Flag keys whose module was present in the rendered layout. */
  keys: z.array(z.string().min(1).max(128)).min(1).max(32),
  /**
   * A bounded enum, so the worst a hostile caller achieves is claiming a
   * different supported locale — and the mismatch check discards the event anyway.
   * Sent rather than resolved here because this route sits outside the locale
   * segment, where the i18n cookie lags the request by one navigation.
   */
  locale: z.enum(LOCALES),
})

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return new Response(null, { status: 204 })

  const { code, keys, locale } = parsed.data
  const secret = process.env.FLAGS_SECRET
  if (!secret) return new Response(null, { status: 204 })

  // Read before `after`, not inside it. Attributes come from this request, and the
  // whole point is that they belong to this visitor rather than to a build.
  const [h, c] = await Promise.all([headers(), cookies()])
  const attributes = resolveAttributes({ headers: h, cookies: c, locale })

  if (attributes.id === 'anonymous') {
    // Worth a line: every experiment hashes on this, so a missing visitor cookie
    // means the batch buckets on a constant and the arms cannot be told apart.
    console.warn('[flags] exposure with no visitor cookie: bucketing on the fallback')
  }

  after(async () => {
    const decisions = await decode(code, secret)
    // Fails closed. A code that does not verify tells us nothing about what was
    // rendered, and a guessed exposure is worse than a missing one.
    if (!decisions) return console.warn('[flags] exposure code did not verify')
    await recordExposures({ decisions, keys, attributes })
  })

  return new Response(null, { status: 204 })
}
```

**This is where `after()` belongs.** The pattern is right — schedule the analytics
write so it cannot delay the response — but it only behaves that way somewhere
that runs per request, and a route handler always does.

## Re-evaluating

```ts
/**
 * `keys` comes from the page and lists only flags whose module was present in the
 * rendered layout. Without that the denominator is wrong: proxy decides every
 * precomputable flag on every request, including on pages containing none of
 * those modules, so tracking from proxy would count visitors who never saw it.
 *
 * Note it is *present*, not *visible*. A variant that hides the module still
 * exposed the visitor.
 */
export async function recordExposures({ decisions, keys, attributes }) {
  const ruleset = await getRuleset()
  if (!ruleset) return { sent: 0, mismatched: 0, dryRun: true }

  // Only experiments produce exposures. A flag forced by a rule has no variant to
  // attribute a conversion to, and counting it would invent an experiment that
  // does not exist in the dashboard.
  const experiments = new Set(
    buildCatalog(ruleset).filter((e) => e.hasExperiment).map((e) => e.key),
  )

  const events: IngestEvent[] = []
  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })

  for (const key of new Set(keys)) {
    // Neither skip is a failure: the first means the flag is not an experiment,
    // the second that it is not in this page's code.
    if (!experiments.has(key) || !(key in decisions)) continue

    // A visitor who was never assigned produces no callback and no event,
    // correctly — the SDK invokes this only on genuine assignment, which is the
    // whole reason this re-evaluates rather than trusting the decoded value.
    client.evalFeature(key, {
      attributes,
      trackingCallback: (experiment, assignment) => {
        if (!sameValue(assignment.value, decisions[key])) {
          // Both values, because which way round it went is the whole diagnosis:
          // the rendered one came from proxy at rewrite time, this one from
          // re-evaluating moments later. They differ only if the ruleset changed
          // in between.
          console.warn(`[flags] exposure mismatch on ${key} — dropped`)
          return
        }
        events.push(toEvent(experiment.key, assignment, attributes))
      },
    })
  }

  client.destroy()
  return { sent: await sendEvents(events), dryRun: !env.GROWTHBOOK_INGEST_HOST }
}
```

## Collecting the keys in the renderer

```tsx
// Collected up front so one beacon covers the page: a flag used by two blocks is
// one exposure, not two, and one request rather than two against an endpoint that
// rate limits.
//
// Only precomputed flags qualify. A streamed flag is decided in a component that
// runs per request, so its exposure has somewhere honest to happen already and
// does not need the round trip.
const exposureKeys = [...new Set(
  data
    .map((block) => flagOf(block)?.key)
    .filter((key) => key && precomputed && key in precomputed)
    .filter((key) => catalog.some((e) => e.key === key && e.hasExperiment)),
)]
```
