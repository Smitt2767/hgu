import { Block } from 'payload'

export const PauseExperience: Block = {
  slug: 'pauseExperience',
  imageURL: '/images/blocks/pause-experience.png',
  labels: {
    singular: 'Pause Experience',
    plural: 'Pause Experience',
  },
  fields: [
    {
      name: 'introLines',
      type: 'array',
      label: 'Intro Lines',
      fields: [
        {
          name: 'line',
          type: 'text',
          localized: true,
          label: 'Line',
        },
      ],
      admin: {
        description:
          'Array of intro lines displayed before the play button. Each line appears on its own row.',
      },
    },
    {
      name: 'subText',
      type: 'text',
      localized: true,
      label: 'Sub Text',
      admin: {
        description: "Secondary instruction (e.g., 'Press play to begin').",
      },
    },
    {
      name: 'showSubText',
      type: 'radio',
      label: 'Sub Text',
      defaultValue: 'show',
      options: [
        { label: 'Show', value: 'show' },
        { label: 'Hide', value: 'hide' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'scenes',
      type: 'array',
      label: 'Scenes',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'richText',
          localized: true,
          label: 'Title',
          admin: {
            description:
              'Rich text title with branded color highlighting. Use HTML spans for yellow: <span style="color: #feda00">word</span>',
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
          label: 'Quote',
          admin: {
            description: 'Italic text displayed in the scene.',
          },
        },
        {
          name: 'body',
          type: 'richText',
          localized: true,
          label: 'Body',
          admin: {
            description: 'Rich text body content with line breaks.',
          },
        },
      ],
      admin: {
        description:
          'Array of scene objects. Each scene has: Title (rich text with yellow highlighting), Quote (italic text), and Body (rich text with line breaks). Use HTML spans for yellow: <span style="color: #feda00">word</span>',
      },
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration',
      defaultValue: 60,
      admin: {
        description:
          'Total timer length in seconds. Default is 60 seconds. Time is distributed across all scenes.',
      },
    },
    {
      name: 'animationSpeed',
      type: 'number',
      label: 'Animation Speed',
      defaultValue: 1.0,
      admin: {
        description:
          'Controls the pace of word-by-word animation. Default: 1.0. Range: 0.1 (slower) to 3.0 (faster). Higher values make words appear faster.',
      },
    },
    {
      name: 'backgroundType',
      type: 'radio',
      label: 'Background',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description:
          'Ambient background for the experience. Can be image or looping video. Video plays silently.',
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
        condition: (_, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      label: 'Desktop Aspect Ratio',
      defaultValue: '16:9',
      options: [{ label: '16:9', value: '16:9' }],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      label: 'Mobile Aspect Ratio',
      defaultValue: '9:16',
      options: [{ label: '9:16', value: '9:16' }],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
  ],
}
