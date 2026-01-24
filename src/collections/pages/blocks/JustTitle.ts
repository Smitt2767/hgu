import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const JustTitle: Block = {
  slug: 'justTitle',
  imageURL: '/images/just-title.png',
  labels: {
    singular: 'Just Title',
    plural: 'Just Title',
  },
  fields: [
    {
      name: 'titleText',
      type: 'text',
      required: true,
      label: 'Title Text',
      admin: {
        description:
          'The heading text to display. Supports branded color highlighting via the Branded Words field.',
      },
    },
    {
      name: 'headingLevel',
      type: 'radio',
      label: 'Heading Level',
      required: true,
      defaultValue: 'h1',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description:
          'Choose H1 through H3 to set the semantic heading level and size. H1 is largest, H3 is smallest.',
      },
    },
    {
      name: 'fontFamily',
      type: 'radio',
      label: 'Font Family',
      required: true,
      defaultValue: 'oswald',
      options: [
        { label: 'Oswald', value: 'oswald' },
        { label: 'Merriweather', value: 'merriweather' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description:
          'Select Oswald (sans-serif, bold) or Merriweather (serif, elegant) for the title text.',
      },
    },
    {
      name: 'textAlignment',
      type: 'radio',
      label: 'Text Alignment',
      defaultValue: 'center',
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
      defaultValue: '#FFFFFF',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color value (e.g. #FFFFFF)',
      },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      admin: {
        description:
          'Words to highlight in the primary brand color. Enter words separated by commas to emphasize key phrases.',
      },
    },
  ],
}
