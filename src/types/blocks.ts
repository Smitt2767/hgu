import { Page } from '@/payload-types'

export type BlockType = NonNullable<Page['layout']>[0]['blockType']

export type GetBlockProps<T extends BlockType> = Extract<
  NonNullable<Page['layout']>[0],
  { blockType: T }
>
