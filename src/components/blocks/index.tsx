import { readAttributes } from '@/flags/attributes'
import { buildCatalog, isUrlDetermined } from '@/flags/catalog'
import { evaluateValueWith } from '@/flags/evaluate'
import { applyFlag, flagOf, type FlagConfig } from '@/flags/modules'
import { getRuleset } from '@/flags/ruleset'
import { Article, Page, Template, Video } from '@/payload-types'
import { getLocale } from 'next-intl/server'
import { BlockType, GetBlockProps } from '@/types/blocks'
import { ComponentType, Suspense } from 'react'
import Accordion from './accordion'
import Alpha from './alpha'
import AlphaIFrame from './alpha-iframe'
import AnimatedQuote from './animated-quote'
import ArticleCarousel from './article-carousel'
import CardCarousel from './card-carousel'
import CTA from './cta'
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
export default async function RenderBlocks({ data, precomputed }: RenderBlocksProps) {
  const hasBlocks = data && Array.isArray(data) && data.length > 0

  if (!hasBlocks) return null

  // Only pay for either of these when something on this page actually uses them.
  const flagged = data.some((block) => flagOf(block))

  // `getLocale` is safe to read while prerendering *because* every page calls
  // `setRequestLocale` first — next-intl then returns that cached value and never
  // touches `headers()`. Drop that call from a page and this silently becomes a
  // dynamic read, taking the whole route out of its prerender.
  const [ruleset, locale] = flagged
    ? await Promise.all([getRuleset(), getLocale()])
    : [null, undefined]

  const catalog = buildCatalog(ruleset)

  return data.map((block) => {
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
