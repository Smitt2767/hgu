import { Block } from 'payload'

export const TakeOver: Block = {
  slug: 'takeOver',
  imageURL: '/images/take-over.png',
  labels: {
    singular: 'Take Over',
    plural: 'Take Over',
  },
  fields: [
    {
      name: 'media',
      type: 'radio',
      label: 'Media',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'video',
      type: 'upload',
      label: 'Video',
      required: true,
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        description:
          'Full-screen video for the takeover experience. Desktop uses 16:9 (horizontal), Mobile uses 9:16 (vertical).',
        condition: (_, siblingData) => siblingData?.media === 'video',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      required: true,
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description:
          'Background image for the takeover. Desktop uses 16:9 (horizontal), Mobile uses 9:16 (vertical).',
        condition: (_, siblingData) => siblingData?.media === 'image',
      },
    },
    {
      name: 'replayWithAudio',
      type: 'checkbox',
      label: 'Replay With Audio',
      defaultValue: false,
      admin: {
        description: 'Button to replay the video with audio enabled.',
        condition: (_, siblingData) => siblingData?.media === 'video',
      },
    },
  ],
}
