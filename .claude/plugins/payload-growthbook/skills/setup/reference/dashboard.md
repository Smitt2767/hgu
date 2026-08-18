# What to configure in GrowthBook

The dashboard half of the setup. Attributes are declared here and *sent* by the
app; a mismatch shows up as a rule that never fires, never as an error.

## Attributes

Declare these before writing any rule. Enum options go in comma-separated.

| Attribute | Type | Values | Identifier |
| --- | --- | --- | --- |
| `id` | String | UUID from the visitor cookie, or `anonymous` | **yes** |
| `deviceType` | Enum | `mobile, tablet, desktop` | no |
| `locale` | Enum | your supported locales | no |
| `audience` | Enum | `us, gb, row` — your bounded markets | no |
| `utmSource` / `utmMedium` / `utmCampaign` | String | free text | no |

**Tick Identifier on the bucketing attribute, and only that one.** Without it
GrowthBook will not offer it as an experiment split key, so no experiment can be
created at all.

**Declare dormant attributes early.** An attribute the app does not send yet is
simply never matched, so declaring it now means rules do not need rewriting later.
That silence is also the single most likely thing to read as "GrowthBook is
broken" — write down which ones are not sent yet.

**Delete the defaults nothing populates.** GrowthBook ships `browser` and friends
enabled; if your app never sends them, any rule using one never matches, with no
hint that the attribute is empty.

## Do not declare raw country

Send `country` from the edge geo header — it is how you confirm geo resolution
works on a deployment — but **do not declare it as a targetable attribute**.

Declaring it is an invitation to write a geo rule on the wrong attribute, which
silently forces that flag out of any prerender. Geo rules target `audience`
instead; a new market is a new enum value, which costs no extra prerendered pages.
A constraint in the tooling beats a warning in a document.

Undeclared attributes are ignored by rules, so sending one GrowthBook does not
know about breaks nothing.

## `anonymous` and `unknown` are real values

The visitor id falls back to the literal `anonymous` when the cookie is missing,
and country to `unknown` when the header is absent — which is **every local
request**. So a rule phrased "country is not US" matches every dev request.

## Where UTMs fit

Campaign parameters have three properties that all bite:

**They exist only on the landing request.** A visitor arrives at
`/?utm_campaign=summer`, clicks through, and the parameter is gone. Target it
directly and a visitor reclassifies mid-session — cohorts drift and the experiment
stops meaning anything, with nothing to indicate it happened. Proxy must persist
them to a cookie on first sight; it is the only place that both sees the query
string and can set a cookie.

**Reading `searchParams` in a page forces it dynamic.** Under Cache Components
search params are runtime data and the route stops prerendering entirely. Proxy
reading `request.nextUrl.searchParams` is fine, because proxy is not a render.
That asymmetry is what makes the cookie hop necessary rather than merely tidy.

**They are unbounded**, which decides where a UTM-targeted flag can live:

| Use | Tier | Cost |
| --- | --- | --- |
| Any campaign, targeted in a rule | streamed — read the cookie inside `<Suspense>` | 0 pages |
| One allow-listed campaign needing above-the-fold treatment | mapped into `audience` in proxy | +1 permutation each |

**Never derive the bounded bucket from the raw UTM value.** If
`?utm_campaign=<anything>` produces a new bucket, the page set is unbounded — and
with `dynamicParams` on, anyone can spray random values and force unbounded
on-demand renders into the ISR cache. The allow-list belongs in code, not the CMS.

**Decide first-touch or last-touch explicitly.** First-touch (write the cookie
only if absent) is safer for experiments because it stops mid-experiment
reclassification; last-touch is what most analytics tools assume. The two produce
different numbers and the difference is invisible until someone reconciles
dashboards.

## SDK connection

One connection serves local and production — the client key is the same value in
`.env` and in the host's environment. The key fetches the **full ruleset**, so
treat it as server-side: shipping it to the browser hands over every flag rule in
the project.

## Managed Warehouse (only if you will track experiments)

Provision it in Settings, then note the region-specific ingest origin
(`https://us1.gb-ingest.com`, `https://eu-west-1.gb-ingest.com`, …) as
`GROWTHBOOK_INGEST_HOST`. Authentication is the client key on the query string —
another reason it never reaches the browser.

While the host is unset, exposure events should be counted and logged but not
sent. That is the useful failure: an experiment silently recording nothing looks
exactly like an experiment nobody has entered yet.
