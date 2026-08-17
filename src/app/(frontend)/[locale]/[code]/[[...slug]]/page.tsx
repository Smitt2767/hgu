import RenderBlocks from '@/components/blocks'
import LivePreviewListener from '@/components/live-preview-listener'
import StageBanner from '@/components/stage-banner'
import { getPage, getPagesSlugs, getPreviewPage } from '@/data/page'
import { buildCatalog } from '@/flags/catalog'
import {
  codeIsOverlong,
  decode as decodeCode,
  encode,
  permutations,
  precomputable,
} from '@/flags/precompute'
import { getRuleset } from '@/flags/ruleset'
import { routing } from '@/i18n/routing'
import { getImageUrl } from '@/utils'
import { getDBSlug } from '@/utils/slug'
import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

type Params = { locale: string; code: string; slug?: string[] }

/**
 * One prerendered page per decision, per locale, per page.
 *
 * `generatePermutations` walks the `options` declared on each flag in
 * `precomputeFlags` — 2 x 2 today. It does **not** walk the attributes, and that
 * distinction is the entire economics: audiences, devices and countries multiply the
 * visitors, not the pages. Adding one costs nothing. Adding a *flag* with n options
 * multiplies by n, which is the number to watch.
 *
 * With `getPagesSlugs` capped at 1 that is 2 locales x 4 codes x 1 page = 8.
 *
 * The code never appears in a URL anyone types — proxy rewrites to it, so the
 * address bar keeps showing `/es/about`.
 */
export const generateStaticParams = async () => {
  const secret = process.env.FLAGS_SECRET

  // Without a secret nothing can be signed, so nothing is prebuilt and every request
  // renders on demand. Degraded, not broken — and loud, because silently serving no
  // prerenders would look exactly like precompute working.
  if (!secret) {
    console.warn('[flags] FLAGS_SECRET is unset: no precomputed pages will be built')
    return []
  }

  const [pages, ruleset] = await Promise.all([getPagesSlugs(), getRuleset()])
  const { flags, dropped } = precomputable(ruleset)

  // Never silently: a capped set still renders correctly, but "everything is
  // prerendered" would be the wrong thing to believe about it.
  if (dropped.length) {
    console.warn(`[flags] over the permutation cap, not prebuilding: ${dropped.join(', ')}`)

    // Louder, because this one costs data rather than latency. Exposure is reported by
    // a client beacon that only precomputed pages render, so an experiment falling out
    // of the set keeps running and quietly stops being measured — variants still serve,
    // conversions still arrive, and no dashboard shows the denominator went missing.
    const untracked = buildCatalog(ruleset)
      .filter((entry) => entry.hasExperiment && dropped.includes(entry.key))
      .map((entry) => entry.key)

    if (untracked.length) {
      console.warn(
        `[flags] experiments dropped from precompute will NOT be tracked: ${untracked.join(', ')}` +
          ' — raise MAX_PERMUTATIONS, narrow another flag, or track these from TargetedBlock',
      )
    }
  }

  const codes = await Promise.all(permutations(flags).map((d) => encode(d, secret)))

  // A prerendered page is a file named after its code, and filesystems stop at 255
  // bytes. Said out loud here because the alternative is a build that fails on a
  // filename with nothing to connect it to the number of flags.
  if (codes.some(codeIsOverlong)) {
    console.warn(
      `[flags] precomputed codes are ${Math.max(...codes.map((c) => c.length))} characters; ` +
        'approaching the filename limit — a compact encoding is needed before adding more flags',
    )
  }

  return routing.locales.flatMap((locale) =>
    codes.flatMap((code) => pages.map((slug) => ({ locale, code, slug: [slug] }))),
  )
}

/**
 * `dynamicParams` is left at its default of `true`, deliberately. A code outside the
 * prebuilt set — the flag list changed, someone pasted an old URL — renders on demand
 * rather than 404ing, and `getPrecomputed` verifies the signature, so an unknown code
 * is either a valid combination we did not prebuild or it is rejected.
 */

/**
 * Lets the on-demand branch of that fallback block instead of failing.
 *
 * This route is prerendered per decision, and for any code in the prebuilt set nothing
 * here applies — those pages are files on disk and this export changes nothing about
 * them. **It does not disable prerendering**; it only exempts the segment from
 * instant-navigation validation, so the route still prerenders wherever it can.
 *
 * What it buys is the other half of `dynamicParams`. A code that was never prebuilt has
 * to render at request time, and that render legitimately depends on data no shell can
 * carry. Without this, any such request 500s instead of rendering — which is not a
 * degraded fallback, it is a broken one, and `getPagesSlugs`' cap of 1 means almost
 * every page takes that path in production.
 *
 * Deliberately paired with, not instead of, fixing the reads themselves: the ruleset's
 * failure profile no longer produces a dynamic hole (see `getRuleset`), and the locale
 * is passed into `RenderBlocks` rather than read mid-render. This is the backstop for
 * whatever is left, because a 500 on the home page is a worse failure than a
 * non-instant navigation.
 */
export const instant = false

/**
 * Decodes the segment into the precomputed flag values.
 *
 * **`params` is taken as a promise and resolved in here, and that is not stylistic.**
 * Under Cache Components `params` counts as runtime data, so reading it in the page
 * body fails the prerender outright even though `generateStaticParams` enumerates
 * every value. Handing the unresolved promise to a `use cache` scope and awaiting it
 * inside is what keeps these pages static.
 *
 * `cacheLife('max')` because this is a pure function of the segment; without it the
 * scope inherits `default` and revalidates a pure function every fifteen minutes.
 *
 * The catch matters more than it looks. `getPrecomputed` throws on a segment that
 * does not verify, and unhandled that produces a 200 whose entire body is missing —
 * not a 500, not an error page. Falling back to the declared defaults renders the
 * base modules instead, which is the same answer a missing flag gets everywhere else.
 */
async function decode(params: Promise<Params>) {
  'use cache'
  cacheLife('max')

  const { code, ...rest } = await params
  const secret = process.env.FLAGS_SECRET

  const precomputed = secret ? await decodeCode(code, secret) : null

  // A code that does not verify is a stale link or a probe. Falling back to an empty
  // map sends every flag down the ordinary request-time path, which renders the right
  // page a slower way — rather than a 200 whose body is missing.
  if (!precomputed) console.warn('[flags] precomputed code did not verify')

  return { ...rest, code, precomputed: precomputed ?? {} }
}

/**
 * Resolves the page for this request, and only ever touches request-scoped data
 * behind the draft-mode check.
 *
 * `draftMode().isEnabled` is free to read during a prerender — Next only tracks
 * dynamic usage for `enable()`/`disable()`, and hands a prerender a null provider
 * whose `isEnabled` is always `false` (see
 * `next/dist/server/request/draft-mode.js`). So this resolves to the cached,
 * published page at build time and the route stays fully prerendered. Only
 * requests carrying the `__prerender_bypass` cookie fall into the preview branch,
 * which reads the auth cookie to decide what that account is allowed to see.
 *
 * That ordering is the whole trick: pull identity out before checking draft mode
 * and every anonymous visitor would go dynamic too.
 */
const resolvePage = async (pageSlug: string, locale: string) => {
  const { isEnabled: draft } = await draftMode()
  const slug = getDBSlug(pageSlug)

  const page = draft ? await getPreviewPage(slug, locale) : await getPage(slug, locale)

  return { draft, page }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> => {
  const { locale, slug } = await params

  const { page } = await resolvePage(slug?.[0] ?? '', locale)

  const title = page?.meta?.title || page?.title
  const description = page?.meta?.description
  const image = getImageUrl(page?.meta?.image)

  return { title, description, ...(image && { openGraph: { images: [image] } }) }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug, precomputed, code } = await decode(params)
  setRequestLocale(locale)

  const { draft, page } = await resolvePage(slug?.[0] ?? '', locale)

  // In the preview branch this also covers the stage gate: a tester requesting a
  // page above their granted stages gets no document back from `canReadStaged` and
  // no published version to fall back on, so they get a 404 rather than a 403
  // confirming it exists.
  if (!page) notFound()

  return (
    <>
      {draft && (
        <>
          <LivePreviewListener />
          <StageBanner stage={page.stage} status={page._status} />
        </>
      )}
      <RenderBlocks data={page.layout} precomputed={precomputed} code={code} locale={locale} />
    </>
  )
}
