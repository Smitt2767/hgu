import { canCreate, canDelete, canRead, canUpdate } from '@/access'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig, slugField } from 'payload'
import { Accordion } from './blocks/Accordion'
import { Alpha } from './blocks/Alpha'
import { AlphaIframe } from './blocks/AlphaIframe'
import { AnimatedQuote } from './blocks/AnimatedQuote'
import { CardCarousel } from './blocks/CardCarousel'
import { CTA } from './blocks/CTA'
import { FeaturedImage } from './blocks/FeaturedImage'
import { Feedback } from './blocks/Feedback'
import { JustText } from './blocks/JustText'
import { JustTitle } from './blocks/JustTitle'
import { ParagraphText } from './blocks/ParagraphText'
import { PauseExperience } from './blocks/PauseExperience'
import { SocialShare } from './blocks/SocialShare'
import { TakeOver } from './blocks/TakeOver'
import { TextCarousel } from './blocks/TextCarousel'
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
              admin: {
                initCollapsed: true,
              },
              blocks: [
                Accordion,
                Alpha,
                AlphaIframe,
                AnimatedQuote,
                CardCarousel,
                CTA,
                FeaturedImage,
                Feedback,
                JustText,
                JustTitle,
                PauseExperience,
                ParagraphText,
                SocialShare,
                TakeOver,
                TextCarousel,
              ],
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
