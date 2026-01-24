import { canRead, canUpdate } from '@/access'
import { validateColor } from '@/utils/color'
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
          label: 'Information',
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
          label: 'Branding',
          fields: [
            {
              type: 'group',
              label: 'Primary',
              name: 'primaryColors',
              admin: {
                description: 'Main brand colors used across the site.',
              },
              fields: [
                {
                  type: 'text',
                  label: 'Primary Gold',
                  name: 'primaryGold',
                  required: true,
                  defaultValue: '#FEDA00',
                  validate: validateColor,
                  admin: {
                    description: '#FEDA00',
                  },
                },
              ],
            },
            {
              type: 'group',
              label: 'Text Colors',
              name: 'textColors',
              admin: {
                description: 'Colors used for typography and text elements.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      label: 'White',
                      name: 'white',
                      required: true,
                      defaultValue: '#FFFFFF',
                      validate: validateColor,
                      admin: {
                        description: '#FFFFFF',
                      },
                    },
                    {
                      type: 'text',
                      label: 'Gray',
                      name: 'gray',
                      required: true,
                      defaultValue: '#86888A',
                      validate: validateColor,
                      admin: {
                        description: '#86888A',
                      },
                    },
                    {
                      type: 'text',
                      label: 'Primary Gold',
                      name: 'primaryGold',
                      required: true,
                      defaultValue: '#FEDA00',
                      validate: validateColor,
                      admin: {
                        description: '#FEDA00',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              label: 'Box Background',
              name: 'boxBackground',
              admin: {
                description: 'Background colors for card and box elements.',
              },
              fields: [
                {
                  type: 'text',
                  label: 'Box BG Gray',
                  name: 'boxBgGray',
                  required: true,
                  defaultValue: '#444546',
                  validate: validateColor,
                  admin: {
                    description: '#444546',
                  },
                },
              ],
            },
            {
              type: 'group',
              label: 'Neutrals',
              name: 'neutrals',
              admin: {
                description: 'Neutral palette for backgrounds, surfaces, and borders.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      label: 'Background',
                      name: 'background',
                      required: true,
                      defaultValue: '#0A0A0A',
                      validate: validateColor,
                      admin: {
                        description: '#0A0A0A',
                      },
                    },
                    {
                      type: 'text',
                      label: 'Surface',
                      name: 'surface',
                      required: true,
                      defaultValue: '#1A1A1A',
                      validate: validateColor,
                      admin: {
                        description: '#1A1A1A',
                      },
                    },
                    {
                      type: 'text',
                      label: 'Border',
                      name: 'border',
                      required: true,
                      defaultValue: '#252525',
                      validate: validateColor,
                      admin: {
                        description: '#252525',
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      label: 'White',
                      name: 'white',
                      required: true,
                      defaultValue: '#FFFFFF',
                      validate: validateColor,
                      admin: {
                        description: '#FFFFFF',
                      },
                    },
                    {
                      type: 'text',
                      label: 'Gray',
                      name: 'gray',
                      required: true,
                      defaultValue: '#B0B0B0',
                      validate: validateColor,
                      admin: {
                        description: '#B0B0B0',
                      },
                    },
                  ],
                },
              ],
            },
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
