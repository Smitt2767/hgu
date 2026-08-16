# Flag-driven modules: design

How GrowthBook flags attach to CMS modules in this project, why the routing is
shaped the way it is, and what it costs. Written against the code as it stands on
`feat/growthbook-flags` (commit `041745f`).

Nothing here is implemented yet. The flag *plumbing* is (`src/flags/`), but no flag
is declared and no product code reads one.

`demo/flag-modules-demo.html` is a static, clickable prototype of the editor
experience described in §4 and §5 — open it in a browser, no server needed. It covers
all four rule kinds against the real GrowthBook features.

---

## 1. What is actually in the repo

Facts the design has to fit, all verified rather than assumed.

| Thing | Where | Detail |
| --- | --- | --- |
| Collections | `src/collections/` | Media, Links, Articles, Videos, Templates, Pages, Users |
| Globals | `src/globals/` | Site, Header, Footer, Socials |
| Modules ("blocks") | `src/collections/blocks/` | **17 defined, all 17 wired** |
| Page layout field | `src/collections/Pages.ts` | `layout`, `type: 'blocks'`, all 17 |
| Template layout | `src/collections/shared/template-blocks.ts` | 13 of them, minus the 4 that would recurse |
| Locales | `src/i18n/routing.ts` | `en`, `es`, `localePrefix: 'as-needed'` |
| Rendering | `next.config.mjs` | `cacheComponents: true`, `partialPrefetching: true` |
| Proxy | `src/proxy.ts` | next-intl middleware + visitor-id minting |

Definitions and renderers now match one-for-one. They did not when this was first
written: `feedback` and `pauseExperience` were authorable with no entry in
`blockComponents`, so `RenderBlocks` returned `null` and an editor could add either
to a page and see nothing, with no error anywhere. Both have since been removed
(migration `20260816_080248`).

**That failure mode is still open for the next block.** `blockComponents` is typed
`Partial<{ [K in BlockType]: … }>`, so an unrendered block type-checks, saves and
renders nothing. Flagging a module that never renders would be invisible twice over,
which is worth a guard before `withFlags.all(...)` goes across the whole list.

One other fact the design depends on: **`getPagesSlugs` has `limit: 10`**
(`src/data/page.ts:35`). Only the first ten published pages prerender today, and
precompute multiplies whatever that returns, so it needs raising before any of this
matters.

The codebase already has the exact pattern this design extends: `stageField()` in
`src/collections/shared/stage.ts` is a shared field factory dropped into several
collections. Flags should arrive the same way.

---

## 2. The one constraint that decides the whole design

Precompute prerenders **one page per flag combination**. That is a product, not a
sum.

Take the naive reading of the brief — "attach a flag to all modules, boolean
show/hide" — on a page with ten flagged modules:

```
2^10 combinations × 2 locales                     = 2,048 prerenders for ONE page
```

Fifty pages: over a hundred thousand. Every added module doubles it. Build time and
cache hit rate both collapse, and they collapse *silently* — the site still works,
it is just never warm.

So the design question is not "how do we attach flags to modules". That part is
easy. The question is **how to attach a flag to every module without any of them
entering the permutation count.**

Everything below follows from answering that.

---

## 3. The core idea: precompute the audience, not the flags

Read the brief's second requirement closely — it contains two different things:

> experimentation / forced value **same for all users** / **country specific** content

**"Same for all users"** means the answer does not depend on who is asking. It needs
**zero** prerenders. It belongs in the static shell and changes by cache
invalidation — which is exactly what the SDK webhook we already built does. A kill
switch on a module is this. So is a rollout toggle.

**"Country specific"** means the answer depends on a *bounded* visitor attribute.
This is what precompute exists for, and country has maybe four useful buckets, not
two hundred.

That gives the rule:

> **The URL code encodes the visitor's audience, not each flag's value.**

Proxy resolves the visitor to exactly one audience bucket and rewrites to a page
prebuilt for that bucket. Inside that prerender, *every* flag is evaluated against
that audience's attributes — no request data, so it prerenders fine.

```
audiences: us · eu · in · row                     = 4 codes
× 2 locales                                       = 8 prerenders per page
```

Adding a flag: **+0 pages.** Adding a flagged module: **+0 pages.** Flagging all 17
modules: **+0 pages.** Adding a fifth country: +1 code.

That is the property that makes requirement 7 — "attach a flag to all modules" —
survivable. It is the difference between 8 prerenders per page and 2,048.

### Why this is legitimate, not a trick

A flag decision is a pure function of `(ruleset, attributes)`. `getRuleset()` is
already cached with `use cache` and prerenders. If the only attribute a flag targets
on is `audience`, and the audience is fixed by the URL segment, then the decision is
fully determined at build time. It is genuinely static — not "static-ish".

**The contract this creates:** GrowthBook targeting rules for module flags must key
on the `audience` attribute (and other build-known attributes like `locale`), not on
raw `country` or per-visitor `id`. `audience` becomes a first-class GrowthBook
attribute that proxy computes and the prerender replays. If a rule targets something
proxy did not encode, proxy and the render disagree, and a visitor gets routed to one
variant and rendered another — which looks exactly like a caching bug and is not one.
Worth a test, per the skill's guidance.

### Where real experiments go

A/B experiments that hash on visitor `id` genuinely cannot be prerendered — every
visitor gets a different bucket. Three honest options:

1. **Put the experiment in the code.** A small, explicitly curated list. Four
   audiences × one three-arm experiment = 12 prerenders. Fine. This list is
   developer-maintained and short *on purpose* — it is the only thing that
   multiplies, so it is the only thing that needs discipline.
2. **Stream it** (Tier 1 — a `<Suspense>` boundary). Correct for almost everything,
   costs one streamed region, no prerender cost.
3. **Fold the arm into the audience.** Works when the experiment is really a
   segment.

So the code segment carries: **the audience bucket + a curated handful of experiment
flags.** Everything else — all CMS-attached module flags — resolves *from* the code
and adds nothing.

---

## 4. The CMS model

### What industry converged on

The dominant pattern across Contentful/Ninetailed, Optimizely CMS and Uniform is the
same shape, and it is worth copying because it is well-tested:

> A **baseline** entry carries a reference to one or more **experiences**. Each
> experience names an **audience** and supplies **variants**. A variant is the *same
> content type* as the baseline — a same-shaped replacement, not a free-form blob.

Contentful's field is literally `nt_experiences`, holding entries with `nt_config`
and `nt_variants`, and their docs are explicit that "selected variant entries must
use the same content type as the baseline entry."

That last constraint is the important one. It is what keeps the renderer simple: a
variant is never a different thing, only different values for the same fields.

### Applied to Payload blocks

One wrapper, applied to every block. Same ergonomics as `stageField()`:

```
withFlags(Accordion)   →   Accordion + a flag key + one row per flag value
```

and in `Pages.ts`, the whole list at once:

```
blocks: withFlags.all([ Accordion, Alpha, ... ])
```

That single line is requirement 7 — "attach to all modules, not just 1/2" — and
requirement 3's "automatic". No per-block work, no per-block maintenance.

The wrapper adds a flag key and **one row per value that flag can serve**:

| Field | Type | Purpose |
| --- | --- | --- |
| `flag.key` | flag picker | which GrowthBook feature, chosen from a live list |
| `rows[].whenValue` | derived, read-only | one row per value; never typed by hand |
| `rows[].render` | checkbox, default on | off means this value renders nothing |
| `rows[].overrides` | the block's own fields, optional | only what differs |

### Hiding is not a mode

This is the design decision worth defending, because the obvious alternative — a
"show/hide **or** change content" switch on the module — is a trap.

A flag resolves to a value; the module decides what to render for it. There are only
ever two outcomes: render nothing, or render with some field values. **"Hide" is one
of the outcomes, not a mode.** Show/hide is simply the case where one value's row has
`render` off.

| Use | Rows |
| --- | --- |
| boolean kill switch | `true` → render · `false` → render **off** |
| boolean content swap | `true` → render · `false` → render + overrides |
| enum, 3 values | one row each, all render, each with overrides |
| enum where one arm drops the module | that arm's row has `render` off |

The last line is the argument. A mode switch makes hide-vs-content a property of the
*module*, so a three-arm experiment could never have an arm that removes the block —
and "does removing this convert better?" is a real test. A mode switch also creates an
invalid transition: fill in variant copy under "content", flip to "show/hide", and
that copy is either dropped or orphaned. And flags change type in GrowthBook more
often than expected; unified rows survive a boolean becoming a string by gaining
rows, where a mode becomes meaningless.

The ergonomics are not lost. Attaching a boolean auto-creates both rows with `false`
→ render off, so a kill switch is still zero extra clicks.

### Deriving the rows

`whenValue` comes from the flag's value domain, read from the ruleset — never typed.
An editor entering `"urgancy"` would silently never match anything.

- **A value with no row renders the base module.** Never blank. Add a fourth
  variation in GrowthBook and the site keeps working.
- **Blank field means inherit, not empty.** Payload distinguishes unset from empty
  string, so this works — but it has to be deliberate.
- **A removed variation keeps its row, marked orphaned.** Deleting it silently throws
  away copy someone wrote.

Deriving `overrides` from `block.fields` programmatically — strip `required`, wrap in
a group — is what makes this automatic for all 17 blocks including any added later.
It also enforces the industry constraint: a variant is structurally the same block,
so it cannot drift.

### Resolution at render

`RenderBlocks` (`src/components/blocks/index.tsx`) becomes the single place flags are
applied — it is already the right seam, and it is where the reverted kill-switch
experiment was wired:

```
for each block:
  value = resolve(block.flag.key)      # from the cached ruleset + audience
  row   = block.rows[value] ?? { render: true }   # unknown value → base module
  if !row.render → skip
  merge row.overrides over the base props, treating unset as inherit
  render
```

No flag logic anywhere else. That is requirement 8 — "no hardcoded features in FE" —
enforced structurally rather than by convention.

---

## 5. How an editor picks a flag

Payload's `select` options are static, so a dropdown of live GrowthBook flags needs a
small custom field component backed by an endpoint:

```
GET /api/flags/catalog   →   [{ key, type: 'boolean' | 'string', values: [...] }]
```

The endpoint derives everything from the ruleset we already cache — no second source
of truth, no manual list to maintain:

- **keys** — `Object.keys(payload.features)`
- **type** — from the feature's `defaultValue`
- **value domain** — `defaultValue` plus every `rules[].force` and
  `rules[].variations[]`

So creating a flag in GrowthBook makes it appear in the CMS dropdown with **no code
change and no deploy**. That is the "everything is automatic" requirement, and it is
the part worth demoing live — add a feature in GrowthBook, refresh the Payload admin,
it is in the list.

The same endpoint drives the rows: a boolean flag produces two (`true`, `false`), a
string flag produces one per value it can serve. Requirement 6, both halves, from one
source — and because a row carries both `render` and `overrides`, the boolean case is
not limited to show/hide (see "Hiding is not a mode" above).

Two guards, because the CMS and GrowthBook can drift:

- **Server-side validation** on save — reject a key that is not in the ruleset, so a
  typo fails in the admin rather than silently hiding a module in production.
- **Safe fallback** on read — a flag deleted in GrowthBook after being referenced
  must fall back to *visible*, never to hidden. A missing flag should never blank a
  page.

---

## 6. Routing

Current: `src/app/(frontend)/[locale]/[[...slug]]/page.tsx`

Proposed: `src/app/(frontend)/[locale]/[code]/[[...slug]]/page.tsx`

Proxy rewrites `/en/about` → `/en/<code>/about`. The browser URL never changes — a
rewrite, not a redirect, so there is no extra round trip and no one bookmarks a
variant URL they then cannot reproduce.

`generateStaticParams` produces locale × code × slug. Four audiences, two locales,
and a raised page limit gives a predictable, small number.

Three things the skill flags that apply directly here:

- **`params` is runtime data.** Reading `code` in the page body fails the prerender
  even though `generateStaticParams` enumerates every value. The unresolved promise
  has to be handed into a `use cache` scope and resolved inside, with an explicit
  `cacheLife`.
- **`getPrecomputed` throws on a code that does not verify** — and unhandled, the
  response is a **200 with an empty `<main>`**. Not a 500, not an error page. It must
  be caught and fall back to declared defaults.
- **`dynamicParams` stays on**, so a code outside the prebuilt set renders on demand
  instead of 404ing. This is the escape valve if the audience list changes.

**The integration risk to plan for:** next-intl's middleware already rewrites for
`localePrefix: 'as-needed'`. Composing that with a second rewrite is the fiddliest
part of this whole design, and it is the thing most likely to eat a day. The skill's
own advice applies — keep the current non-precomputed route alive at its own URL
while building this, so there is a direct comparison and the new tier cannot break
what already works.

---

## 7. Scaling to a whole-page flag

Requirement 5, and it falls out of the model for free.

A page-level flag is just a shared-decision flag read at the top of the page
component instead of inside `RenderBlocks`. Because it resolves from the audience
code, it costs **zero extra prerenders** — same as a module flag.

If the whole page needs *different content* rather than a different arrangement, the
same baseline+variants pattern applies one level up: a `variants` array on the Pages
document itself, each row overriding `layout`. Identical mental model, identical
renderer shape, one level higher. That symmetry is worth having — it means there is
one concept to explain, not two.

The only version that costs anything is a whole-page **experiment** hashed per
visitor, which goes in the curated code list and multiplies by its arm count.

---

## 8. What this costs — the honest list

Things that will bite, stated up front rather than discovered in the demo.

**Exposure tracking has to move to the client.** This is the big one. The skill is
blunt about it: an A/B test is an exposure event paired with a later conversion, and
an exposure call inside a cached scope fires on the miss and is skipped on every hit.
On a **precomputed page the entire page is a cache hit**, so a server-side exposure
call would fire once per variant, ever. Fifty thousand visitors, three variants,
three exposures — while conversions still attach to all fifty thousand. Every
dashboard looks healthy and the measured lift is meaningless. Nothing catches this:
not the build, not TypeScript, not a test, not any latency graph. Exposure must fire
client-side, and it is worth building the counter-check the skill describes — serve N
synthetic visitors, assert the event count is N.

**Vercel Toolbar overrides stop working on precomputed routes.** `evaluate` consults
the override cookie before calling `decide`; the precompute path never sees it. They
still work on any route evaluating through `flag()` normally.

**A migration across 17 blocks.** Each Payload block is its own table, and the rows
array adds another table per block. This is a large but mechanical
migration — and it lands exactly where the manual-migration workflow we just set up
earns its keep: `pnpm migrate:create` then `pnpm migrate`, reviewed before it runs
against production.

**Changing your mind costs a full navigation.** A precomputed page cannot re-decide
in place. Anything that changes an input to the decision needs a real navigation —
a Server Action writing a cookie is not enough, because proxy already ran with the
old cookie. `router.refresh()` is worse: it mounts the new tree beside the old one
and you get two `<main>` elements.

**Country is unverifiable locally.** `x-vercel-ip-country` is set at Vercel's edge and
does not exist on a dev machine — `/api/flags/debug` reports `country: "unknown"`
today for exactly this reason. Audience routing can only be tested on a deployment.

**Sticky bucketing is a paid GrowthBook feature.** If a visitor must keep a variant
across a flag-list change, check the plan before designing around it.

**Payload is on an unsupported Next major.** `@payloadcms/next` 3.71.1 declares a peer
of `next@^15.4.10`; we are on 16.3.1. Already true before this work, but this design
leans much harder on Next 16 routing behaviour.

---

## 9. Suggested order

Each phase is demo-able on its own, which matters if the demo date moves.

1. **Catalog + picker.** `/api/flags/catalog`, the custom field component, and
   `withFlags()` on **three** blocks — CTA, ArticleCarousel, FeaturedVideo. Wire
   rows with `render` only, no overrides yet. No routing changes at all: this runs on
   the current streamed setup. *Demo: create a flag in GrowthBook, it appears in
   Payload, and unticking a row removes the module.*
2. **Overrides.** The derived field set per row and merge-on-render. *Demo: one enum
   flag driving different copy and image in the same CTA, and a boolean driving two
   sets of content rather than presence.*
3. **Audience precompute.** The `[code]` segment, proxy rewrite, `generateStaticParams`.
   *Demo: same page, two countries, both served as prerendered HTML.*
4. **All modules.** `withFlags.all(...)` across the block lists, plus the migration.
5. **Page-level variants**, if wanted.

For the demo itself, phases 1–3 are the story. Phase 1 alone already shows the thing
people actually care about: an editor wiring a flag to a module without a developer.

---

## 10. Where this sits against the industry

| Approach | Model | Static? | Fits here? |
| --- | --- | --- | --- |
| Contentful + Ninetailed | baseline + `nt_experiences` → audience + same-type variants | Client-side resolution, mostly | **Data model copied** — it is the right shape |
| Optimizely CMS | Content Variations on the content item | Server-rendered | Same idea, heavier platform |
| Uniform | external orchestration layer over the CMS | Edge | Overkill — another vendor for what is a field |
| LaunchDarkly + CMS | flag key stored on the entry, resolved in app code | Depends | Closest to phase 1 here |
| Payload enterprise A/B | "statically renders variant content, delivered from the edge" | Yes | Same destination; no public architecture, and it is a paid tier |
| **This design** | flag + same-type variants per block, audience in the URL | **Yes, fully prerendered** | — |

The only real departure from the industry norm is putting the *audience* in the URL
rather than the flag values. Everyone doing this statically ends up with something
URL-keyed, because a CDN caches on URL — a page that branched on a header without the
URL changing would serve one visitor's variant to the next. Encoding the audience
rather than the flag product is what keeps the page count at 8 instead of 2,048.

---

## Sources

- [Entry personalization and variant resolution — Contentful](https://www.contentful.com/developers/docs/personalization/optimization-sdk/entry-personalization-and-variant-resolution/)
- [Personalization architecture — Contentful](https://www.contentful.com/developers/docs/personalization/architecture/)
- [Precompute — Flags SDK](https://flags-sdk.dev/frameworks/next/precompute)
- [Flags SDK reference — Vercel](https://vercel.com/docs/flags/flags-sdk-reference)
- [Content Variations — Optimizely CMS](https://docs.developers.optimizely.com/content-management-system/v13-Pre-Release/docs/content-variations)
- [Headless A/B variant testing — Payload](https://payloadcms.com/enterprise/headless-ab-variant-testing)
- [A/B testing and personalization with a headless CMS — FocusReactive](https://focusreactive.com/ab-testing-and-personalization-with-headless-cms/)
- Local: `.claude/skills/growthbook-nextjs-flags/reference/precompute.md`, `.../setup.md`
