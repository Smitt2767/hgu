---
name: track
description: >
  Wire experiment measurement for a Payload + Next.js app — exposure events that
  say a visitor was shown a variant, and conversion events that say they did the
  thing it was meant to cause — so the numbers survive caching, prerendering and
  precompute. Use when starting an A/B test, when an experiment is serving
  variants but no data appears, when exposure counts look far too low, when
  deciding where an exposure call may live, or when sending events to a
  warehouse. Do this before starting any experiment.
---

# Track exposure and conversion

**An A/B test is an exposure event paired with a later conversion. The variant
rendering is not the experiment.** Everything here follows from that.

Assumes the core from `payload-growthbook:setup` and a provisioned warehouse or
other ingest endpoint.

## The failure this exists to prevent

Put the exposure call inside a cached scope and it fires on the miss and is
skipped on every hit. Fifty thousand visitors, three variants, **three
exposures** — while conversions keep attaching to all fifty thousand. Every
dashboard looks populated and the measured lift is meaningless.

Nothing catches it: not the build, not TypeScript, not a test, not any timing
measurement. The damage is to data you cannot reconstruct.

```tsx
// The line between "runs every request" and "runs once per key" is exactly the
// line between what must be tracked and what may be cached.
export async function Panel({ attributes }) {
  const variant = decide(attributes)   // per request, ~free
  track('exposure', variant)           // outside the cache
  return <PanelBody variant={variant} />
}

async function PanelBody({ variant }) {
  'use cache: remote'                  // per variant, expensive
  cacheTag(`panel-${variant}`)
  return <div>{/* … */}</div>
}
```

## Where the exposure call goes, by tier

| The page it renders on | Fire exposure from | Why |
| --- | --- | --- |
| Renders per request | the uncached wrapper, in `after()` | deferred until the response is sent |
| A Route Handler | `after()` | a handler always runs per request |
| Cached, prerendered, or **precomputed** | **a client component** | see below |

**`after()` is not a request-time API.** On a static page the callback runs *at
build time, or whenever the page is revalidated*. Every precomputed page is a
static page, so a server-side exposure fires once per prebuilt file and never
again — twenty-four prebuilt pages record twenty-four exposures while conversions
keep arriving from real people.

A prerendered response involves no server work at all — it is a file on disk — so
there is no server moment to hook. **The browser has to start it.**

## The client round trip, for prerendered pages

Full code: `reference/client-exposure.md`. Three properties make it sound:

**The page hands the browser a signed code.** Proxy rewrites without touching the
address bar, so `window.location` never carries the decision. The page knows it,
passes it to the beacon, and the beacon hands it back — and because the code is
HMAC-signed the route can trust it. A browser asserting "I was shown variant B" is
forgeable; a signed code is not.

**The route re-evaluates rather than decoding the value.** The code carries the
flag's *value*, and a value does not say whether an experiment happened.
`"control"` arises two ways — assigned to variation 0, or never entered the
experiment and fell through to the default — and no amount of decoding separates
them. Re-evaluating does, for free: the SDK invokes its tracking callback only on
**genuine assignment**, so the library that owns the question answers it.

**The beacon reports flags whose module was *present*, not visible.** A variant
that hides the module still exposed the visitor — for them the absence is the
treatment — and dropping that arm biases the result far worse than including it.
Collect the keys once per page so a flag used by two blocks is one exposure.

Use `navigator.sendBeacon` (with a `keepalive` fetch fallback), not a plain
`fetch`: the visitor may leave immediately, and an ordinary request dies with the
document.

Client-side tracking loses ad-blocked and JS-disabled visitors. That costs
statistical **power, not accuracy** — which arm someone landed in has no bearing
on whether their browser blocks beacons, so the sample shrinks without tilting.
Counting at build time is not a smaller sample, it is a wrong one.

## Conversion

The other half. `reference/ingest.md` for the shape.

- **It carries no variant, and must not accept one.** The exposure already
  established the arm from a signed code; a browser asserting "I converted on
  variant B" would be forgeable in a way that quietly rewrites results. The
  warehouse joins the two itself on the identifier attribute.
- **Resolve attributes server-side from the request**, never from the body. The
  visitor id lives in an `httpOnly` cookie the page cannot read, which is exactly
  what makes the join key trustworthy.
- **Fire it for every instance of the module, flagged or not.** Which of them is
  under test is decided in the dashboard, and a metric that only counted clicks on
  modules already known to be experimental could never be used to *start* a test.
- **Beacon, not fetch** — the next thing a click does is navigate away.

## The endpoints are public, so bound them

They have to be public: the caller is a beacon from an anonymous browser.

- **Allow-list event names.** An open `event_name` lets anyone write arbitrary
  rows into the warehouse and quietly poison a metric.
- **Bound the property schema** — a few short keys and values, enough to slice
  results by, not a channel for writing whatever someone likes.
- **Answer 204 to everything**, malformed input included. A beacon reads no
  response, and a probe learns nothing.
- **Never throw.** Analytics failing is not a reason for a visitor's request to
  fail.

## Verify by counting, never by looking

Drive **N** synthetic visitors with distinct visitor cookies and assert the event
count equals N. A ratio of 3/50 is unmistakable; a latency graph shows nothing and
a populated dashboard proves nothing.

`payload-growthbook:verify` has the checklist. Two traps it covers: on Vercel,
environment variables are baked in at deploy, so an ingest host added after the
running deployment was built is invisible and reads exactly like broken ingest —
and an experiment that falls out of the precompute set keeps serving variants
while silently no longer being measured.
