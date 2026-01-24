import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  imageURL: '/images/cta.png',
  labels: {
    singular: 'CTA',
    plural: 'CTA',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
      admin: {
        description:
          'The button text. Keep it short and action-oriented (e.g., "Start Now", "Learn More").',
      },
    },
    {
      name: 'message',
      type: 'text',
      label: 'Message',
      admin: {
        description:
          'Optional supporting text above the button to provide context. Can be hidden using Show Title toggle.',
      },
    },
    {
      name: 'showTitle',
      type: 'radio',
      label: 'Show Title',
      defaultValue: 'show',
      options: [
        { label: 'Show', value: 'show' },
        { label: 'Hide', value: 'hide' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
        description: 'Toggle to show or hide the message text above the button.',
      },
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'links',
      label: 'Link',
      admin: {
        description: 'Internal links to pages within the site, or external links to outside URLs.',
      },
    },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      defaultValue: 'video',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        description:
          'Choose "None" for no background, "Color" for solid gray, "Image" for a background image, or "Video" for animated video background.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#1a1a1a',
      validate: validateColor,
      admin: {
        description:
          'Hex color for the section background when Background Type is "Color". Defaults to dark gray (#1a1a1a).',
        condition: (_, siblingData) => siblingData?.backgroundType === 'color',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Image behind the CTA section when Background Type is "Image".',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      label: 'Background Video',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        description: 'Looping video behind the CTA section when Background Type is "Video".',
        condition: (_, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
    {
      name: 'desktopAspectRatio',
      type: 'radio',
      label: 'Desktop Aspect Ratio',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'mobileAspectRatio',
      type: 'radio',
      label: 'Mobile Aspect Ratio',
      defaultValue: '4:5',
      options: [
        { label: '4:5', value: '4:5' },
        { label: '9:16', value: '9:16' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
  ],
}
