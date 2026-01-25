import { canCreate, canRead, canUpdate } from '@/access'
import { CollectionConfig } from 'payload'
import { generatePreviewPath } from './helpers'
import { templateBlocks } from './shared/template-blocks'
import {
  canDeleteTemplate,
  ensureSingleSystemDefault,
  preventDefaultTemplateDeletion,
  revalidateTemplate,
} from './templates/hooks'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    description: 'Create and manage reusable templates for content pages (Videos, Articles, etc.).',
    defaultColumns: ['name', 'contentType', 'isDefault', 'isSystemDefault'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          prefixPath: '/templates',
          slug: data?.id?.toString(),
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        prefixPath: '/templates',
        slug: data?.id?.toString() as string,
        req,
      }),
  },
  access: {
    read: canRead,
    create: canCreate,
    update: canUpdate,
    delete: canDeleteTemplate,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Template',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Template Name',
              required: true,
              localized: true,
            },
            {
              name: 'contentType',
              type: 'select',
              label: 'Content Type',
              required: true,
              options: [
                { label: 'Videos', value: 'videos' },
                { label: 'Articles', value: 'articles' },
              ],
              admin: {
                description: 'The type of content this template is designed for.',
              },
            },
            {
              name: 'isDefault',
              type: 'checkbox',
              label: 'Default Template',
              defaultValue: false,
              admin: {
                description:
                  'Default templates cannot be deleted. Use this for system templates that should always be available.',
                position: 'sidebar',
              },
            },
            {
              name: 'isSystemDefault',
              type: 'checkbox',
              label: 'System Default',
              defaultValue: false,
              admin: {
                description:
                  'The fallback template used when no template is selected. Only one template per content type can be the system default.',
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Layout Blocks',
              blocks: templateBlocks,
              admin: {
                initCollapsed: true,
                description:
                  'Add blocks to define the layout for this template. These blocks will appear below the content details on the frontend.',
              },
            },
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
    beforeChange: [ensureSingleSystemDefault],
    beforeDelete: [preventDefaultTemplateDeletion],
    afterChange: [revalidateTemplate],
    afterDelete: [revalidateTemplate],
  },
}
