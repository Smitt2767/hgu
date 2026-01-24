import { Block } from 'payload'

export const Alpha: Block = {
  slug: 'alpha',
  imageURL: '/images/alpha.png',
  labels: {
    singular: 'Alpha',
    plural: 'Alpha',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Title',
      admin: {
        description: 'The main heading displayed above the button.',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Button Text',
      admin: {
        description: 'The label for the action button that reveals the group finder.',
      },
    },
    {
      name: 'showPoweredBy',
      type: 'checkbox',
      label: 'Show Powered By',
      defaultValue: true,
      admin: {
        description: 'Toggle to show or hide the "powered by alpha" branding tag.',
      },
    },
    {
      name: 'iframeHeader',
      type: 'text',
      localized: true,
      label: 'Iframe Header',
      admin: {
        description: 'Supporting text displayed above the Alpha group finder when it is expanded.',
      },
    },
    {
      name: 'iframeURL',
      type: 'text',
      label: 'Iframe URL',
      required: true,
      admin: {
        description: 'The URL for the Alpha group finder experience.',
      },
    },
  ],
}
