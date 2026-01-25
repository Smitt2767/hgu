import { Field } from 'payload'
import { templateBlocks } from './template-blocks'

export type ContentType = 'videos' | 'articles'

/**
 * Creates template-related fields for a content collection.
 * Use this factory to add template support to Videos, Articles, or future content types.
 *
 * @param contentType - The content type to filter templates by
 * @returns Array of fields for template selection and custom layout override
 *
 * @example
 * // In Videos.ts
 * {
 *   label: 'Template',
 *   fields: createTemplateFields('videos'),
 * }
 */
export function createTemplateFields(contentType: ContentType): Field[] {
  return [
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      label: 'Template',
      filterOptions: {
        contentType: { equals: contentType },
      },
      admin: {
        description:
          'Select a template for this page. Leave empty to use the system default template.',
      },
    },
    {
      name: 'useCustomLayout',
      type: 'checkbox',
      label: 'Use Custom Layout',
      defaultValue: false,
      admin: {
        description:
          'Enable to add custom blocks for this content only, replacing the template blocks entirely.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Custom Layout',
      blocks: templateBlocks,
      admin: {
        initCollapsed: true,
        condition: (_, siblingData) => siblingData?.useCustomLayout === true,
        description: 'Custom blocks for this content. These replace the template blocks entirely.',
      },
    },
  ]
}
