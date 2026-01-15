import { GlobalConfig } from 'payload'
import { link } from '../utils/links'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
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
