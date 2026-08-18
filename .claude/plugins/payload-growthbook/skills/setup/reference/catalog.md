# The catalog: deriving everything from the ruleset

One function turns the cached ruleset into the list the CMS picker renders, the
tier each flag belongs to, and the value rows an editor fills in. **There is no
second source of truth and nothing to keep in sync** — which is what makes a flag
created in the dashboard show up in the CMS with no deploy.

```ts
export type FlagValueType = 'boolean' | 'string' | 'number' | 'json'

/**
 * Where a flag's decision can be rendered, derived from what its rules target.
 *
 * - `static`    no rules at all; same answer for everyone, lives in the shell
 * - `prerender` targets only URL-encoded attributes; safe in a shared prerender
 * - `streamed`  targets request data or splits per visitor; needs a Suspense region
 * - `private`   keyed on individual identity; must never enter a shared cache
 */
export type FlagTier = 'static' | 'prerender' | 'streamed' | 'private'

export type CatalogEntry = {
  key: string
  type: FlagValueType
  /** Every value this flag can serve, default first. Drives the editor's rows. */
  values: unknown[]
  defaultValue: unknown
  hasExperiment: boolean
  /** Attributes any rule reads, so the admin can explain *why* a tier was chosen. */
  targetedAttributes: string[]
  tier: FlagTier
}

export function buildCatalog(ruleset: FeatureApiResponse | null): CatalogEntry[] {
  return Object.entries(ruleset?.features ?? {})
    .map(([key, feature]) => toEntry(key, feature))
    .sort((a, b) => a.key.localeCompare(b.key))
}
```

## The four derivations, and what goes wrong in each

**Type — read off `defaultValue`.** A feature has no declared type in the payload,
only values, so fall back to the first value any rule can serve; `defaultValue` is
optional.

**Values — default first, deduped by serialised form.** Object-valued flags then
collapse correctly, and first-seen order keeps rows in a stable position between
deploys. **Complete booleans to `[true, false]` rather than reading them off the
payload**: a boolean with no rules only ever *mentions* one value, but both are
reachable, and the editor needs a row for `false` to switch rendering off.

**Targeted attributes — recurse operators, not operands.** Conditions are
Mongo-shaped, so operator keys (`$or`, `$and`, `$not`) hold nested conditions and
must be recursed into, while an ordinary key *is* an attribute and its value holds
comparison operands. Recursing into the latter collects `$in` and the values
themselves as attribute names.

```ts
for (const [key, value] of Object.entries(node)) {
  if (key.startsWith('$')) collectFromCondition(value, into)
  // `user.plan` targets the `user` attribute; the path after it is a lookup.
  else into.add(key.split('.')[0])
}
```

An experiment splits on an attribute **even with no condition at all**, so add
`rule.hashAttribute ?? 'id'` for any rule with `variations`. Without that line an
unconditional experiment looks like it targets nothing and is mistaken for a
static flag — which would put an exposure into a prerendered shell.

**Tier — order matters.**

```ts
function tierOf({ rules, hasExperiment, targetedAttributes }): FlagTier {
  if (rules.length === 0) return 'static'

  // An identity *force* rule is private — its answer belongs to one account and
  // sharing it leaks an entitlement. An experiment also hashes on `id`, but its
  // answer is shared by a third of visitors, so it only needs streaming.
  if (rules.some((r) => r.force !== undefined && conditionAttributes(r).includes('id')))
    return 'private'

  if (hasExperiment) return 'streamed'

  return targetedAttributes.every((a) => PRERENDER_SAFE_ATTRIBUTES.includes(a))
    ? 'prerender'
    : 'streamed'
}
```

`PRERENDER_SAFE_ATTRIBUTES` is the contract between the flag system and the
routing: the attributes proxy encodes into the URL, and which a prerendered page
can therefore replay. Adding one here without also encoding it in proxy makes the
catalog lie.

## Classification is not availability

```ts
/**
 * Whether this flag's answer is fully determined by the URL of the route asking.
 *
 * `available` has no default on purpose: `locale` may be a path segment
 * everywhere, while anything else reaches the render only where proxy encoded it.
 * Guessing here would quietly serve one visitor's answer to everybody.
 */
export function isUrlDetermined(entry: CatalogEntry, available: readonly string[]) {
  if (entry.tier === 'static') return true
  if (entry.tier !== 'prerender') return false
  return entry.targetedAttributes.every((a) => available.includes(a))
}
```

A flag targeting a bounded audience is *classified* `prerender`, but nothing
answers it until proxy actually encodes that attribute. Keep the two ideas apart
or the shell will render a value it cannot know.

## The endpoint

```ts
export async function GET() {
  const { user } = await payload.auth({ headers: await getHeaders() })
  // Narrow to the intended collection: an MCP or API-key auth collection must not
  // read the flag list. Flag keys describe unreleased work.
  if (!isAdminUser(user)) return Response.json({ error: 'unauthorised' }, { status: 401 })

  const ruleset = await getRuleset()

  return Response.json({
    // Distinguishes "no features exist" from "we could not reach GrowthBook",
    // which otherwise both render as an empty dropdown with nothing to explain it.
    reachable: ruleset !== null,
    dateUpdated: ruleset?.dateUpdated ?? null,
    flags: buildCatalog(ruleset),
  })
}
```
