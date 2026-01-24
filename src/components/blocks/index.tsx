import { Page } from '@/payload-types'
import { BlockType, GetBlockProps } from '@/types/blocks'
import { ComponentType } from 'react'
import Accordion from './accordion'

type RenderBlocksProps = {
  data: Page['layout']
}

const blockComponents: Partial<{
  [K in BlockType]: ComponentType<GetBlockProps<K>>
}> = {
  accordion: Accordion,
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
