import type { Attributes } from '@/flags/attributes'
import { getRuleset } from '@/flags/ruleset'
import { GrowthBookClient, type FeatureApiResponse } from '@growthbook/growthbook'

/**
 * Joins a ruleset to a set of attributes. No network, no cache: a hash and a walk
 * over rules already in memory.
 *
 * Caching *this* would be a mistake in both directions — a cache lookup costs more
 * than the hash it avoids, and keying it per visitor is one entry per human being.
 */
export function evaluateWith<V>(
  ruleset: FeatureApiResponse | null,
  key: string,
  attributes: Partial<Attributes>,
  fallback: V,
): V {
  if (!ruleset) return fallback

  const value = evaluateValueWith(ruleset, key, attributes)

  // Check the type rather than trusting it. A flag can be switched from boolean to
  // string in the GrowthBook dashboard without this code hearing about it, and the
  // declared default is a better answer than a type error at the render site.
  return value !== null && typeof value === typeof fallback ? (value as V) : fallback
}

/**
 * The same evaluation, without a declared type.
 *
 * For callers whose expected type lives in the CMS rather than in code — a flag
 * attached to a block is matched against rows an editor sees, so there is no
 * TypeScript type to check against and nothing sensible to fall back to. `undefined`
 * says "no answer", and the caller decides what that means; for a module it means
 * rendering the base content.
 */
export function evaluateValueWith(
  ruleset: FeatureApiResponse | null,
  key: string,
  attributes: Partial<Attributes>,
): unknown {
  if (!ruleset) return undefined

  // Built per call and thrown away. A GrowthBookClient holds timers and is not
  // serialisable, so it could never be returned from a `use cache` scope anyway;
  // constructing one around an already-fetched payload is just an assignment.
  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })
  const result = client.evalFeature(key, { attributes })
  client.destroy()

  return result.value ?? undefined
}

/** The form every `decide` uses: read the cached ruleset, then evaluate. */
export async function evaluate<V>(
  key: string,
  attributes: Partial<Attributes>,
  fallback: V,
): Promise<V> {
  return evaluateWith(await getRuleset(), key, attributes, fallback)
}
