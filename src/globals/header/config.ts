import { canRead, canUpdate } from '@/access'
import { GlobalConfig } from 'payload'
import { link } from '../utils/links'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    description: 'Manage the site header navigation links.',
  },
  access: {
    read: canRead,
    update: canUpdate,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [link()],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/header/components/RowLabel#RowLabel',
        },
      },
    },
  ],
}
