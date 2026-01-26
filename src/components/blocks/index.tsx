import { Article, Page, Template, Video } from '@/payload-types'
import { BlockType, GetBlockProps } from '@/types/blocks'
import { ComponentType } from 'react'
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

export default function RenderBlocks({ data }: RenderBlocksProps) {
  const hasBlocks = data && Array.isArray(data) && data.length > 0

  if (!hasBlocks) return null

  return data.map((block) => {
    const { blockType } = block
    const Block = blockComponents[blockType] as ComponentType<typeof block> | undefined

    if (Block) {
      return <Block {...block} key={block.id} />
    }

    return null
  })
}
