import { canRead, canUpdate } from '@/access'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'
import { revalidateSite } from './hooks'

export const Site: GlobalConfig = {
  slug: 'site',
  admin: {
    description:
      'Configure global site settings including branding, SEO defaults, and maintenance mode.',
  },
  access: {
    read: canRead,
    update: canUpdate,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
              required: true,
              localized: true,
            },
            {
              type: 'upload',
              label: 'Logo',
              name: 'logo',
              relationTo: 'media',
              required: true,
              hasMany: false,
              filterOptions: {
                mimeType: { equals: 'image/svg+xml' },
              },
            },
            {
              type: 'upload',
              label: 'Favicon',
              name: 'favicon',
              relationTo: 'media',
              required: true,
              hasMany: false,
              filterOptions: {
                mimeType: { equals: 'image/vnd.microsoft.icon' },
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({}),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                filterOptions: {
                  mimeType: { contains: 'image' },
                },
              },
            }),
            MetaDescriptionField({}),
            PreviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              type: 'checkbox',
              label: 'Maintenance Mode',
              name: 'maintenanceMode',
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
