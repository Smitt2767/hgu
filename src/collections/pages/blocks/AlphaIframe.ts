import { Block } from 'payload'

export const AlphaIframe: Block = {
  slug: 'alphaIframe',
  labels: {
    singular: 'Alpha Iframe',
    plural: 'Alpha Iframe',
  },
  fields: [
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
