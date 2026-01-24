import { canRead, canUpdate } from '@/access'
import { GlobalConfig } from 'payload'

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
      fields: [
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'links',
          required: true,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
