# Integration guide: flags on the CTA module

Step-by-step, GrowthBook configured alongside the code. Scope is deliberately **one
module** — everything here generalises later via `withFlags.all(...)`, but nothing
below touches a second block.

Read `growthbook-flags-design.md` first for *why*. This is the *how*.

---

## Why CTA is the module to start with

Checked against the repo rather than picked by feel:

| | |
| --- | --- |
| **Already on the home page — twice** | `home` has two `cta` blocks (`Explore all articles`, `Watch all videos`). The demo is visible immediately, and flagging one while leaving the other proves flags are **per block instance**, not per block type. |
| **Rich enough to show variants** | `label`, `message` (both localized), `showTitle`, `link`, `backgroundType` + its conditional colour/image/video, two aspect ratios. Enough to override, not so much it drowns the demo. |
| **The thing people actually A/B test** | CTA copy is the canonical experiment. Nobody needs the business case explained. |
| **Already a client component** | `src/components/blocks/cta.tsx` is `'use client'`. Exposure events *must* fire client-side (see step 7), so there is already a boundary to fire from — no new one to invent. |
| **No relationships that recurse** | Unlike `articleCarousel`, it does not pull other collections, so variant overrides stay simple. |

The runner-up was `articleCarousel` — also on the home page, but its `articles`
relationship makes overrides awkward for a first pass.

---

## The attribute set

This is what you configure in GrowthBook, and it is the part to get right first —
every targeting rule keys on these names, and a typo produces a rule that silently
never matches.

Seven attributes. Enum options go in comma-separated, exactly as written.

| Attribute | Data type | Values | Identifier | Sent by the app? |
| --- | --- | --- | --- | --- |
| `id` | String | UUID from the `hgu_vid` cookie, or `anonymous` | **yes** | now |
| `deviceType` | Enum | `mobile, tablet, desktop` | no | now |
| `locale` | Enum | `en, es` | no | now |
| `audience` | Enum | `us, in, gb, row` | no | **not yet** — needs proxy derivation |
| `utmSource` | String | `google`, `newsletter`, … | no | **not yet** — needs proxy capture |
| `utmMedium` | String | `cpc`, `email`, … | no | **not yet** |
| `utmCampaign` | String | `summer-drop`, … | no | **not yet** |

**Tick Identifier on `id`, and only `id`.** Without it GrowthBook will not offer `id`
as an experiment split key, so step 6b cannot be created at all.

**The bottom four are dormant.** Declare them now so rules do not need rewriting
later, but until the proxy work lands they are never sent, and a rule targeting one
simply never matches. That silence is the single most likely thing to read as
"GrowthBook is broken".

### Do not add `country`

The app *sends* `country` (from `x-vercel-ip-country`) and should keep doing so —
`/api/flags/debug` is how you confirm geo resolution actually works on a deployment.
But do not declare it in GrowthBook.

Declaring it is an invitation to write a geo rule on the wrong attribute, which
silently forces that flag out of the prerender. Every geo rule here targets `audience`
instead; if Germany later needs its own treatment, adding `de` to the `audience` enum
costs one prerendered page and is the better move anyway. A constraint in the tooling
beats a warning in a document.

Undeclared attributes are simply ignored by rules, so sending one GrowthBook does not
know about breaks nothing.

### Delete GrowthBook's default `browser` attribute

It ships enabled and nothing in this app populates it, so any rule using it never
matches — the same silent failure as above, with no hint that the attribute is empty.

### `anonymous` and `unknown` are real values

`id` falls back to the literal string `anonymous` when the cookie is missing, and
`country` to `unknown` when the header is absent — which is **every local request**,
since Vercel sets that header at the edge. So a rule phrased "country is not US"
matches every dev request. Verified against the live endpoint:

```json
"attributes": {"id":"anonymous","country":"unknown","deviceType":"desktop","locale":"en"}
```

### `audience` is not "country"

It is **the bounded bucket the URL encodes**. Country is only its most common input:

```
audience = f(country, utm_campaign, …) → one of ~4–8 values
```

`country` has ~250 values and `utm_campaign` has infinity. Precompute builds one page
per distinct answer, so either one targeted directly makes the page set unbounded,
while `audience` keeps it at a handful.

Add `audience` now even though precompute comes last (step 8). This is also why
`country` is deliberately not a declared attribute — see above.

### Where UTMs fit

Campaign parameters have three properties that all bite, and none of them are obvious:

**They exist only on the landing request.** A visitor arrives at
`/?utm_campaign=summer`, clicks through to `/articles`, and the UTM is gone. Target it
directly and a visitor silently reclassifies mid-session — cohorts drift and the
experiment stops meaning anything, with nothing to indicate it happened. So proxy must
**persist them to a cookie on first sight**, exactly as it already does for `hgu_vid`.
Proxy is the only place that both sees the query string and can set a cookie.

**Reading `searchParams` in a page forces it dynamic.** Under `cacheComponents`, search
params are runtime data and the route stops prerendering entirely. Proxy reading
`request.nextUrl.searchParams` is fine, because proxy is not a render. That asymmetry
is what makes the cookie hop necessary rather than merely tidy.

**They are unbounded**, which decides where a UTM-targeted flag can live:

| Use | Tier | Cost |
| --- | --- | --- |
| Any campaign, targeted in a rule | streamed — read the cookie inside `<Suspense>` | 0 pages |
| A specific, allow-listed campaign needing above-the-fold treatment | mapped into `audience` in proxy | +1 code each |

```
utm_campaign in ALLOW_LIST  → 'campaign-summer'
country = IN                → 'in'
country = GB                → 'gb'
country = US                → 'us'
else                        → 'row'
```

Four countries plus two live campaigns is 6 codes × 2 locales = 12 pages. Still
nothing.

**The trap: never derive `audience` from the raw UTM value.** If
`?utm_campaign=<anything>` produces a new bucket, the page count is unbounded — and
because `dynamicParams` is on, anyone can spray random campaign values and force an
unbounded number of on-demand renders into the ISR cache. That is a storage and cost
problem with a hostile-input flavour. The allow-list is what makes it safe, and it
belongs in code, not in the CMS.

Keep the raw `utm*` values as their own attributes even where one also feeds
`audience` — you want them for streamed rules and for analytics, independent of
bucketing.

**Decide first-touch or last-touch explicitly.** Does a returning visitor keep their
original campaign, or does a new UTM overwrite it? First-touch (write the cookie only
if absent) is the safer default for experiments, because it stops mid-experiment
reclassification. Last-touch is what most analytics tools assume. The two produce
different numbers and the difference is invisible until someone reconciles dashboards.

**The rule that follows from this:** a flag meant to be prerendered may only target
attributes that proxy encodes into the URL — today that means `audience` and `locale`.
Targeting `deviceType`, any `utm*` or `id` forces that flag out of the prerender and
into a streamed or private region. That is not a bug, it is the cost, and step 8
explains how to tell which is which.

Until step 8 everything is streamed, so **any attribute works in steps 1–7.**

---

## Step 1 — GrowthBook: attributes and SDK connection

**In GrowthBook.** Settings → Attributes, add the seven above and delete `browser`. Then SDK Configuration →
SDK Connections → your existing connection; you already have the client key in `.env`.

**Verify.** `pnpm dev`, then:

```bash
curl -s localhost:3000/api/flags/debug | python3 -m json.tool
```

`ruleset.configured` and `ruleset.reachable` must both be `true`. `featureKeys` is `[]`
until step 2 — that is expected.

Attributes are declared in GrowthBook but *sent* by the app; a mismatch shows up as a
rule that never fires, never as an error.

---

## Step 2 — GrowthBook: the first flag

Create **one** feature, the kill switch, and nothing else yet.

| | |
| --- | --- |
| Key | `cta-visibility` |
| Type | `boolean` |
| Default value | `true` |
| Rules | none |

**Use case.** The campaign the CTA links to ends at midnight, or its landing page
breaks. Marketing pulls the CTA in seconds without a deploy, and without editing the
page — which would otherwise mean re-publishing and re-running revalidation.

**Default is `true` on purpose.** The default is the safe state: if GrowthBook is
unreachable, the site looks exactly as it does today. A default of `false` would mean
an outage at your flag provider blanks a module.

**Verify.** `curl .../api/flags/debug` — `featureKeys` now contains `cta-visibility`.

---

## Step 3 — Code: the catalog endpoint

`GET /api/flags/catalog` → the list Payload's flag picker reads.

Derive everything from the cached ruleset — no second source of truth:

- `key` — `Object.keys(payload.features)`
- `type` — from `defaultValue`
- `values` — `defaultValue` + every `rules[].force` + every `rules[].variations[]`

**Verify.** The endpoint lists `cta-visibility` as `boolean` with values
`[true, false]`, with no code change after step 2. That "no deploy needed" property is
the one worth demoing.

Gate it the way `/api/flags/debug` is gated, or restrict it to authenticated admin
users — it exposes your flag names.

---

## Step 4 — Code: the field on the CTA block

`withFlags(CTA)` in `src/collections/Pages.ts` only. Not `withFlags.all(...)` yet.

Per the design, the wrapper adds:

```
flag.key            the picker, fed by /api/flags/catalog
rows[].whenValue    derived from the flag, read-only
rows[].render       checkbox, default on
rows[].overrides    CTA's own fields, all optional
```

Attaching a boolean auto-creates two rows, with `false` → `render` off. So a kill
switch is zero extra clicks, and "change the content instead" is ticking that row and
filling fields.

### Rows are derived twice, on purpose

The picker writes the rows **in the browser**, the moment a flag is chosen. Nothing
to save first, no empty box to stare at.

`syncRows` (a field `beforeValidate` on the `flag` group) derives exactly the same
rows on the server, and it is the authority. It has to be: the Local API, a seed
script and the MCP plugin all write documents the picker never sees, and GrowthBook
gains and loses values while a page sits untouched. Both ends read `catalog`, so they
cannot disagree.

`beforeValidate` rather than `beforeChange` because rows must be settled *before*
anything judges them. Otherwise a stray row fails the required check on `whenValue` —
a field the editor is not allowed to type into.

Two behaviours are worth naming, because both are the difference between this being
safe and being a way to lose work:

- **A value GrowthBook stopped serving keeps its row**, marked `orphaned`. Dropping
  it would silently discard copy someone wrote.
- **An unreachable GrowthBook changes nothing and blocks nothing.** A provider
  outage must not rewrite documents, and must never stop an editor saving. The same
  guard covers being called with no Next runtime at all — `getRuleset` is a
  `use cache` function, and `cacheTag` throws outside a request.

A key that is not in the ruleset is rejected on save by a `validate` on `flag.key`,
so a typo fails in the admin instead of silently hiding a module in production. Note
this only fires on **publish** — Payload skips validation for drafts.

### Postgres identifier limits force one naming decision

Payload names an enum after the full path to it, and Postgres caps identifiers at 63
characters. `enum__pages_v_blocks_cta_flag_rows_overrides_desktop_aspect_ratio` is 65
and fails outright — the migration cannot even be generated.

The path is not information an enum needs: an override enum is identified by its
block and its field. `toOverridable` names them `enum_flag_<block>_<field>` instead,
which fits for every block, reads better, and has the main and versions tables share
one enum type rather than defining the same one twice under two names.

Worth knowing before `withFlags.all(...)`: without this, the rollout stops at the
first block with a longish slug and a longish select field.

**This needs a migration.** Push is disabled, so:

```bash
pnpm migrate:create add_cta_flag_rows
pnpm migrate
pnpm generate:types
```

Review the SQL before applying. For CTA it is **four tables** — rows and its locales,
each mirrored for versions — plus four enum types and a nullable `flag_key` column on
`pages_blocks_cta` and `_pages_v_blocks_cta`. Additive throughout; nothing existing is
altered, and `down` reverses all of it.

**Verify.** Open a page in Payload, expand a CTA block, pick `cta-visibility` from the
dropdown. Two rows appear immediately — `true → shown` and `false → hidden`. Leave the
second CTA unflagged; that contrast is the demo.

---

## Step 5 — Code: resolution in RenderBlocks

`src/components/blocks/index.tsx` becomes the only place a flag is read:

```
for each block:
  if no flag.key            → render as today
  value = resolve(key)      → cached ruleset + attributes
  row   = rows[value] ?? { render: true }    # unknown value → base module
  if !row.render            → skip entirely
  merge row.overrides over base props, unset = inherit
  render
```

Two things that are not stylistic:

- **Unknown value renders the base module.** Add a variation in GrowthBook that has no
  row yet and the site keeps working. Never blank.
- **Unset means inherit, not empty.** An empty override must not wipe a field.

The CTA component itself changes **not at all**. It receives resolved props and never
learns a flag exists — that is requirement 8 holding structurally.

**Verify.** Flip `cta-visibility` off in GrowthBook. Within five minutes (or instantly
if you POST the SDK webhook) the first CTA disappears and the second stays. Confirm
with view-source that no markup ships for it — it is skipped, not CSS-hidden.

---

## Step 6 — GrowthBook: targeting, experiment, campaign

The three interesting rule kinds. All are string flags with rows.

### 6a. `cta-regional-offer` — a targeting rule

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule | Force: `IF audience is any of (in, gb) SERVE "regional"` |

**Use case.** India and the UK get different CTA wording — local pricing, a local
campaign, or the phrasing legal signs off on for that market — while everyone else
keeps the default. This is the "country specific content" requirement, and it is the
one that survives prerendering intact, because `audience` is in the URL.

Create the row for `regional` and override `label` and `message`.

### 6b. `cta-copy-test` — a real experiment

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule 1 | Force: `IF audience = corporate SERVE "control"` *(optional — keeps a segment out of the test)* |
| Rule 2 | Experiment: SPLIT by `id`, 100% of units, variations `control` / `urgency` / `reassurance`, tracking key `cta-copy` |

**Use case.** Which CTA converts: neutral ("Explore all articles"), urgency ("Last
week for the full set"), or reassurance ("Free, no account needed")? Three rows, three
sets of copy, one tracking key.

**Rule order matters.** GrowthBook evaluates top-down and stops at the first match, so
a force rule above the experiment excludes that segment. Put it above deliberately or
not at all.

**This flag cannot be prerendered per-audience** — it splits on `id`, so the answer is
per visitor. It streams. Step 8 covers the alternative.

### 6c. `cta-campaign-offer` — a campaign rule

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule | Force: `IF utmCampaign = "summer-drop" SERVE "campaign"` |

**Use case.** Traffic from a paid campaign lands on the home page and sees a CTA that
matches the ad they clicked — same offer, same wording — while organic traffic keeps
the default. This is the single most common commercial ask for flags, and it is the
one people assume works like country targeting. It does not.

**What makes it different.** This one needs proxy work before the rule can fire at
all: capture `utm_source` / `utm_medium` / `utm_campaign` from the landing query,
persist them to a cookie, and send them as attributes. Until that lands the rule is
configured and silently never matches — which looks exactly like a broken flag.

Do the proxy capture as part of this step, and verify with two requests rather than
one: hit `/?utm_campaign=summer-drop`, then navigate to another page **without** the
query string and confirm the CTA still shows the campaign variant. One request only
proves the query was read; two prove it persisted.

**Where it renders.** Streamed, because `utmCampaign` is not in the URL code. If this
campaign later needs to be in the first HTML response — a paid landing page where
above-the-fold matters — add `summer-drop` to the proxy allow-list so it becomes its
own `audience` bucket, and the flag targets `audience` instead. That is a one-line
change on the proxy side and a rule edit in GrowthBook; the rows and copy do not move.

---

## Step 7 — Code: exposure tracking

**The step that is easy to skip and ruins the data.**

An A/B test is not the variant rendering — it is an exposure event paired with a later
conversion. Put the exposure call inside a cached scope and it fires on the cache miss
and is skipped on every hit. Fifty thousand visitors, three variants, **three
exposures** — while conversions still attach to all fifty thousand. Every dashboard
looks healthy and the measured lift is meaningless.

Nothing catches this: not the build, not TypeScript, not a test, not a latency graph.

So: **fire exposure from the client.** `cta.tsx` is already `'use client'`, so the
variant it received can be reported on mount. Server-side would be wrong here even
before precompute, because the render is cached.

**Verify by counting, not by looking.** Drive N synthetic visitors with distinct
`hgu_vid` cookies and assert the event count equals N. A ratio like 3/50 is
unmistakable; nothing else surfaces it.

---

## Step 8 — GrowthBook: identity, and the precompute decision

### 8a. `cta-beta-preview` — identity

| | |
| --- | --- |
| Type | `boolean`, default `false` |
| Rule | Force: `IF id is any of (<your uuid>, <teammate uuid>) SERVE TRUE` |

**Use case.** Show an unreleased CTA to the internal team on the live site before
anyone else sees it — stakeholder review without a staging environment.

**This one is a correctness hazard, not just a cost.** A per-account answer baked into
a shared prerendered page is served to whoever lands on that URL next. It must render
in a private scope or stream. Never share it.

Get your own `hgu_vid` from browser devtools → Application → Cookies.

### 8b. Deciding what to precompute

By now five flags exist, and they sort cleanly by the attribute they target:

| Flag | Targets | Where it can live | Extra pages |
| --- | --- | --- | --- |
| `cta-visibility` | nothing | static shell | 0 |
| `cta-regional-offer` | `audience` | audience code | 0 |
| `cta-campaign-offer` | `utmCampaign` | streamed — or its own bucket if allow-listed | 0, or +1 per campaign |
| `cta-copy-test` | `id` | streamed, or ×3 in the code | 0 or ×3 |
| `cta-beta-preview` | `id` | private / streamed | never |

**The attribute a flag targets decides where it can render.** That is the whole
sorting rule, and it is worth internalising before writing rules rather than after:
target only what the URL encodes and the flag prerenders; target anything else and it
streams or goes private.

Only rows three and four are decisions. Everything up to here works streamed, so
precompute is a separate piece of work with its own risk — mainly composing the
`[code]` rewrite with next-intl's existing one. Do it when the demo needs
above-the-fold variants in the first HTML response, not before.

Before it, raise `getPagesSlugs`' `limit: 10` (`src/data/page.ts:35`) — precompute
multiplies whatever that returns.

---

## The five flags, together

| Flag | Kind | Use case | Rule |
| --- | --- | --- | --- |
| `cta-visibility` | fixed | Kill the CTA when a campaign ends or its target breaks | none |
| `cta-regional-offer` | targeting | IN/UK see local wording; everyone else the default | force on `audience` |
| `cta-campaign-offer` | campaign | Paid traffic sees the CTA that matches the ad it clicked | force on `utmCampaign` |
| `cta-copy-test` | experiment | Which of three CTA headlines converts best | split by `id` |
| `cta-beta-preview` | identity | Internal team previews an unreleased CTA on the live site | force on `id` list |

All on one module, each with a reason a stakeholder recognises, and between them they
cover every attribute class: none, bounded, unbounded, and per-visitor.

---

## Order of work

Steps 1–5 give a working, demoable feature: an editor attaches a flag in Payload and a
module appears or disappears on the live site with no deploy. That alone is the thing
people care about.

6–7 add real experimentation. 8 is the performance tier and can wait.

Two ordering constraints inside that, both of which cost real time if ignored:

**6c needs proxy work before its rule can fire.** UTM capture and cookie persistence
have to exist first, or the rule is configured and silently never matches. If the demo
is short on time, 6c is the step to drop — it is the only one with a code prerequisite
outside the flag system itself.

**Do not start 6b before 7.** An experiment running without correct exposure tracking
produces confident, wrong numbers, and the damage is to data you cannot reconstruct.
