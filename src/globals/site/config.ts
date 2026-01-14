import { GlobalConfig } from 'payload'

export const Site: GlobalConfig = {
  slug: 'site',
  fields: [
    {
      type: 'text',
      label: 'title',
      name: 'title',
      required: true,
    },
    {
      type: 'textarea',
      label: 'Description',
      name: 'description',
      required: true,
    },
    {
      type: 'upload',
      label: 'Logo',
      name: 'logo',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      type: 'upload',
      label: 'Favicon',
      name: 'favicon',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      type: 'upload',
      label: 'Default OG image',
      name: 'ogImage',
      relationTo: 'media',
      required: true,
      hasMany: false,
    },
    {
      type: 'checkbox',
      label: 'Maintenance Mode',
      name: 'maintenanceMode',
    },
  ],
}
