# Deciding in proxy

```ts
export default async function proxy(request: NextRequest) {
  const response = handleI18n(request)   // or NextResponse.next()

  // Mint the visitor id first — see setup/reference/core-modules.md.
  ensureVisitorCookie(request, response)

  await addPrecomputedSegment(request, response)
  return response
}

/**
 * Rewrites the request onto the page prebuilt for this visitor's decisions:
 * `/es/about` is served by `/es/<code>/about`, with the address bar unchanged.
 *
 * Mutates the i18n response rather than building a new one. next-intl returns
 * either a rewrite (when the internal path differs from the requested one, as for
 * an unprefixed default-locale path) or a plain `next()` — and in both cases it
 * has already attached its locale request header and any locale cookie.
 * Constructing a fresh `NextResponse.rewrite()` would silently drop all of that,
 * so the two header fields that distinguish the shapes are edited in place.
 */
async function addPrecomputedSegment(request: NextRequest, response: Response) {
  // A redirect has no downstream render to target — the browser is being sent
  // somewhere else, and that request comes back through here afterwards.
  if (response.headers.has('location')) return

  // Nothing to sign with means nothing was prebuilt either, so rewriting would
  // only send every request to a page that has to render on demand.
  const secret = process.env.FLAGS_SECRET
  if (!secret) return

  const rewritten = response.headers.get('x-middleware-rewrite')
  const internal = new URL(rewritten ?? request.nextUrl.toString(), request.nextUrl.origin)

  const [, locale, ...rest] = internal.pathname.split('/')
  // Checked before anything is computed, because a code costs a ruleset read and
  // there is no reason to pay it on a route that will not use one.
  if (!isLocale(locale)) return
  if (rest[0] && RESERVED_SECTIONS.has(rest[0])) return

  const code = await decideCode(request, secret, locale)
  if (!code) return

  internal.pathname = `/${[locale, code, ...rest].filter(Boolean).join('/')}`

  // `next()` and `rewrite()` differ only in these two headers, so this converts
  // the former into the latter while leaving every other header intact.
  response.headers.delete('x-middleware-next')
  response.headers.set('x-middleware-rewrite', internal.toString())
}
```

**`RESERVED_SECTIONS`** mirrors the static route directories that own their own
files and must not gain a code segment — only the catch-all that can carry flagged
content lives behind `[code]`. Rewriting a section that has no `[code]` route
404s. Derive it by hand: middleware cannot read the route tree, and a new section
added without a line here fails immediately and loudly, which is the failure mode
to prefer.

## Deciding

```ts
/**
 * The evaluation is byte-for-byte the one the render path uses; only the ruleset
 * read differs, and that difference is forced — `getRuleset` is a `use cache`
 * scope, and `use cache` is a render-time directive that cannot run here.
 *
 * `locale` is passed in from the path rather than left to the attribute
 * resolver's cookie fallback, which lags the request by one navigation. Here the
 * answer is authoritative: it is baked into the code, and the page never
 * re-evaluates. A visitor's first request to a non-default locale would otherwise
 * be decided as the default and served that variant from a page they keep hitting.
 */
async function decideCode(request: NextRequest, secret: string, locale: string) {
  const ruleset = await readRulesetForProxy()
  if (!ruleset) return null

  const { flags } = precomputable(ruleset)
  if (!flags.length) return null

  const attributes = resolveAttributes({
    headers: request.headers,
    cookies: request.cookies,
    locale,
  })

  const decisions = Object.fromEntries(
    flags.map((entry) => [entry.key, evaluateValueWith(ruleset, entry.key, attributes)]),
  )

  return encode(decisions, secret)
}

export const config = {
  matcher: '/((?!api|admin|_next|_vercel|.*\\..*).*)',
}
```

**Everything proxy imports ends up in the proxy bundle.** Keep shared constants in
an import-free module, and never reach into a file that imports `next/headers` or
the CMS.
