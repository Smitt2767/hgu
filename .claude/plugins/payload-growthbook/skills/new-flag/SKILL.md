---
name: new-flag
description: >
  Choose and configure a new GrowthBook flag for a Payload + Next.js app — a kill
  switch, a targeting rule, a campaign rule, an A/B experiment, or a beta
  entitlement — and work out where its answer is allowed to render. Use when
  asked to add a feature flag, run an A/B test, show different content by
  country, market, device or campaign, gate a feature to specific accounts or an
  internal beta, or turn something off without deploying; and when deciding
  whether a flag can be prerendered, must stream, or must stay private.
---

# Choose the flag, then the tier

Two decisions, in this order. Get the second one from the first — do not pick a
rendering strategy and then bend the rule to fit it.

## 1. Which archetype

| Want | Archetype | Type | Rule |
| --- | --- | --- | --- |
| Turn something off without a deploy | **fixed value** | boolean | none — the default *is* the answer |
| Different content per market | **targeting** | string | force on a bounded `audience` |
| Paid traffic sees the ad's offer | **campaign** | string | force on `utmCampaign` |
| Find out which version converts | **experiment** | string | split on the identifier |
| Internal or beta accounts only | **entitlement** | boolean | force on a list of `id`s |

Full recipes, with the use case, the exact rule and the trap in each:
`reference/archetypes.md`. Read it before configuring anything.

**One flag, one purpose.** A flag that is both a kill switch and a copy test has
two audiences and no clean way to end either.

## 2. Which tier follows

**The attribute the rule targets decides where the answer may be rendered.** That
is the whole sorting rule, and it is worth internalising before writing rules
rather than after.

| Rule targets | Tier | Rendered |
| --- | --- | --- |
| nothing | static | in the static shell, free |
| only attributes the URL encodes | prerender | in a shared prerendered page |
| device, campaign, or an experiment split | streamed | inside `<Suspense>` |
| individual `id`s | **private** | `use cache: private`, or not cached at all |

Target only what the URL encodes and the flag prerenders. Target anything else and
it streams or goes private. Neither is a bug — it is the cost, and it is decided
in the dashboard, not in the code.

**The one that is a correctness hazard rather than a cost: entitlement.** A
per-account answer baked into a shared page is served to whoever lands on that URL
next. Never precompute it, never key a shared cache on it, and never pass the
account id as a *prop* into a shared cached scope — props are not rejected the way
`cookies()` is, so one entry per variant quietly becomes one per visitor while the
page still looks right.

## Defaults are the outage behaviour

The default value is what every visitor gets when GrowthBook is unreachable.
**Make it the safe state, not the interesting one.** A kill switch defaulting to
`false` means a provider blip blanks the module.

## Rule order is evaluated top-down, first match wins

A force rule above an experiment excludes that segment from the test. Put it there
deliberately or not at all — a stray force rule at the top is an experiment that
quietly measures a subset.

## Naming

`<module>-<purpose>`: `cta-visibility`, `hero-copy-test`, `pricing-beta`. The key
appears in the CMS picker, in warehouse rows and in the URL segment under
precompute, and it is the only thing tying all three together. Renaming later is
a rename in four places, so spend the ten seconds now.

## Configure, then prove it exists

1. Create the feature in GrowthBook. No code change is needed for the flag itself.
2. Check it arrives: `curl -s localhost:3000/api/flags/debug` — the key appears in
   `featureKeys` with no deploy. That "no deploy needed" property is the one worth
   demonstrating to whoever asked for the flag.
3. Check the tier the app derived matches what you intended. If the catalog
   endpoint is wired, it reports the tier; if not, re-read the table above against
   the rule you wrote.

**A rule that targets an attribute the app does not send never matches and never
errors.** That silence is the single most likely thing to read as "GrowthBook is
broken". Confirm the attribute is in the debug endpoint's attribute block before
concluding anything about the rule.

## Then attach it

A flag nothing reads does nothing. Next:

- Editors should control which content each value serves →
  `payload-growthbook:add-to-module`
- A route, a section or a non-CMS component branches on it →
  `payload-growthbook:add-to-page`
- **It is an experiment** → `payload-growthbook:track` *before* you start it. An
  experiment running without correct exposure tracking produces confident, wrong
  numbers, and the damage is to data you cannot reconstruct.
