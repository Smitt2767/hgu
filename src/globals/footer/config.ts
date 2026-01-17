import { GlobalConfig } from 'payload'
import { link } from '../utils/links'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    description: 'Manage the site footer including copyright text and navigation links.',
  },
  fields: [
    {
      type: 'text',
      label: 'Copyright text',
      name: 'copyrightText',
      required: true,
      localized: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [link()],
      maxRows: 6,
      admin: {
        components: {
          RowLabel: '@/globals/footer/components/RowLabel#RowLabel',
        },
      },
    },
  ],
}
