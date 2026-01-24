import { Page } from '@/payload-types'

type RenderBlocksProps = {
  data: Page['layout']
}

const blockComponents = {}

export default function RenderBlocks({ data }: RenderBlocksProps) {
  const hasBlocks = data && Array.isArray(data) && data.length > 0

  if (!hasBlocks) return null

  return data.map((block) => {
    // const { blockType } = block

    // if (blockType && blockType in blockComponents) {
    //   const Block = blockComponents[blockType]

    //   /* @ts-expect-error There may be some mismatch between the expected types here */
    //   return <Block {...block} key={block.id} />
    // }

    return null
  })
}
