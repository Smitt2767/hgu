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
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      localized: true,
    },
    {
      name: 'type',
      type: 'radio',
      admin: {
        layout: 'horizontal',
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
        {
          label: 'Static page',
          value: 'static',
        },
      ],
    },
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'videos', 'articles'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
      localized: true,
    },
    {
      name: 'staticPage',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'static',
      },
      label: 'Static Page',
      required: true,
      options: [
        {
          label: 'Videos',
          value: '/videos',
        },
        {
          label: 'Articles',
          value: '/articles',
        },
      ],
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
    },
  ],
}
