import { Block } from 'payload'

export const HTML: Block = {
  interfaceName: 'HTML',
  labels: { plural: 'HTML', singular: 'HTML' },
  slug: 'html',
  fields: [
    {
      type: 'group',
      label: 'Config',
      fields: [
        {
          type: 'richText',
          name: 'content',
          label: 'Content',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
