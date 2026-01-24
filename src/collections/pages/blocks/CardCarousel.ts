import { Block } from 'payload'

export const CardCarousel: Block = {
  slug: 'cardCarousel',
  imageURL: '/images/card-carousel.png',
  labels: {
    singular: 'Card Carousel',
    plural: 'Card Carousel',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
      label: 'Header',
      admin: {
        description: 'Optional section title displayed above the carousel.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'mediaType',
          type: 'radio',
          label: 'Media Type',
          required: true,
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          admin: {
            layout: 'horizontal',
            description:
              'Choose between Image or Video for the card media. NOTE: Videos play with NO OVERLAY - content displays raw without any dimming or color treatment.',
          },
        },
        {
          name: 'cardImage',
          type: 'upload',
          label: 'Card Image',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description: 'The image for each card. Only used when Media Type is "Image".',
            condition: (_, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'cardVideo',
          type: 'upload',
          label: 'Card Video',
          relationTo: 'media',
          filterOptions: {
            mimeType: { contains: 'video' },
          },
          admin: {
            description:
              'The video for each card. Only used when Media Type is "Video". Loops automatically, plays muted. NOTE: No overlay is applied - video displays raw.',
            condition: (_, siblingData) => siblingData?.mediaType === 'video',
          },
        },
        {
          name: 'modalContent',
          type: 'richText',
          localized: true,
          label: 'Modal Content',
          required: true,
          admin: {
            description: 'Rich text content shown in the popup when a card is clicked.',
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
      name: 'desktopAspectRatio',
      type: 'radio',
      label: 'Desktop Aspect Ratio',
      required: true,
      defaultValue: '4:5',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description: 'Aspect ratio for cards on desktop. Choose 16:9 (wide) or 4:3 (standard).',
      },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      label: 'Mobile Aspect Ratio',
      required: true,
      defaultValue: '4:5',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description: 'Aspect ratio for cards on mobile. Choose 4:5 (tall) or 9:16 (full tall).',
      },
    },
  ],
}
