import { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQ',
  labels: { plural: "FAQ's", singular: 'FAQ' },
  fields: [
    {
      type: 'group',
      label: 'Config',
      fields: [
        {
          label: 'Question & Answers',
          type: 'array',
          name: 'data',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'question',
                  label: 'Question',
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'textarea',
                  name: 'answer',
                  label: 'Answer',
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
          admin: {
            components: {
              RowLabel: '@/collections/pages/blocks/components/FAQRawLabel#RowLabel',
            },
          },
        },
      ],
    },
  ],
}
