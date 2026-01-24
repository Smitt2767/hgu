import { canCreate, canDelete, canRead, canUpdate } from '@/access'
import { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    description: 'Manage website and external links.',
  },
  access: {
    read: canRead,
    update: canUpdate,
    delete: canDelete,
    create: canCreate,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
          localized: true,
        },
        {
          name: 'type',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            width: '50%',
          },
          defaultValue: 'reference',
          options: [
            {
              label: 'Internal link',
              value: 'reference',
            },
            {
              label: 'Custom URL',
              value: 'custom',
            },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            width: '50%',
            style: { alignSelf: 'center' },
          },
          label: 'Open in new tab',
        },
        {
          name: 'reference',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
            width: '50%',
          },
          label: 'Document to link to',
          relationTo: ['pages'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            width: '50%',
          },
          label: 'Custom URL',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
