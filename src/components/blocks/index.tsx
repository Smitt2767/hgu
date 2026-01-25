import { Page } from '@/payload-types'
import { BlockType, GetBlockProps } from '@/types/blocks'
import { ComponentType } from 'react'
import Accordion from './accordion'
import Alpha from './alpha'
import AlphaIFrame from './alpha-iframe'
import AnimatedQuote from './animated-quote'
import CTA from './cta'
import FeaturedImage from './featured-image'
import FeaturedVideo from './featured-video'
import JustTitle from './just-title'
import ParagraphText from './paragraph-text'
import SocialShare from './social-share'
import TakeOver from './take-over'

type RenderBlocksProps = {
  data: Page['layout']
}

const blockComponents: Partial<{
  [K in BlockType]: ComponentType<GetBlockProps<K>>
}> = {
  accordion: Accordion,
  alpha: Alpha,
  alphaIframe: AlphaIFrame,
  justTitle: JustTitle,
  paragraphText: ParagraphText,
  featuredImage: FeaturedImage,
  cta: CTA,
  animatedQuote: AnimatedQuote,
  takeOver: TakeOver,
  socialShare: SocialShare,
  featuredVideo: FeaturedVideo,
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
