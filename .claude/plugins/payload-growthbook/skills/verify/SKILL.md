---
name: verify
description: >
  Prove a GrowthBook + Payload flag integration actually works — the ruleset is
  reachable, rules match, variants differ per visitor, pages still prerender, and
  exposure counts equal page views — and read what each failure means. Use when a
  flag or experiment is not behaving, when a rule seems never to fire, when
  exposure numbers look wrong, when a page stopped prerendering, or before
  trusting an experiment's results. Produces a checklist to run; it does not
  write test content into the CMS.
---

# Prove it, then say where you proved it

Two rules for everything below.

**A local success is not evidence about serverless.** Plain `use cache` is
in-process memory: on a long-lived local server that is a real cache, and on
serverless the instance holding the entry may be gone by the next request, so the
same code is *no cache at all* and looks identical while testing. Geo attributes
resolve at the edge and are absent locally, so geo rules cannot be verified on a
dev machine at all. Record every finding as **local** or **deployed**.

**Do not write test documents into the CMS.** Flags are read from the dashboard
and attributes from cookies — everything here can be checked with curl and a
browser. Hand the checklist to whoever owns the environment rather than seeding
their database.

## 1. The ruleset arrives

```bash
curl -s "$HOST/api/flags/debug?secret=$FLAGS_SECRET" | python3 -m json.tool
```

| Symptom | Means |
| --- | --- |
| `configured: false` | client key unset — on Vercel, possibly set *after* the running deploy was built |
| `reachable: false` | key wrong, host wrong, or the provider is down. Every flag is on its default right now |
| `featureKeys: []` | reachable, but nothing is defined. Not the same as unreachable |
| `dateUpdated` stale after an edit | the cache has not expired and no webhook fired |

## 2. The attributes are what the rules target

Same response, `attributes` block. Compare **name by name** against what the
dashboard declares. A name differing by one character is a rule that never fires
and never errors — the single most likely thing to read as "GrowthBook is broken".

- Is the visitor id a UUID, or the `anonymous` fallback? The fallback means the
  cookie is missing, so everyone buckets on one constant and no experiment can
  separate its arms.
- Is the geo attribute `unknown`? Expected locally. A rule phrased "country is not
  X" matches every dev request.
- Does the locale match the page you requested, or the previous one? A locale read
  from a cookie lags by one navigation.

## 3. The rule actually matches

Request twice with attributes that should differ, and compare the **HTML**, not
the dashboard:

```bash
curl -s -H 'cookie: app_vid=<uuid-a>' "$HOST/page" | grep -o 'variant-marker[^"]*'
curl -s -H 'cookie: app_vid=<uuid-b>' "$HOST/page" | grep -o 'variant-marker[^"]*'
```

For a campaign rule, **two requests, not one**: hit the landing URL with the
parameter, then a second page *without* it. One request proves the query was read;
two prove it persisted.

## 4. The page still prerenders

`next build` should list the route as static. If it fails with *"encountered
uncached or runtime data during prerendering"*, run `next build
--debug-prerender` — the message names the symptom, not the cause.

To assert what shipped in the shell, use **byte position**, not presence: a
response body contains everything eventually.

```ts
const html = await (await page.request.get('/route')).text()
expect(html.indexOf('data-testid="thing"')).toBeLessThan(html.indexOf('</main>'))
```

Its limit, which is easy to miss: a Suspense child that resolves fast enough is
inlined before the shell flushes, so a *streamed* thing can legitimately land
before `</main>`. Byte position proves "this was prerendered"; it does not prove
"this was not". For the negative claim, assert the behaviour you care about — two
visitors getting different answers, or a skeleton being present.

## 5. Exposure count equals page view count

**The check that matters most, and the only one that catches the expensive
failure.** Drive **N** synthetic visitors with distinct visitor cookies through a
page carrying the experiment, then compare the event count in the warehouse to N.

```bash
for i in $(seq 1 50); do
  curl -s -o /dev/null -H "cookie: app_vid=test-$i" "$HOST/page"
done
```

A ratio like 3/50 is unmistakable. Nothing else surfaces it: not the build, not a
type check, not a latency graph, and not a dashboard, which looks healthy at any
ratio.

If you run it against a prerendered page, remember the beacon fires from the
browser — curl will not send it. Either drive real page views (Playwright), or
post the beacon payload yourself with the code the page embedded.

| Symptom | Means |
| --- | --- |
| Far too few events, roughly the number of variants | exposure is inside a cached scope |
| Exactly the number of prebuilt pages | `after()` fired at build time |
| Zero events, no errors | ingest host unset — check the logs for the "not sent" warning |
| Events with no variant id | the tracking callback is not being reached; the flag may not be an experiment |
| `mismatch … dropped` in the logs | the ruleset changed between the rewrite and the re-evaluation. Rare and self-correcting; frequent means proxy and the render disagree |

## 6. Nothing personal is in a shared cache

Load a page as an entitled visitor, then request the same URL with **no cookies**
and confirm the entitled content is gone. This is the check that catches a
personal answer sitting in a shared entry, and nothing else catches it — hit rates
stay plausible, the page still looks right.

Then: does any cached component take a user id as a **prop**? `cookies()` is
rejected inside a shared cached scope; a prop is not.

## 7. Invalidation

Change a flag in the dashboard, then watch `dateUpdated` in the debug endpoint.

- Immediate → the webhook fired.
- Within five minutes → the webhook is not firing; the cache expired on its own.
  Check the webhook system in use, since the two sign differently.
- 401 in the logs → the wrong webhook type, or a signature list read only at its
  first entry.
- 500 in the logs → a length-mismatched comparison throwing before it can reject.

## Before recording any finding

- Was it measured locally or deployed? Say which.
- Is the server you measured running the code you just built? A failed restart
  and a stale server answer confidently and wrongly.
- Did the entry exist, or was the work simply fast? A timing measurement cannot
  tell a cache hit from cheap work.
- Could the value have refreshed on its own? `cacheLife('hours')` is `stale: 300`,
  so content refreshes on next touch after five minutes regardless of any
  invalidation.
