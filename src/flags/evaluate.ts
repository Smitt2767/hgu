import type { Attributes } from '@/flags/attributes'
import { GrowthBookClient, type FeatureApiResponse } from '@growthbook/growthbook'

/**
 * Joins a ruleset to a set of attributes. No network, no cache: a hash and a walk
 * over rules already in memory.
 *
 * Caching *this* would be a mistake in both directions — a cache lookup costs more
 * than the hash it avoids, and keying it per visitor is one entry per human being.
 *
 * Untyped by design. The expected type lives in the CMS rather than in code: a flag
 * attached to a block is matched against rows an editor sees, so there is no
 * TypeScript type to check against and nothing sensible to fall back to. `undefined`
 * means "no answer", and the caller decides what that means — for a module it means
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
