import { readAttributes } from '@/flags/attributes'
import { buildCatalog } from '@/flags/catalog'
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
 * - **A flag with no targeting** — the same answer for every visitor on Earth, so it
 *   is decided right here from the cached ruleset, with no request data touched. The
 *   page stays fully prerendered; a kill switch costs nothing.
 * - **A flag that targets anything** — needs the visitor's attributes, so it moves
 *   behind `<Suspense>` and streams. The rest of the page still prerenders.
 *
 * The tier comes from the ruleset itself, so adding a targeting rule in GrowthBook
 * moves a module from the shell into a streamed region with no code change and no
 * deploy — the same derivation `/api/flags/catalog` reports to the admin.
 */
export default async function RenderBlocks({ data }: RenderBlocksProps) {
  const hasBlocks = data && Array.isArray(data) && data.length > 0

  if (!hasBlocks) return null

  // Only pay for the ruleset when something on this page actually uses it.
  const ruleset = data.some((block) => flagOf(block)) ? await getRuleset() : null
  const catalog = buildCatalog(ruleset)

  return data.map((block) => {
    const flag = flagOf(block)

    if (!flag) return renderBlock(block, block.id)

    // An unknown flag is treated as untargeted rather than streamed. It resolves to
    // no value and therefore to the base module, and doing that in the shell means a
    // GrowthBook outage cannot drag every flagged page out of its prerender.
    const tier = catalog.find((entry) => entry.key === flag.key)?.tier ?? 'static'

    if (tier === 'static') {
      const value = evaluateValueWith(ruleset, flag.key, {})
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
