import { canRead, canUpdate } from '@/access'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    description: 'Manage the site footer including copyright text and navigation links.',
  },
  access: {
    read: canRead,
    update: canUpdate,
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
        components: {
          RowLabel: '@/globals/footer/components/RowLabel#RowLabel',
        },
      },
    },
  ],
}
