import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const ParagraphText: Block = {
  slug: 'paragraphText',
  labels: {
    singular: 'Paragraph Text',
    plural: 'Paragraph Text',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
      admin: {
        description:
          'Rich text content. Uses Merriweather font by default (can be overridden in Payload). Supports yellow highlighting for emphasis.',
      },
    },
    {
      name: 'textSize',
      type: 'radio',
      label: 'Text Size',
      defaultValue: 'body',
      options: [
        { label: 'Body', value: 'body' },
        { label: 'Small Text', value: 'smallText' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description: 'Body (larger, default) or Small Text for secondary content.',
      },
    },
    {
      name: 'textAlignment',
      type: 'radio',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#d1d5db',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color value (e.g. #d1d5db)',
      },
    },
    {
      name: 'brandedWords',
      type: 'text',
      label: 'Branded Words',
      admin: {
        description:
          'Words to highlight in the primary brand color. Enter words separated by commas to emphasize key phrases.',
      },
    },
  ],
}
