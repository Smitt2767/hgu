import { Block } from 'payload'

export const SocialShare: Block = {
  slug: 'socialShare',
  imageURL: '/images/blocks/social-share.png',
  labels: {
    singular: 'Social Share',
    plural: 'Social Share',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Title',
      admin: {
        description:
          'Motivational text encouraging users to share. Example: "Think about someone right now, who might need this journey, and share it".',
      },
    },
    {
      name: 'showTitle',
      type: 'radio',
      label: 'Title',
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
      name: 'shareURL',
      type: 'text',
      label: 'Share URL',
      admin: {
        description: 'The URL to be shared. Defaults to current page URL if not specified.',
      },
    },
    {
      name: 'shareText',
      type: 'text',
      localized: true,
      label: 'Share Text',
      admin: {
        description: 'Default message text included when sharing via native share sheet.',
      },
    },
    {
      name: 'shareButton',
      type: 'text',
      localized: true,
      label: 'Share Button',
      required: true,
      admin: {
        description:
          'Single button that opens the native device share sheet (Web Share API). Falls back to copy link on unsupported browsers.',
      },
    },
  ],
}
