import { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQ',
  fields: [
    {
      label: 'Question & Answers',
      type: 'array',
      name: 'data',
      fields: [
        {
          type: 'text',
          name: 'question',
          label: 'Question',
          required: true,
          localized: true,
        },
        {
          type: 'textarea',
          name: 'answer',
          label: 'Answer',
          required: true,
          localized: true,
          admin: {
            rows: 3,
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/collections/pages/blocks/components/FAQRawLabel#RowLabel',
        },
      },
    },
  ],
}
