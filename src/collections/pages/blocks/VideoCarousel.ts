import { Block } from 'payload'

export const VideoCarousel: Block = {
  slug: 'videoCarousel',
  imageURL: '/images/video-carousel.png',
  labels: {
    singular: 'Video Carousel',
    plural: 'Video Carousel',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'videos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      required: true,
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      defaultValue: '9:16',
      options: [
        { label: '9:16', value: '9:16' },
        { label: '16:9', value: '16:9' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      defaultValue: '9:16',
      options: [
        { label: '9:16', value: '9:16' },
        { label: '16:9', value: '16:9' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'horizontalScrollPath',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showHeader',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showVideoTitles',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
