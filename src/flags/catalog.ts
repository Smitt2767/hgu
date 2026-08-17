import type { FeatureApiResponse, FeatureDefinition, FeatureRule } from '@growthbook/growthbook'

/**
 * Attributes proxy encodes into the URL, and which a prerendered page can therefore
 * replay. `locale` is already in the path; `audience` is the code segment.
 *
 * This list is the contract between the flag system and the routing. A rule that
 * targets anything outside it cannot be answered from a shared prerender — see
 * `tierOf` below. Adding an attribute here without also encoding it in proxy would
 * make the catalog lie.
 */
const PRERENDER_SAFE_ATTRIBUTES = ['audience', 'locale'] as const

/**
 * Whether this flag's answer is fully determined by the URL of the route asking, and
 * can therefore be decided in the static shell.
 *
 * `static` qualifies trivially: no rules, so the same answer for everyone.
 *
 * `prerender` qualifies only where the route actually carries every attribute the
 * flag targets, so `available` is a required parameter with no default. There is no
 * global answer to substitute: `locale` is a path segment everywhere, while anything
 * else reaches the render only where proxy encoded it. Guessing here would quietly
 * serve one visitor's answer to everybody.
 *
 * A precomputed flag never reaches this function — its answer arrives decoded from
 * the URL segment, whatever it targets.
 *
 * Experiments never qualify, and need no special case: `tierOf` classifies any flag
 * with an experiment as `streamed`, whatever it hashes on. That matters beyond
 * caching — an exposure event fired inside a shell render happens once per prerender
 * rather than once per visitor, which corrupts the results while everything still
 * looks healthy.
 */
export function isUrlDetermined(entry: CatalogEntry, available: readonly string[]): boolean {
  if (entry.tier === 'static') return true
  if (entry.tier !== 'prerender') return false

  return entry.targetedAttributes.every((attribute) => available.includes(attribute))
}

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
  /**
   * Whether this flag's answer is baked into the URL segment proxy rewrites to.
   *
   * Set by the catalog endpoint rather than derived here, because the answer depends
   * on the whole flag set — the permutation cap can exclude a flag that qualifies on
   * its own merits. Absent means "not known", which is how a client that did not ask
   * the endpoint should read it.
   */
  precomputed?: boolean
}

/**
 * Whether a freshly created row for `value` renders the module.
 *
 * `false` on a boolean means off, whichever way round the flag's default sits — so
 * attaching a boolean produces a working kill switch with no further clicks, and
 * "change the content instead" is ticking that row back on and filling fields.
 * Every other value renders; turning one off is the editor saying something
 * deliberate.
 *
 * Lives here because both ends need the same answer: the picker creates the rows in
 * the browser, and the save hook re-derives them on the server.
 */
export function rendersByDefault(type: FlagValueType, value: unknown): boolean {
  return type === 'boolean' ? value !== false : true
}

/**
 * Turns the cached ruleset into the list the Payload flag picker renders.
 *
 * Everything is derived from the payload GrowthBook already serves — there is no
 * second source of truth and nothing to keep in sync, which is what makes a flag
 * created in the dashboard show up in the CMS with no deploy.
 */
export function buildCatalog(ruleset: FeatureApiResponse | null): CatalogEntry[] {
  const features = ruleset?.features ?? {}

  return Object.entries(features)
    .map(([key, feature]) => toEntry(key, feature))
    .sort((a, b) => a.key.localeCompare(b.key))
}

function toEntry(key: string, feature: FeatureDefinition): CatalogEntry {
  const rules = feature.rules ?? []
  const type = valueTypeOf(feature)
  const targetedAttributes = collectTargetedAttributes(rules)
  const hasExperiment = rules.some((rule) => Array.isArray(rule.variations))

  return {
    key,
    type,
    values: valueDomainOf(feature, type),
    defaultValue: feature.defaultValue,
    hasExperiment,
    targetedAttributes,
    tier: tierOf({ rules, hasExperiment, targetedAttributes }),
  }
}

/**
 * A feature has no declared type in the payload, only values, so the type is read
 * off `defaultValue` — falling back to the first value any rule can serve, since
 * `defaultValue` is optional.
 */
function valueTypeOf(feature: FeatureDefinition): FlagValueType {
  const sample =
    feature.defaultValue ??
    (feature.rules ?? []).flatMap((rule) => [rule.force, ...(rule.variations ?? [])]).find(isDefined)

  if (typeof sample === 'boolean') return 'boolean'
  if (typeof sample === 'number') return 'number'
  if (typeof sample === 'string') return 'string'
  return 'json'
}

/**
 * Every value the flag can serve, default first so the editor's first row is the
 * control.
 *
 * Booleans are completed to `[true, false]` rather than read from the payload. A
 * boolean with no rules only ever *mentions* one value, but both are reachable —
 * and the editor needs a row for `false` to switch rendering off, which is how a
 * kill switch is expressed.
 */
function valueDomainOf(feature: FeatureDefinition, type: FlagValueType): unknown[] {
  if (type === 'boolean') return [feature.defaultValue ?? true, !(feature.defaultValue ?? true)]

  const candidates = [
    feature.defaultValue,
    ...(feature.rules ?? []).flatMap((rule) => [rule.force, ...(rule.variations ?? [])]),
  ].filter(isDefined)

  // Deduped by serialised value so object-valued flags collapse correctly, and in
  // first-seen order so rows keep a stable position between deploys.
  const seen = new Map<string, unknown>()
  for (const value of candidates) {
    const id = JSON.stringify(value)
    if (!seen.has(id)) seen.set(id, value)
  }
  return [...seen.values()]
}

/**
 * Which attributes the rules read.
 *
 * Conditions are Mongo-shaped, so operator keys (`$or`, `$and`, `$not`) hold nested
 * conditions and must be recursed into, while an ordinary key *is* an attribute and
 * its value holds comparison operands rather than more attribute names. Recursing
 * into the latter would collect `$in` and the values themselves as attributes.
 */
function collectTargetedAttributes(rules: FeatureRule[]): string[] {
  const found = new Set<string>()

  for (const rule of rules) {
    collectFromCondition(rule.condition, found)
    // An experiment splits on an attribute even with no condition at all; without
    // this an unconditional experiment would look like it targets nothing and be
    // mistaken for a static flag.
    if (Array.isArray(rule.variations)) found.add(rule.hashAttribute ?? 'id')
  }

  return [...found].sort()
}

function collectFromCondition(node: unknown, into: Set<string>): void {
  if (!node || typeof node !== 'object') return

  if (Array.isArray(node)) {
    for (const child of node) collectFromCondition(child, into)
    return
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) {
      collectFromCondition(value, into)
    } else {
      // `user.plan` targets the `user` attribute; the path after it is a lookup.
      into.add(key.split('.')[0])
    }
  }
}

function tierOf(args: {
  rules: FeatureRule[]
  hasExperiment: boolean
  targetedAttributes: string[]
}): FlagTier {
  const { rules, hasExperiment, targetedAttributes } = args

  if (rules.length === 0) return 'static'

  // Order matters. An identity *force* rule is private — its answer belongs to one
  // account and sharing it leaks an entitlement. An experiment also hashes on `id`
  // but its answer is shared by a third of visitors, so it only needs streaming.
  const identityForce = rules.some(
    (rule) => rule.force !== undefined && conditionAttributes(rule).includes('id'),
  )
  if (identityForce) return 'private'

  if (hasExperiment) return 'streamed'

  const safe = new Set<string>(PRERENDER_SAFE_ATTRIBUTES)
  return targetedAttributes.every((attribute) => safe.has(attribute)) ? 'prerender' : 'streamed'
}

function conditionAttributes(rule: FeatureRule): string[] {
  const found = new Set<string>()
  collectFromCondition(rule.condition, found)
  return [...found]
}

function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}
