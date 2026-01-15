import { GlobalConfig } from 'payload'
import { link } from '../utils/links'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
