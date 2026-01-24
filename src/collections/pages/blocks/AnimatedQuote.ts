import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const AnimatedQuote: Block = {
  slug: 'animatedQuote',
  imageURL: '/images/blocks/animated-quote.png',
  labels: {
    singular: 'Animated Quote',
    plural: 'Animated Quote',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Quote',
      admin: {
        description: 'The quote text. Words will animate in one by one as user scrolls.',
      },
    },
    {
      name: 'highlightedWords',
      type: 'text',
      localized: true,
      label: 'Highlighted Words',
      admin: {
        description:
          'Words to highlight in the primary brand color. Enter words separated by commas to emphasize key phrases.',
      },
    },
    {
      name: 'author',
      type: 'text',
      localized: true,
      label: 'Author',
      admin: {
        description: 'Name of the person being quoted.',
      },
    },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      defaultValue: 'video',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        description:
          'Choose "None" for no background, "Color" for solid gray, "Image" for a background image, or "Video" for animated video background.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#1a1a1a',
      validate: validateColor,
      admin: {
        description:
          'Hex color for the section background when Background Type is "Color". Defaults to dark gray (#1a1a1a).',
        condition: (_, siblingData) => siblingData?.backgroundType === 'color',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Image behind the CTA section when Background Type is "Image".',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: 'Background Video',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        description: 'Looping video behind the CTA section when Background Type is "Video".',
        condition: (_, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      label: 'Desktop Aspect Ratio',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      label: 'Mobile Aspect Ratio',
      defaultValue: '4:5',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
  ],
}
