import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { GlobalConfig } from 'payload'

export const Site: GlobalConfig = {
  slug: 'site',
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
            },
            {
              type: 'upload',
              label: 'Favicon',
              name: 'favicon',
              relationTo: 'media',
              required: true,
              hasMany: false,
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
}
