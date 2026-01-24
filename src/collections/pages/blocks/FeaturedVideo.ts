import { Block } from 'payload'

export const FeaturedVideo: Block = {
  slug: 'featuredVideo',
  imageURL: '/images/featured-video.png',
  labels: {
    singular: 'Featured Video',
    plural: 'Featured Video',
  },
  fields: [
    {
      name: 'video',
      type: 'relationship',
      relationTo: 'videos',
      required: true,
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      defaultValue: '9:16',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
