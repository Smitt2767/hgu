import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { resolveAttributes } from './flags/attributes'
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from './flags/constants'
import { evaluateValueWith } from './flags/evaluate'
import { encode, precomputable } from './flags/precompute'
import { readRulesetForProxy } from './flags/ruleset'
import { routing } from './i18n/routing'

const handleI18n = createMiddleware(routing)

/**
 * Path sections that own their own route files and must not gain a code segment.
 *
 * This mirrors the static directories under `app/(frontend)/[locale]`. Only the pages
 * catch-all lives behind `[code]`, because it is the only route whose blocks can
 * carry a flag — the field exists on Pages and nowhere else. Rewriting `/articles`
 * would send it to a route that does not exist.
 *
 * A new static section added without a line here 404s immediately and loudly, which
 * is the failure mode to prefer: the alternative is deriving it at runtime, and
 * middleware cannot read the route tree.
 */
const RESERVED_SECTIONS = new Set(['articles', 'videos', 'templates'])

export default async function proxy(request: NextRequest) {
  const response = handleI18n(request)

  // Mint the anonymous visitor id here because this is the only place that can.
  // A Server Component may not set a cookie, so an id created during render would
  // never reach the browser — every request would look like a new visitor and no
  // experiment could hold anyone in a bucket for longer than one page view.
  //
  // Written to `request.cookies` as well as the response, and that is not belt and
  // braces: the code is decided below, on this same request. Without it a first-time
  // visitor would be bucketed on the `anonymous` fallback and then rendered under
  // their real new id — one visitor, two variants, on the one request nobody
  // re-checks.
  if (!request.cookies.get(VISITOR_COOKIE)) {
    const id = crypto.randomUUID()
    request.cookies.set(VISITOR_COOKIE, id)
    response.cookies.set(VISITOR_COOKIE, id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: VISITOR_COOKIE_MAX_AGE,
    })
  }

  await addPrecomputedSegment(request, response)

  return response
}

/**
 * Rewrites the request onto the page prebuilt for this visitor's flag decisions:
 * `/es/about` is served by `/es/<code>/about`, with the address bar unchanged.
 *
 * The decision has to happen here, before any render exists. A page that branched on
 * a header without the URL changing would be cached under one visitor's answer and
 * served to the next — a CDN keys on the URL, so putting the decision in the path is
 * what makes the cache key correct by construction. It also means nothing streams:
 * the answer is settled before rendering starts, whatever attribute produced it.
 *
 * Mutates next-intl's response rather than building a new one. next-intl returns
 * either a rewrite (when the internal path differs from the requested one, as for an
 * unprefixed default-locale path) or a plain `next()` — and in both cases it has
 * already attached the `X-NEXT-INTL-LOCALE` request header and any locale cookie.
 * Constructing a fresh `NextResponse.rewrite()` would silently drop all of that, so
 * the two header fields that distinguish the shapes are edited in place instead.
 */
async function addPrecomputedSegment(request: NextRequest, response: Response) {
  // A redirect has no downstream render to target — next-intl is sending the browser
  // somewhere else, and that request comes back through here afterwards.
  if (response.headers.has('location')) return

  // Nothing to sign with means nothing was prebuilt either, so rewriting would only
  // send every request to a page that has to render on demand.
  const secret = process.env.FLAGS_SECRET
  if (!secret) return

  const rewritten = response.headers.get('x-middleware-rewrite')
  const internal = new URL(rewritten ?? request.nextUrl.toString(), request.nextUrl.origin)

  // The locale is already the first segment by now: next-intl has either rewritten an
  // unprefixed path to include it, or it was there to begin with. Checked before
  // anything is computed, because a code costs a ruleset fetch and there is no reason
  // to pay it on a route that will not use one.
  const [, locale, ...rest] = internal.pathname.split('/')
  if (!isLocale(locale)) return
  if (rest[0] && RESERVED_SECTIONS.has(rest[0])) return

  const code = await decideCode(request, secret, locale)
  if (!code) return

  internal.pathname = `/${[locale, code, ...rest].filter(Boolean).join('/')}`

  // `next()` and `rewrite()` differ only in these two headers, so this converts the
  // former into the latter while leaving every other header next-intl set intact.
  response.headers.delete('x-middleware-next')
  response.headers.set('x-middleware-rewrite', internal.toString())
}

/**
 * Decides every precomputable flag for this request and encodes the answer.
 *
 * The evaluation is byte-for-byte the one the render path uses; only the ruleset read
 * differs, and that difference is forced — `getRuleset` is a `use cache` scope, and
 * `use cache` is a render-time directive that cannot run here at all.
 *
 * `precomputable` derives the flag set from the ruleset by the same deterministic
 * rule `generateStaticParams` runs, which is what lets the two sides agree without a
 * list maintained in code. When they do disagree — a flag added since the last build
 * — the failure is soft: the code misses the prebuilt set and the page renders on
 * demand, then caches.
 *
 * `locale` is passed in from the path rather than left to `resolveAttributes`, whose
 * fallback reads next-intl's `NEXT_LOCALE` cookie. That cookie is written on the
 * *response* and so lags the request by one navigation, and here the answer is
 * authoritative: it is baked into the code, and the page never re-evaluates. A
 * visitor's first request to `/es/...` would otherwise be decided as `en` and served
 * the English variant from a page they then keep hitting.
 */
async function decideCode(
  request: NextRequest,
  secret: string,
  locale: string,
): Promise<string | null> {
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

function isLocale(value: string | undefined): value is string {
  return Boolean(value) && (routing.locales as readonly string[]).includes(value as string)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|next|admin|trpc|_next|_vercel|.*\\..*).*)',
}
