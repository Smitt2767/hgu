/**
 * The bounded bucket a visitor falls into, and the only geographic thing a flag
 * rule is allowed to target.
 *
 * The distinction from `country` is the whole reason this exists. Country has
 * roughly 250 values and a campaign name has infinitely many; precompute builds one
 * page per distinct answer, so targeting either directly makes the page set
 * unbounded. An audience is a handful of values by construction, so the page set
 * stays a handful too.
 *
 * That is also why `country` is deliberately *not* declared as an attribute in
 * GrowthBook even though the app sends it: declaring it is an invitation to write a
 * geo rule on the wrong attribute, which silently forces that flag out of any
 * prerender. A constraint in the tooling beats a warning in a document.
 *
 * Adding a market means adding a value here. Under precompute that costs no extra
 * pages at all — the permutations are over flag *values*, not attributes — which is
 * exactly the property a raw country code would destroy.
 */
export type Audience = 'us' | 'in' | 'gb' | 'row'

/** Everyone who is not in a market with its own treatment. */
const DEFAULT_AUDIENCE: Audience = 'row'

const BY_COUNTRY: Record<string, Audience> = {
  US: 'us',
  IN: 'in',
  GB: 'gb',
}

/**
 * Today an audience is a function of country alone.
 *
 * Vercel resolves the country at the edge, so it is absent on every local request
 * and every visitor in development lands in `row`. Worth knowing before concluding a
 * geo rule is broken: locally it is not firing because there is no country, not
 * because the rule is wrong.
 *
 * Campaign traffic is the intended second input — an allow-listed `utm_campaign`
 * becoming its own bucket — but that needs proxy to capture the parameter on the
 * landing request and persist it, since it exists only in the query string of the
 * first page view. Until then this stays country-only rather than pretending
 * otherwise.
 */
export function audienceOf(country: string | null | undefined): Audience {
  if (!country) return DEFAULT_AUDIENCE

  return BY_COUNTRY[country.toUpperCase()] ?? DEFAULT_AUDIENCE
}
