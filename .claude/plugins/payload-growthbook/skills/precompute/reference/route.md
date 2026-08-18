# The `[code]` route

## Building the pages

```ts
/**
 * One prerendered page per decision, per locale, per page.
 *
 * The permutations walk flag *values*, not attributes — and that distinction is
 * the entire economics. Audiences, devices and countries multiply the visitors,
 * not the pages; adding one costs nothing. Adding a *flag* with n values
 * multiplies by n, which is the number to watch.
 */
export const generateStaticParams = async () => {
  const secret = process.env.FLAGS_SECRET

  // Without a secret nothing can be signed, so nothing is prebuilt and every
  // request renders on demand. Degraded, not broken — and loud, because silently
  // serving no prerenders looks exactly like precompute working.
  if (!secret) {
    console.warn('[flags] FLAGS_SECRET is unset: no precomputed pages will be built')
    return []
  }

  const [pages, ruleset] = await Promise.all([getPageSlugs(), getRuleset()])
  const { flags, dropped } = precomputable(ruleset)

  if (dropped.length) {
    console.warn(`[flags] over the permutation cap, not prebuilding: ${dropped.join(', ')}`)

    // Louder, because this one costs data rather than latency. Exposure is
    // reported by a client beacon that only precomputed pages render, so an
    // experiment falling out of the set keeps running and quietly stops being
    // measured — variants still serve, conversions still arrive, and no dashboard
    // shows the denominator went missing.
    const untracked = buildCatalog(ruleset)
      .filter((e) => e.hasExperiment && dropped.includes(e.key))
      .map((e) => e.key)

    if (untracked.length) {
      console.warn(
        `[flags] experiments dropped from precompute will NOT be tracked: ${untracked.join(', ')}` +
          ' — raise the cap, narrow another flag, or track these per request',
      )
    }
  }

  const codes = await Promise.all(permutations(flags).map((d) => encode(d, secret)))

  // A prerendered page is a file named after its code, and filesystems stop at
  // 255 bytes. Said out loud here because the alternative is a build that fails on
  // a filename with nothing to connect it to the number of flags.
  if (codes.some(codeIsOverlong)) console.warn('[flags] codes approaching the filename limit')

  return locales.flatMap((locale) =>
    codes.flatMap((code) => pages.map((slug) => ({ locale, code, slug: [slug] }))),
  )
}
```

**Leave `dynamicParams` at its default of `true`.** A code outside the prebuilt set
— the flag list changed, someone pasted an old link — renders on demand rather
than 404ing, and the signature check means an unknown code is either a valid
combination you did not prebuild or it is rejected.

**Multiply carefully.** Whatever caps the page list is multiplied by the code
count. Check it before enabling this, not after the build.

## Decoding the segment

```ts
/**
 * **`params` is taken as a promise and resolved in here, and that is not
 * stylistic.** Under Cache Components `params` counts as runtime data, so reading
 * it in the page body fails the prerender outright even though
 * `generateStaticParams` enumerates every value. Handing the unresolved promise to
 * a `use cache` scope and awaiting it inside is what keeps these pages static.
 *
 * `cacheLife('max')` because this is a pure function of the segment; without it
 * the scope inherits `default` and revalidates a pure function every fifteen
 * minutes.
 *
 * The catch matters more than it looks. Verification throws on a segment that does
 * not verify, and unhandled that produces a 200 whose entire body is missing — not
 * a 500, not an error page. Falling back to the declared defaults renders the base
 * modules instead, which is the same answer a missing flag gets everywhere else.
 */
async function decode(params: Promise<Params>) {
  'use cache'
  cacheLife('max')

  const { code, ...rest } = await params
  const secret = process.env.FLAGS_SECRET
  const precomputed = secret ? await decodeCode(code, secret) : null

  if (!precomputed) console.warn('[flags] precomputed code did not verify')

  return { ...rest, code, precomputed: precomputed ?? {} }
}
```

## The on-demand fallback

If the framework offers an instant-navigation validation opt-out (`export const
instant = false` in Next 16), consider it **as a backstop, not a fix**. For any
code in the prebuilt set nothing about it applies — those pages are files on disk.
What it buys is the other half of `dynamicParams`: a code that was never prebuilt
has to render at request time, and without the opt-out such a request can 500
instead of rendering. A 500 on the home page is a worse failure than a non-instant
navigation.

Pair it with fixing the reads themselves — the ruleset's failure profile, the
locale passed as a prop — rather than using it instead of them.

## Draft mode and preview

Read `draftMode().isEnabled` **before** touching any auth cookie. Next hands a
prerender a null provider whose `isEnabled` is always `false`, so the check itself
is free and the route stays fully prerendered; only requests carrying the bypass
cookie fall into the preview branch that reads identity. Pull identity out first
and every anonymous visitor goes dynamic too.
