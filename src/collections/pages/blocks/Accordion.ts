import { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  imageURL: '/images/accordion.png',
  labels: {
    singular: 'Accordion',
    plural: 'Accordion',
  },
  fields: [
    {
      name: 'headerText',
      type: 'text',
      label: 'Header Text',
      admin: {
        description:
          'Optional title displayed above the accordion section. Set the context for the items below.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'questionText',
          type: 'text',
          label: 'Question Text',
          required: true,
          admin: {
            description:
              'The question displayed in the accordion header. Keep it clear and concise.',
          },
        },
        {
          name: 'answerText',
          type: 'richText',
          label: 'Answer Text',
          required: true,
          admin: {
            description:
              'Rich text answer revealed when the question is clicked. Can include formatting, links, and lists.',
          },
        },
      ],
    },
  ],
}
