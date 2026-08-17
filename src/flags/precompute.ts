import { buildCatalog, type CatalogEntry } from '@/flags/catalog'
import type { FeatureApiResponse } from '@growthbook/growthbook'

/**
 * Prerendering one page per flag *decision*, with nothing declared in code.
 *
 * Every other tier keeps the page static and lets the decision arrive at request
 * time, streaming each flag-dependent module in behind `<Suspense>`. Precompute
 * inverts that: proxy decides first, encodes the decision into a URL segment, and
 * rewrites to the page built for exactly that decision. Nothing streams, because
 * nothing is undecided by the time rendering starts — whatever attribute produced
 * the answer.
 *
 * ## Why the URL has to carry it
 *
 * A CDN keys its cache on the URL. A page that branched on a header without the URL
 * changing would be cached under one visitor's answer and served to the next.
 * Encoding the decision into the path makes the cache key correct by construction.
 *
 * ## Why this does not use the Flags SDK
 *
 * `precompute(flags)` and `generatePermutations(flags)` take an array of `flag()`
 * declarations, and `serialize` encodes values **positionally** — by index into that
 * array. Both force a hand-maintained, append-only list in code, which would mean a
 * deploy every time an editor adds a flag or an option in GrowthBook. That is the one
 * property this whole system exists to avoid.
 *
 * So the set is derived from the ruleset instead, by a rule both sides run (see
 * `precomputable`), and the encoding is self-describing key/value pairs rather than
 * positions. Adding or removing a flag therefore cannot corrupt an existing code: an
 * older code simply lacks the new key, and that flag falls through to the ordinary
 * request-time path.
 *
 * The cost is Vercel Toolbar overrides, which only work through `flag()`.
 */

/**
 * A flag with more values than this is left out.
 *
 * Not arbitrary: the permutation count is a product, so one wide flag costs more than
 * several narrow ones. Anything wider is better served streamed.
 */
const MAX_VALUES_PER_FLAG = 4

/**
 * Hard ceiling on prebuilt permutations.
 *
 * Page count is now a product of things edited in a dashboard, so it needs a limit
 * that does not depend on anyone remembering. Whatever exceeds it still *works* —
 * `dynamicParams` renders it on demand and caches the result — it just is not
 * prebuilt.
 */
const MAX_PERMUTATIONS = 32

/** Fixed-length base64url signature prefix. 16 bytes of HMAC-SHA256. */
const SIGNATURE_LENGTH = 22

/**
 * The point at which a code is long enough to worry about.
 *
 * A prerendered page is written to disk as `<code>.html`, and most filesystems stop
 * at 255 bytes for a single filename. The encoding is self-describing — it carries
 * the flag keys, which is what makes it survive the set changing — so it grows with
 * the number of flags rather than staying fixed. Two flags is around 90 characters;
 * six or seven would reach the limit, and the build would fail on a filename rather
 * than on anything mentioning flags.
 *
 * 200 leaves room to notice first. Past that the fix is a compact encoding: a short
 * fingerprint of the key list plus positional values, with the page recovering the
 * keys from the ruleset it already reads.
 */
const CODE_LENGTH_WARN = 200

export type Decisions = Record<string, unknown>

/**
 * The flags worth prebuilding, derived from the ruleset alone.
 *
 * Proxy and the build must agree exactly, and proxy runs at the edge with no database
 * — so the rule can only read the ruleset, which is the one input both sides share.
 * It is deterministic on purpose: same ruleset in, same set out, no ordering luck.
 *
 * Almost everything qualifies, because the decision is made in proxy where every
 * attribute exists. Country, device, campaign, experiment bucket — all of them
 * collapse into a value, and only the value reaches the URL. Two exclusions:
 *
 * - **Identity-targeted flags.** A rule forcing a value for specific `id`s has an
 *   answer that belongs to one account, and a shared page carrying it is served to
 *   whoever lands on it next. This is the worst failure available here, and the only
 *   one this list exists to prevent.
 * - **Wide value domains.** They multiply the page count fastest for the least
 *   benefit. A cost decision, not a correctness one.
 *
 * **Experiments are included, and that is safe only because exposure is tracked on
 * the client.** An experiment is an exposure event paired with a later conversion,
 * not a variant rendering. An exposure fired inside a prerendered render would fire
 * once per *build* while conversions kept attaching to every visitor — fifty thousand
 * visitors, three variants, three exposures, and every dashboard still healthy. A
 * client component fires on each page view whether the HTML was prerendered or not,
 * which is what makes this sound. Move exposure into a Server Component inside these
 * pages and the data goes quietly wrong.
 *
 * Assignment itself is unaffected: an experiment hashes `id`, so a third of visitors
 * share a variant, and a shared decision is exactly what a shared page may carry.
 * That is different from an identity *force* rule above, which is why `tierOf`
 * separates the two.
 */
export function precomputable(ruleset: FeatureApiResponse | null): {
  flags: CatalogEntry[]
  dropped: string[]
} {
  const eligible = buildCatalog(ruleset)
    .filter(
      (entry) =>
        entry.tier !== 'private' &&
        entry.values.length > 1 &&
        entry.values.length <= MAX_VALUES_PER_FLAG,
    )
    // `buildCatalog` already sorts by key; restated because the encoding and the
    // trimming below both depend on a stable order across two runtimes.
    .sort((a, b) => a.key.localeCompare(b.key))

  const flags = [...eligible]
  const dropped: string[] = []

  // Widest first, so the cheapest flags survive. Ties break on key, which keeps this
  // identical in proxy and at build time.
  while (count(flags) > MAX_PERMUTATIONS && flags.length > 0) {
    const widest = flags.reduce((worst, entry) =>
      entry.values.length > worst.values.length ||
      (entry.values.length === worst.values.length && entry.key > worst.key)
        ? entry
        : worst,
    )

    flags.splice(flags.indexOf(widest), 1)
    dropped.push(widest.key)
  }

  return { flags, dropped }
}

function count(flags: CatalogEntry[]): number {
  return flags.reduce((total, entry) => total * entry.values.length, 1)
}

/** Every combination of the given flags' values, as key/value maps. */
export function permutations(flags: CatalogEntry[]): Decisions[] {
  return flags.reduce<Decisions[]>(
    (acc, entry) => acc.flatMap((base) => entry.values.map((value) => ({ ...base, [entry.key]: value }))),
    [{}],
  )
}

/**
 * Signs and encodes a decision map.
 *
 * Signed because the segment is otherwise an open invitation to enumerate the variant
 * space and to request combinations the flags would never have produced. Keys are
 * sorted so the same decisions always produce the same code — proxy and the build
 * compute it independently, and a byte of disagreement means every request misses the
 * prerender and renders on demand instead.
 */
export async function encode(decisions: Decisions, secret: string): Promise<string> {
  const payload = base64url(new TextEncoder().encode(canonical(decisions)))

  return (await sign(payload, secret)) + payload
}

/** True once codes are long enough to threaten the filename limit. See the constant. */
export function codeIsOverlong(code: string): boolean {
  return code.length > CODE_LENGTH_WARN
}

/**
 * Verifies and decodes, or `null` if the signature does not hold.
 *
 * `null` means "decide the ordinary way" rather than an error page. A code that fails
 * to verify is a stale link or a probe, and neither deserves a broken page.
 */
export async function decode(code: string, secret: string): Promise<Decisions | null> {
  const signature = code.slice(0, SIGNATURE_LENGTH)
  const payload = code.slice(SIGNATURE_LENGTH)

  if (!payload || (await sign(payload, secret)) !== signature) return null

  try {
    const entries = JSON.parse(new TextDecoder().decode(fromBase64url(payload)))
    return Object.fromEntries(entries as [string, unknown][])
  } catch {
    return null
  }
}

/** Sorted pairs, so the encoding is a pure function of the decisions. */
function canonical(decisions: Decisions): string {
  return JSON.stringify(
    Object.keys(decisions)
      .sort()
      .map((key) => [key, decisions[key]]),
  )
}

/**
 * Web Crypto rather than `node:crypto`, because this runs in proxy — the edge
 * runtime has no `createHmac`.
 */
async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))

  return base64url(new Uint8Array(mac).slice(0, 16))
}

function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function fromBase64url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
}
