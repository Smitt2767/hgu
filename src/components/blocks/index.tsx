import { readAttributes } from '@/flags/attributes'
import { buildCatalog, isUrlDetermined } from '@/flags/catalog'
import { evaluateValueWith } from '@/flags/evaluate'
import { applyFlag, flagOf, type FlagConfig } from '@/flags/modules'
import { getRuleset } from '@/flags/ruleset'
import { Article, Page, Template, Video } from '@/payload-types'
import { BlockType, GetBlockProps } from '@/types/blocks'
import { ComponentType, Suspense } from 'react'
import Accordion from './accordion'
import Alpha from './alpha'
import AlphaIFrame from './alpha-iframe'
import AnimatedQuote from './animated-quote'
import ArticleCarousel from './article-carousel'
import CardCarousel from './card-carousel'
import CTA from './cta'
import ExposureBeacon from './exposure'
import FeaturedArticle from './featured-article'
import FeaturedImage from './featured-image'
import FeaturedVideo from './featured-video'
import JustText from './just-text'
import JustTitle from './just-title'
import ParagraphText from './paragraph-text'
import ModuleSkeleton from './skeleton'
import SocialShare from './social-share'
import TakeOver from './take-over'
import TextCarousel from './text-carousel'
import VideoCarousel from './video-carousel'

// Union of all layout types from different collections
type LayoutData = Page['layout'] | Template['layout'] | Video['layout'] | Article['layout']

type RenderBlocksProps = {
  data: LayoutData
  /**
   * Flag values already decided by proxy and decoded from the URL segment.
   *
   * Only the pages catch-all carries these — it is the route proxy rewrites. Any key
   * present here is answered without evaluating anything, because the page was built
   * for exactly this combination.
   */
  precomputed?: Record<string, unknown>
  /**
   * The signed segment this page was rendered under, where there is one.
   *
   * Passed through solely so the exposure beacon can hand it back. The browser cannot
   * read it for itself — proxy rewrites without touching the address bar — and it is
   * signed, so the route that receives it can trust what it says was rendered.
   */
  code?: string
  /**
   * The locale being rendered, passed in rather than looked up.
   *
   * This used to be `await getLocale()` right here, which only avoided reading
   * `headers()` because some ancestor had already primed next-intl's request-locale
   * cache via `setRequestLocale` — an ordering nothing enforced. When it did not hold,
   * the read became runtime data outside `<Suspense>` and took the entire route out of
   * its prerender, reporting "uncached or runtime data during prerendering" against
   * this component rather than against the missing call.
   *
   * Every caller already resolved the locale to fetch its own content, so passing it is
   * both cheaper and impossible to get wrong. A prop cannot silently become a request
   * read.
   */
  locale?: string
}

const blockComponents: Partial<{
  [K in BlockType]: ComponentType<GetBlockProps<K>>
}> = {
  accordion: Accordion,
  alpha: Alpha,
  alphaIframe: AlphaIFrame,
  animatedQuote: AnimatedQuote,
  articleCarousel: ArticleCarousel,
  cardCarousel: CardCarousel,
  cta: CTA,
  featuredArticle: FeaturedArticle,
  featuredImage: FeaturedImage,
  featuredVideo: FeaturedVideo,
  justText: JustText,
  justTitle: JustTitle,
  paragraphText: ParagraphText,
  socialShare: SocialShare,
  takeOver: TakeOver,
  textCarousel: TextCarousel,
  videoCarousel: VideoCarousel,
}

type LayoutBlock = NonNullable<LayoutData>[number]

/**
 * The only place a feature flag is read.
 *
 * Every block component below is untouched by this and stays that way: it receives
 * resolved props and never learns a flag exists. That is what stops flag checks
 * leaking into seventeen components and becoming impossible to remove.
 *
 * The interesting part is *where* each decision happens, which is not the same for
 * every flag:
 *
 * - **No flag** — rendered exactly as before, and no ruleset is fetched at all, so
 *   pages with no flagged module gain no new dependency and no new cache entry.
 * - **A flag the URL already answers** — either it targets nothing, so everyone gets
 *   the same value, or it targets only what the routing encodes. Decided right here,
 *   with no request data read at all: the module ships in the first HTML response
 *   and the page stays fully prerendered.
 * - **A flag that targets the visitor** — needs attributes the URL does not carry, so
 *   it moves behind `<Suspense>` and streams. The rest of the page still prerenders.
 *
 * Both halves come from the ruleset itself, so a rule added in GrowthBook moves a
 * module between them with no code change and no deploy — the same derivation
 * `/api/flags/catalog` reports to the admin.
 *
 * Note the asymmetry that makes the second bullet worth stating carefully: a flag
 * targeting `audience` is *classified* prerenderable, but nothing in the URL answers
 * it until proxy encodes it, so it streams today. `isUrlDetermined` is what keeps
 * those two ideas apart.
 */
export default async function RenderBlocks({
  data,
  precomputed,
  code,
  locale,
}: RenderBlocksProps) {
  const hasBlocks = data && Array.isArray(data) && data.length > 0

  if (!hasBlocks) return null

  // Only pay for either of these when something on this page actually uses them.
  const flagged = data.some((block) => flagOf(block))

  const ruleset = flagged ? await getRuleset() : null

  const catalog = buildCatalog(ruleset)

  /**
   * Experiments whose module is on this page and whose variant the URL already carries.
   *
   * Collected up front so one beacon covers the page: a flag used by two blocks is one
   * exposure, not two, and one request rather than two against an endpoint that rate
   * limits.
   *
   * Membership is "present in the layout", not "rendered". A variant that hides its
   * module still exposed the visitor, and excluding that arm would bias the comparison
   * much harder than including it.
   *
   * Only precomputed flags qualify. A streamed flag is decided inside `TargetedBlock`,
   * which runs per request, so its exposure has somewhere honest to happen already and
   * does not need the round trip.
   */
  const exposureKeys = [
    ...new Set(
      data
        .map((block) => flagOf(block)?.key)
        .filter((key): key is string => Boolean(key && precomputed && key in precomputed))
        .filter((key) => catalog.some((entry) => entry.key === key && entry.hasExperiment)),
    ),
  ]

  const rendered = data.map((block) => {
    const flag = flagOf(block)

    if (!flag) return renderBlock(block, block.id)

    // Already decided, before this render started. Proxy resolved every precomputed
    // flag against the full attribute set and encoded the answer into the URL, so
    // this page *is* the page for that answer — there is nothing left to evaluate and
    // nothing to stream, whatever the flag targets.
    if (precomputed && flag.key in precomputed) {
      return renderBlock(applyFlag(block, flag, precomputed[flag.key]), block.id)
    }

    const entry = catalog.find((candidate) => candidate.key === flag.key)

    // Not precomputed, but still answerable from the URL: a flag with no rules is the
    // same for everyone, and one targeting only `locale` is settled by the path. An
    // unknown flag lands here too and resolves to the base module, so a GrowthBook
    // outage cannot drag every flagged page out of its prerender.
    if (!entry || isUrlDetermined(entry, ['locale'])) {
      // Only what this route carries. Handing the evaluator anything else would put a
      // per-visitor answer into a response that everyone shares.
      const value = evaluateValueWith(ruleset, flag.key, { locale })
      return renderBlock(applyFlag(block, flag, value), block.id)
    }

    return (
      <Suspense key={block.id} fallback={<ModuleSkeleton />}>
        <TargetedBlock block={block} flag={flag} />
      </Suspense>
    )
  })

  // `locale` is non-null whenever a key survived above, since both require a flag on
  // the page — narrowed rather than asserted so that stays true if the guard moves.
  if (!code || !locale || !exposureKeys.length) return rendered

  return (
    <>
      {rendered}
      <ExposureBeacon code={code} keys={exposureKeys} locale={locale} />
    </>
  )
}

/**
 * A module whose flag targets the visitor, resolved per request.
 *
 * Nothing here may be cached: `readAttributes` reads cookies and headers, and a
 * shared cache entry keyed on one visitor's attributes would serve their answer to
 * whoever landed on it next.
 *
 * The fallback is a neutral skeleton, never the base module. Rendering the base and
 * then replacing it would flash content the flag exists to suppress — worst of all
 * for a kill switch, which would briefly show the thing it was turned off to hide.
 * The skeleton says "something is coming" without saying what, and reserves space so
 * the page does not jump.
 *
 * It is still a placeholder for a module that may turn out not to render at all, so
 * the space collapses in that case. That is the honest cost of deciding at request
 * time; a module that cannot afford it belongs in the precompute tier, where the
 * decision is made before the render starts.
 */
async function TargetedBlock({ block, flag }: { block: LayoutBlock; flag: FlagConfig }) {
  const [ruleset, attributes] = await Promise.all([getRuleset(), readAttributes()])
  const value = evaluateValueWith(ruleset, flag.key, attributes)

  return renderBlock(applyFlag(block, flag, value), null)
}

function renderBlock(block: LayoutBlock | null, key: string | null | undefined) {
  if (!block) return null

  const Block = blockComponents[block.blockType] as ComponentType<typeof block> | undefined

  return Block ? <Block {...block} key={key} /> : null
}
