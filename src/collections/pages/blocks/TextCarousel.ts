import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const TextCarousel: Block = {
  slug: 'textCarousel',
  imageURL: '/images/text-carousel.png',
  labels: {
    singular: 'Text Carousel',
    plural: 'Text Carousel',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      label: 'Header',
      admin: {
        description: 'Optional section title displayed above the carousel.',
      },
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'slideTitle',
          type: 'text',
          label: 'Slide Title',
          admin: {
            description:
              'The title for each text slide. Can be hidden per slide using Show Title toggle.',
          },
        },
        {
          name: 'showTitle',
          type: 'radio',
          label: 'Show Title',
          defaultValue: 'on',
          options: [
            { label: 'On', value: 'on' },
            { label: 'Off', value: 'off' },
          ],
          admin: {
            layout: 'horizontal',
            description: 'Toggle to show or hide the title for this specific slide.',
          },
        },
        {
          name: 'slideBody',
          type: 'richText',
          label: 'Slide Body',
          required: true,
          admin: {
            description: 'Rich text content for each slide. Supports formatting, links, and lists.',
          },
        },
        {
          name: 'backgroundType',
          type: 'select',
          label: 'Background Type',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Color', value: 'color' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          admin: {
            description:
              'Choose "None" for transparent, "Color" for solid gray, "Image" for a background image, or "Video" for animated video background. Each slide can have a different background.',
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
              'Hex color for the slide background when Background Type is "Color". Defaults to dark gray (#1a1a1a).',
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
            description: 'Image shown behind slide content when Background Type is "Image".',
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
            description:
              'Looping video shown behind slide content when Background Type is "Video".',
            condition: (_, siblingData) => siblingData?.backgroundType === 'video',
          },
        },
      ],
    },
    {
      name: 'horizontalScrollPath',
      type: 'radio',
      label: 'Horizontal Scroll Path',
      defaultValue: 'off',
      options: [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'titleColor',
      type: 'text',
      label: 'Title Color',
      defaultValue: '#ffffff',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color for slide titles. Defaults to white (#ffffff).',
      },
    },
    {
      name: 'subtextColor',
      type: 'text',
      label: 'Subtext Color',
      defaultValue: '#9ca3af',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color for slide body text. Defaults to gray (#9ca3af).',
      },
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      label: 'Desktop Aspect Ratio',
      defaultValue: '4:5',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description:
          'Select 4:5 (tall) or 9:16 (full tall) for the slide aspect ratio on desktop screens.',
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
        description:
          'Select 4:5 (tall) or 9:16 (full tall) for the slide aspect ratio on mobile screens.',
      },
    },
  ],
}
