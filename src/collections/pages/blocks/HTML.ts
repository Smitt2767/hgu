import { Block } from 'payload'

export const HTML: Block = {
  interfaceName: 'HTML',
  slug: 'html',
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
      required: true,
      localized: true,
    },
  ],
}
