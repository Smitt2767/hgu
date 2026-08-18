# The five archetypes

One module can carry all five over its life. Between them they cover every
attribute class: none, bounded, unbounded, and per-visitor.

---

## 1. Fixed value — the kill switch

| | |
| --- | --- |
| Type | `boolean` |
| Default | `true` |
| Rules | none |

**Use case.** The campaign a module links to ends at midnight, or its landing page
breaks. Someone non-technical pulls the module in seconds without a deploy and
without editing the page — which would otherwise mean re-publishing and
re-running revalidation.

**Default `true` on purpose.** The default is the safe state: if GrowthBook is
unreachable the site looks exactly as it does today. A default of `false` means an
outage at your flag provider blanks a module.

**Tier: static.** No rules, so the same answer for everyone, decided in the shell
at no cost. This is the only archetype that is free in every sense.

**In the CMS**, attaching a boolean flag should create two rows with `false` →
*don't render*. So a kill switch is zero extra clicks, and "change the content
instead" is ticking that row back on and filling in fields.

---

## 2. Targeting — different content per market

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule | Force: `IF audience is any of (in, gb) SERVE "regional"` |

**Use case.** Two markets get different wording — local pricing, a local campaign,
or the phrasing legal signs off on for that market — while everyone else keeps the
default.

**Target the bounded bucket, never raw country.** Country has ~250 values;
precompute builds one page per distinct answer. An `audience` enum keeps the page
set at a handful, and adding a market costs no extra pages at all because
permutations are over flag *values*, not attributes.

**Tier: prerender** — but only once proxy actually encodes `audience` into the
path. Until then it is classified prerenderable and still streams. Those are
different statements; do not promise the first while shipping the second.

---

## 3. Campaign — paid traffic sees the ad's offer

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule | Force: `IF utmCampaign = "summer-drop" SERVE "campaign"` |

**Use case.** Traffic from a paid campaign lands and sees the offer that matches
the ad it clicked, while organic traffic keeps the default. The most common
commercial ask for flags, and the one people assume works like country targeting.
It does not.

**It needs proxy work before the rule can fire at all.** Capture the UTM
parameters from the landing query, persist them to a cookie, and send them as
attributes. Until that lands the rule is configured and silently never matches,
which looks exactly like a broken flag.

**Verify with two requests, not one.** Hit `/?utm_campaign=summer-drop`, then
navigate to another page **without** the query string and confirm the variant
holds. One request proves the query was read; two prove it persisted.

**Tier: streamed**, because the campaign is not in the URL. If a specific campaign
later needs to be in the first HTML response — a paid landing page where
above-the-fold matters — allow-list it into its own `audience` bucket and retarget
the rule. That is a one-line proxy change and a rule edit; the CMS rows and copy
do not move.

**Never derive a bucket from the raw UTM value.** Unbounded input becomes an
unbounded page set, and with on-demand rendering enabled anyone can spray random
campaign values into your ISR cache.

---

## 4. Experiment — which version converts

| | |
| --- | --- |
| Type | `string`, default `"control"` |
| Rule 1 *(optional)* | Force: `IF audience = corporate SERVE "control"` — keeps a segment out |
| Rule 2 | Experiment: split by the identifier, 100% of units, variations `control` / `urgency` / `reassurance` |

**Use case.** Which of three headlines converts best. Three rows, three sets of
copy, one tracking key.

**Rule order matters.** Evaluation stops at the first match, so a force rule above
the experiment excludes that segment.

**Tier: streamed** — it splits on the identifier, so the answer is per visitor. It
*can* be precomputed (a third of visitors share each variant, and a shared answer
may live in a shared page) but **only if exposure is tracked from the client**.
See `payload-growthbook:precompute`.

**Do not start it before exposure tracking works.** An A/B test is an exposure
event paired with a later conversion; the variant rendering is not the experiment.
`payload-growthbook:track` first, always.

---

## 5. Entitlement — internal or beta accounts only

| | |
| --- | --- |
| Type | `boolean`, default `false` |
| Rule | Force: `IF id is any of (<uuid>, <uuid>) SERVE TRUE` |

**Use case.** Show unreleased work to the internal team on the live site before
anyone else sees it — stakeholder review without a staging environment. The same
shape serves a paid tier or a beta cohort.

**This one is a correctness hazard, not a cost.** A per-account answer baked into
a shared prerendered page is served to whoever lands on that URL next. It must
render in a `use cache: private` scope or stream, and it must be excluded from
precompute by rule, not by remembering.

**Default `false`.** An entitlement that fails open during an outage is the whole
point of the flag inverted.

**Where the id comes from.** For a signed-in check use the account id; for a
cookie-based preview, read the visitor id out of browser devtools → Application →
Cookies. If the same flag needs to distinguish signed-in accounts, send that as a
second identifier attribute rather than overloading the anonymous id.

**It scales badly by design.** A list of ids in a rule is fine for a dozen people;
past that, target a `plan` or `role` attribute the app sends, which keeps the same
tier and stops the rule becoming a directory.

---

## Together

| Flag | Kind | Targets | Tier | Extra prerendered pages |
| --- | --- | --- | --- | --- |
| `cta-visibility` | fixed | nothing | static | 0 |
| `cta-regional-offer` | targeting | `audience` | prerender | 0 |
| `cta-campaign-offer` | campaign | `utmCampaign` | streamed | 0, or +1 per allow-listed campaign |
| `cta-copy-test` | experiment | identifier | streamed, or ×n precomputed | 0 or ×n |
| `cta-beta-preview` | entitlement | `id` | private | never |
