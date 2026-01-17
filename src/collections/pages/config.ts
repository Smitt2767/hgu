import { canCreate, canDelete, canRead, canUpdate } from '@/access'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig, slugField } from 'payload'
import { FAQ } from './blocks/FAQ'
import { HTML } from './blocks/HTML'
import { Quote } from './blocks/Quote'
import { generatePreviewPath } from './helpers'
import { revalidatePage } from './hooks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    description: 'Create and manage website pages with customizable layouts and SEO settings.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        req,
      }),
  },
  access: {
    read: canRead,
    update: canUpdate,
    delete: canDelete,
    create: canCreate,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              localized: true,
            },
            slugField(),
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [FAQ, HTML, Quote],
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
              hasGenerateFn: true,
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePage],
  },
}
