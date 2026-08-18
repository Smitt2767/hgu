---
name: scan
description: >
  Survey a Payload CMS + Next.js repo for its GrowthBook flag integration and
  report what exists, which tier every flag renders in, and which hazards are
  live. Use when asked to audit, review or explain a flag setup; when inheriting
  a repo that already has flags; before adding an experiment to code you did not
  write; when flagged pages stopped prerendering or a variant is not appearing;
  or to find out whether the core wiring exists before running any other
  payload-growthbook skill. Read-only — it changes nothing.
---

# Scan a flag integration

Answers three questions, in this order, and nothing else:

1. **What is wired?** Which of the seven parts exist, and which are stubs.
2. **Where does each flag render?** Shell, streamed, precomputed, or private.
3. **What is broken and how badly?** Ranked by damage, not by tidiness.

Change nothing while scanning. Report, then let the human pick what to fix.

## The seven parts

Grep for each. Absent is a finding; present-but-wrong is a worse one.

| Part | Look for | Absent means |
| --- | --- | --- |
| Ruleset cache | `use cache` + a `fetch` of `/api/features/` | every request pays a network read, or the SDK adapter is doing it |
| Attributes | one function over `(headers, cookies)` | proxy and render disagree about who the visitor is |
| Evaluation | `initSync` / `evalFeature` on an already-fetched payload | probably the stock adapter — see below |
| Visitor cookie | a `cookies.set` in proxy/middleware | experiments re-bucket on every page view |
| CMS field | a `flag` group on a block or collection | flags are declared in code, so every flag change is a deploy |
| Exposure | a call to an ingest/track endpoint | experiments serve variants and measure nothing |
| Invalidation | a webhook route calling `revalidateTag` | flag changes land whenever the cache expires |

**`@flags-sdk/growthbook` in `package.json` is itself a finding.** The stock
adapter fetches the ruleset per request and memoises it per *request*, so it
caches nothing between them, and its fetch is uncached — a page reading a flag
through it cannot prerender at all.

## Tier every flag

Read the ruleset (`/api/flags/debug` or the catalog endpoint if either exists,
otherwise the GrowthBook dashboard) and sort each flag by **what its rules
target**, because that alone decides where its answer may be rendered.

| Rules target | Tier | May render in |
| --- | --- | --- |
| nothing | `static` | the static shell |
| only attributes the URL encodes | `prerender` | a shared prerendered page |
| an experiment split, or request data | `streamed` | inside `<Suspense>` |
| a force rule on individual `id`s | `private` | `use cache: private`, or nowhere |

Two distinctions people collapse, and both cost real money:

- **Classified prerenderable is not the same as answerable here.** A flag
  targeting `audience` is `prerender` by its rules, but nothing answers it until
  proxy encodes `audience` into the path. Until then it streams. Keep the two
  ideas apart in the report.
- **An identity *force* rule is private; an experiment hashing `id` is not.** The
  first belongs to one account; the second is shared by a third of visitors, and
  a shared answer may live in a shared page.

## Hazards, worst first

The top three are silent. Nothing in a build, a type check, a test or a latency
graph reports them, which is why they lead.

**1 — A per-person answer in a shared cache.** An identity-targeted flag reaching
a prerendered page, or a user id passed as a *prop* into a `use cache` scope.
`cookies()` is rejected in a shared scope; a prop is not, so one entry per
variant quietly becomes one per visitor and the page still looks right.
Grep every cached component's props for identity.

**2 — An exposure call inside a cached scope.** It fires on the miss and is
skipped on every hit: fifty thousand visitors, three variants, three exposures,
while conversions attach to all fifty thousand. Every dashboard looks healthy and
the measured lift is meaningless. Grep for the track/beacon call and walk *up* the
tree — the nearest enclosing `use cache`, or a page that is prerendered at all.

**3 — `after()` used for exposure on a prerendered page.** `after` runs at build
time on a static page, so the callback fires once per prebuilt file, forever.
Correct on a per-request route, wrong everywhere precompute reaches.

**4 — A ruleset read that can throw or go dynamic.** A throw inside `use cache`
fails the *build* even when the caller catches it. And a `cacheLife` whose
`revalidate` is shorter than the prerender's lifetime turns the scope into a
dynamic hole — if the read is awaited outside `<Suspense>`, that takes the whole
route out of its prerender. Check the failure branch, not the happy path: it only
trips when the provider is unreachable *and* the cache misses.

**5 — No default, or an unsafe one.** The default is the state during an outage.
A kill switch defaulting to `false` means a provider blip blanks the module.

**6 — Flag reads scattered through components.** Every component that knows a flag
exists is a component that has to be edited to remove it. One resolution point,
components stay flag-unaware.

**7 — An unauthenticated catalog/debug endpoint.** Flag keys describe unreleased
work. Check the auth narrows to the intended collection — a second auth
collection (an MCP plugin, an API-key collection) will otherwise pass.

## Report like this

```
Wired:      ruleset cache, attributes, evaluation, visitor cookie
Missing:    exposure tracking, webhook invalidation
Flags:      4 — 1 static, 2 streamed, 1 private
Hazards:    [1] beta-access is precomputed — identity in a shared page
            [2] no exposure events; copy-test has run 6 days measuring nothing
            [4] ruleset failure profile revalidates at 30s — dynamic hole
Verified:   locally only
```

Say **locally or deployed** for anything you measured. A local `next start` is a
long-lived process where plain `use cache` is a real cache; on serverless the same
code may be no cache at all, and the two look identical while testing.

## Where to go next

| Finding | Skill |
| --- | --- |
| Core parts missing | `payload-growthbook:setup` |
| No flag on the module an editor wants to control | `payload-growthbook:add-to-module` |
| Route- or component-level flag needed | `payload-growthbook:add-to-page` |
| Experiments serving but not measured | `payload-growthbook:track` |
| Above-the-fold variants streaming | `payload-growthbook:precompute` |
| Findings need proving before acting | `payload-growthbook:verify` |
| A flag has graduated and should go | `payload-growthbook:retire` |
