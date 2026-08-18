---
name: setup
description: >
  Wire GrowthBook into a Payload CMS + Next.js App Router app that has no flag
  system yet — declared attributes, the cached ruleset, request-time evaluation,
  the anonymous visitor cookie in proxy, the catalog and debug endpoints, and
  webhook invalidation. Use when adding feature flags or A/B testing to a Payload
  project for the first time, when `payload-growthbook:scan` reports core parts
  missing, when flag evaluation is costing a network round trip per request, or
  when setting up ruleset invalidation. Assumes Next 16.3+ with
  `cacheComponents: true` and Payload 3.
---

# Wire the core

Seven files and one dashboard pass. Do them in this order — each step is
verifiable on its own, and the later ones read the earlier ones.

**The premise everything rests on:** a flag decision is a pure function of the
**ruleset** (identical for every visitor on Earth — ordinary cacheable content)
and the **attributes** (ordinary request data). Joining them is a hash and a walk
over rules already in memory. So: cache the ruleset, never cache the evaluation,
never cache the visitor.

Nothing in this skill declares a flag. Flags are created in the dashboard and
attached in the CMS; code only ever reads the ruleset and evaluates against it.
That is what keeps adding a flag out of the deploy path.

## Step 1 — Dashboard: attributes and the SDK connection

Read `reference/dashboard.md`. Get this right first: every rule keys on these
names, and a typo produces a rule that silently never matches.

Non-negotiables from that file: tick **Identifier on the bucketing attribute
only**; delete the defaults nothing populates; declare a **bounded** geo bucket
rather than raw country.

## Step 2 — Environment

```
GROWTHBOOK_CLIENT_KEY     from the SDK Connection. Optional — absent means every
                          flag falls back to its default and the app still builds
GROWTHBOOK_API_HOST       https://cdn.growthbook.io
GROWTHBOOK_WEBHOOK_SECRET SDK Webhook secret (step 7)
FLAGS_SECRET              32 random bytes, base64url — signs precomputed segments
                          and gates the debug endpoint
GROWTHBOOK_INGEST_HOST    Managed Warehouse origin, region-specific (tracking)
```

**Every one of these is optional in the schema.** A missing variable must degrade
to "flags fall back to defaults", never to a failed boot. Validate them centrally
(`@t3-oss/env-nextjs` or equivalent) so a typo is a startup error rather than an
`undefined` that reads as a provider outage.

**On Vercel, variables are baked in at deploy.** One added after the running
deployment was built is invisible until a redeploy, which looks exactly like the
feature being broken.

## Step 3 — `src/flags/constants.ts`

The visitor cookie name and its max age. **Keep this file import-free.** Proxy
needs the cookie name, and reaching for it through a module that imports
`next/headers` or an SDK drags both into the proxy bundle.

## Step 4 — `src/flags/ruleset.ts`

Code in `reference/core-modules.md`. Two exports, and the second is not optional:

- `getRuleset()` — `use cache`, `cacheTag(RULESET_TAG)`, `cacheLife('hours')`.
  The only network read in the whole system.
- `readRulesetForProxy()` — the same fetch, memoised at module scope with a TTL.
  Proxy runs before any render exists and `use cache` is a render-time directive,
  so proxy cannot call `getRuleset` at all. This duplicate is forced.

Three properties that cost real time when missing:

1. **It never throws.** A throw inside `use cache` fails the *build*, and React
   surfaces it to the prerender before the caller's `catch` runs. Return `null`.
2. **The failure branch stays prerenderable.** Give the failed read a profile
   whose `revalidate` is not shorter than the prerender lifetime (300 across the
   board). A shorter one turns the scope into a dynamic hole, and if anything
   awaits it outside `<Suspense>` the whole route drops out of its prerender —
   reported as "uncached or runtime data during prerendering" against the render,
   not against the fetch. It only trips when the provider is down *and* the cache
   misses, so the build passes and production does not.
3. **Do not use `@flags-sdk/growthbook`.** It fetches the ruleset itself and
   memoises per request: one network read per request, and an uncached fetch that
   cannot prerender.

## Step 5 — `src/flags/attributes.ts`

One pure function `resolveAttributes({ headers, cookies, locale })`, plus a thin
`readAttributes()` wrapper over `next/headers` for Server Components.

Pure because three callers need it — proxy, the render, and route handlers — and
only one of them may touch `next/headers`. Type the readers structurally
(`{ get(name): ... }`) and all three stores satisfy it.

- **Fall back to a constant, never a random value.** A random id per request puts
  the same visitor in a different bucket on every page load, which reads as an
  experiment with no effect rather than as a missing cookie.
- **Take locale from the render, not a cookie.** An i18n locale cookie is written
  on the *response*, so it lags the request by one navigation and a visitor's
  first request to a non-default locale evaluates as the default.
- **Send the raw country, but declare a bounded bucket.** See
  `reference/dashboard.md`.

## Step 6 — `src/flags/evaluate.ts` and the visitor cookie

`evaluateValueWith(ruleset, key, attributes)`: construct a client around the
already-fetched payload, `evalFeature`, destroy it. No network, no cache. It is
untyped by design — the expected type lives in the CMS, and `undefined` means "no
answer", which the caller reads as "render the base content".

Then mint the visitor id **in proxy**, because it is the only place that can: a
Server Component may not set a cookie, so an id created during render never
reaches the browser. Set it `httpOnly` — an id JavaScript can rewrite is an id an
injected script can use to move someone between variants — and write it to
`request.cookies` as well as the response, or this same request buckets on the
fallback while rendering under the new id.

## Step 7 — Endpoints, then the webhook

- **`/api/flags/debug`** — the fastest way to tell apart a missing client key, an
  unreachable provider, and an empty ruleset, which are identical from a page.
  Report `configured`, `reachable`, `dateUpdated`, `featureKeys`, and the
  attributes this request resolved to. Gate it behind `FLAGS_SECRET` in
  production and answer **404**, not 401, so it does not advertise itself.
- **`/api/flags/catalog`** — the flag list the CMS picker reads, derived from the
  cached ruleset: keys, value domains, and the tier each flag belongs to. Code and
  the four derivations in `reference/catalog.md`; needed by
  `payload-growthbook:add-to-module`. Authenticate as a CMS user and **narrow to
  the intended auth collection** — an MCP or API-key collection must not read the
  flag list.
- **The webhook** — `reference/webhook.md`. GrowthBook has two webhook systems
  that sign differently; pointing the wrong one at your URL produces a 401 that
  looks like a bug in your code.

Know how little invalidation buys before building it: `cacheLife('hours')` is
`stale: 300`, so a change propagates within five minutes anyway. The webhook makes
it *immediate*; it is not what makes it happen.

## Verify before moving on

```bash
curl -s localhost:3000/api/flags/debug | python3 -m json.tool
```

`configured` and `reachable` both `true`; `featureKeys` empty until the first flag
exists. Then check the attributes block in that response against what you declared
in the dashboard — a name that differs by one character is a rule that never fires
and never errors.

Geo attributes resolve at the edge, so they are **absent on every local request**.
A rule phrased "country is not US" matches every dev request. That is not a bug to
chase.

## What you have now

An app that reads flags with one cached network call, buckets visitors stably, and
falls back to declared defaults when the provider is unreachable. What you do
*not* have: any flag attached to anything, and no experiment measurement.

Next: `payload-growthbook:new-flag`, then `payload-growthbook:add-to-module` or
`payload-growthbook:add-to-page`. Do not start an experiment before
`payload-growthbook:track`.
