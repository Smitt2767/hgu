# Selection and encoding

```ts
/**
 * A flag with more values than this is left out. Not arbitrary: the permutation
 * count is a product, so one wide flag costs more than several narrow ones.
 */
const MAX_VALUES_PER_FLAG = 4

/**
 * Hard ceiling on prebuilt permutations. Page count is a product of things edited
 * in a dashboard, so it needs a limit that does not depend on anyone remembering.
 * Whatever exceeds it still works — it renders on demand and caches.
 */
const MAX_PERMUTATIONS = 32

/** Fixed-length base64url signature prefix. 16 bytes of HMAC-SHA256. */
const SIGNATURE_LENGTH = 22

/**
 * The point at which a code is long enough to worry about. A prerendered page is
 * written to disk as `<code>.html` and most filesystems stop at 255 bytes for a
 * single filename. The encoding is self-describing — it carries the flag keys,
 * which is what makes it survive the set changing — so it grows with the number of
 * flags. Past the limit the build fails on a filename rather than on anything
 * mentioning flags.
 */
const CODE_LENGTH_WARN = 200
```

## Which flags qualify

```ts
export function precomputable(ruleset: FeatureApiResponse | null) {
  const eligible = buildCatalog(ruleset)
    .filter(
      (entry) =>
        entry.tier !== 'private' &&          // never share a per-account answer
        entry.values.length > 1 &&
        entry.values.length <= MAX_VALUES_PER_FLAG,
    )
    // Restated even though buildCatalog sorts: the encoding and the trimming below
    // both depend on a stable order across two runtimes.
    .sort((a, b) => a.key.localeCompare(b.key))

  const flags = [...eligible]
  const dropped: string[] = []

  // Widest first, so the cheapest flags survive. Ties break on key, which keeps
  // this identical in proxy and at build time.
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

const count = (flags) => flags.reduce((total, e) => total * e.values.length, 1)

/** Every combination of the given flags' values, as key/value maps. */
export function permutations(flags: CatalogEntry[]): Decisions[] {
  return flags.reduce<Decisions[]>(
    (acc, entry) => acc.flatMap((base) => entry.values.map((v) => ({ ...base, [entry.key]: v }))),
    [{}],
  )
}
```

## Signing

```ts
/**
 * Signed because the segment is otherwise an open invitation to enumerate the
 * variant space and to request combinations the flags would never have produced.
 *
 * Keys are sorted so the same decisions always produce the same code — proxy and
 * the build compute it independently, and a byte of disagreement means every
 * request misses the prerender and renders on demand instead.
 */
export async function encode(decisions: Decisions, secret: string): Promise<string> {
  const payload = base64url(new TextEncoder().encode(canonical(decisions)))
  return (await sign(payload, secret)) + payload
}

/**
 * Verifies and decodes, or `null` if the signature does not hold.
 *
 * `null` means "decide the ordinary way" rather than an error page. A code that
 * fails to verify is a stale link or a probe, and neither deserves a broken page.
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
  return JSON.stringify(Object.keys(decisions).sort().map((k) => [k, decisions[k]]))
}

/**
 * Web Crypto rather than `node:crypto`, because this runs in proxy — the edge
 * runtime has no `createHmac`.
 */
async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return base64url(new Uint8Array(mac).slice(0, 16))
}
```

If codes outgrow the filename limit, the fix is a compact encoding: a short
fingerprint of the key list plus positional values, with the page recovering the
keys from the ruleset it already reads. Do that when the warning fires, not before
— the self-describing form is what makes an old code degrade gracefully.
