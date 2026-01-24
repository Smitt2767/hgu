import { canCreate, canDelete, canRead, canUpdate } from '@/access'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig, slugField } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    description: 'Manage video embeds with thumbnails and metadata.',
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
          label: 'Video',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              localized: true,
            },
            slugField(),
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              required: true,
              defaultValue: 'youtube',
              options: [{ label: 'YouTube', value: 'youtube' }],
            },
            {
              name: 'orientation',
              type: 'radio',
              label: 'Orientation',
              required: true,
              defaultValue: 'horizontal',
              options: [
                { label: 'Horizontal (16:9)', value: 'horizontal' },
                { label: 'Vertical (9:16)', value: 'vertical' },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'videoId',
              type: 'text',
              label: 'Video ID',
              required: true,
              admin: {
                description:
                  'The unique identifier from the video URL. For YouTube: the part after "v=" in the URL.',
              },
            },
            {
              name: 'thumbnailType',
              type: 'radio',
              label: 'Thumbnail Type',
              defaultValue: 'image',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              admin: {
                layout: 'horizontal',
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              label: 'Thumbnail',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                condition: (_, siblingData) => siblingData?.thumbnailType === 'image',
              },
            },
            {
              name: 'videoThumbnail',
              type: 'upload',
              label: 'Video Thumbnail',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'video' },
              },
              admin: {
                condition: (_, siblingData) => siblingData?.thumbnailType === 'video',
              },
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
      ],
    },
  ],
}
