import { canCreate, canDelete, canRead, canUpdate } from '@/access'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig, slugField } from 'payload'
import { generatePreviewPath } from './helpers'
import { revalidateArticle } from './hooks'
import { createTemplateFields } from './shared/template-fields'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    description: 'Manage articles with content, images, and reference links.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          prefixPath: '/articles',
          slug: data?.slug,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        prefixPath: '/articles',
        slug: data?.slug as string,
        req,
      }),
  },
  access: {
    read: canRead,
    create: canCreate,
    update: canUpdate,
    delete: canDelete,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              localized: true,
            },
            slugField(),
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'referenceLink',
              type: 'relationship',
              label: 'Reference Link',
              relationTo: 'links',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Content',
              localized: true,
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
              hasGenerateFn: true,
            }),
          ],
        },
        {
          label: 'Template',
          fields: createTemplateFields('articles'),
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
    afterChange: [revalidateArticle],
    afterDelete: [revalidateArticle],
  },
}
