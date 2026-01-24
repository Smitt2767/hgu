import { Block } from 'payload'

export const FeaturedImage: Block = {
  slug: 'featuredImage',
  labels: {
    singular: 'Featured Image',
    plural: 'Featured Image',
  },
  fields: [
    {
      name: 'desktopImage',
      type: 'upload',
      required: true,
      label: 'Desktop Image',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description:
          'The image displayed on desktop/tablet screens. Will scale to full width of the content area.',
      },
    },
    {
      name: 'mobileImage',
      type: 'upload',
      required: true,
      label: 'Mobile Image',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description:
          'The image displayed on mobile screens. Can be cropped differently to focus on key elements for smaller screens.',
      },
    },
    {
      name: 'altText',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility. Screen readers will read this text.',
      },
    },
    {
      name: 'caption',
      type: 'radio',
      label: 'Caption',
      defaultValue: 'on',
      options: [
        { label: 'Caption On', value: 'on' },
        { label: 'Caption Off', value: 'off' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'captionText',
      type: 'text',
      label: 'Caption Text',
      admin: {
        description: 'Optional text displayed below the image to provide context.',
        condition: (_, siblingData) => siblingData?.caption === 'on',
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
