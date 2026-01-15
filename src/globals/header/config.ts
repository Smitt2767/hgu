import { GlobalConfig } from 'payload'
import { link } from '../utils/links'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [link()],
      maxRows: 6,
      admin: {
        components: {
          RowLabel: '@/globals/header/components/RowLabel#RowLabel',
        },
      },
    },
  ],
}
