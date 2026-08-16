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

  // Built per call and thrown away. A GrowthBookClient holds timers and is not
  // serialisable, so it could never be returned from a `use cache` scope anyway;
  // constructing one around an already-fetched payload is just an assignment.
  const client = new GrowthBookClient()
  client.initSync({ payload: ruleset })
  const result = client.evalFeature(key, { attributes })
  client.destroy()

  // Check the type rather than trusting it. A flag can be switched from boolean to
  // string in the GrowthBook dashboard without this code hearing about it, and the
  // declared default is a better answer than a type error at the render site.
  return result.value !== null && typeof result.value === typeof fallback
    ? (result.value as V)
    : fallback
}

/** The form every `decide` uses: read the cached ruleset, then evaluate. */
export async function evaluate<V>(
  key: string,
  attributes: Partial<Attributes>,
  fallback: V,
): Promise<V> {
  return evaluateWith(await getRuleset(), key, attributes, fallback)
}
