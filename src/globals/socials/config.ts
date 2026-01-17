import { canRead, canUpdate } from '@/access'
import { GlobalConfig } from 'payload'

export const Socials: GlobalConfig = {
  slug: 'socials',
  admin: {
    description: 'Configure social media links and icons displayed across the site.',
  },
  access: {
    read: canRead,
    update: canUpdate,
  },
  fields: [
    {
      type: 'array',
      name: 'links',
      fields: [
        {
          type: 'select',
          name: 'platform',
          label: 'Platform',
          options: ['Facebook', 'X', 'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Telegram'],
          required: true,
        },
        { type: 'text', name: 'url', label: 'URL', required: true },
        {
          type: 'upload',
          name: 'icon',
          relationTo: 'media',
          hasMany: false,
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/socials/components/RowLabel#RowLabel',
        },
      },
    },
  ],
}
