import { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'Quote',
  fields: [
    {
      type: 'textarea',
      name: 'quote',
      label: 'Quote',
      required: true,
      localized: true,
      admin: {
        rows: 3,
      },
    },
    {
      type: 'text',
      name: 'author',
      label: 'Author',
      required: true,
      localized: true,
    },
  ],
}
