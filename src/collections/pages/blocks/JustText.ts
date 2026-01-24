import { validateColor } from '@/utils/color'
import { Block } from 'payload'

export const JustText: Block = {
  slug: 'justText',
  labels: {
    singular: 'Just Text',
    plural: 'Just Text',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
      admin: {
        description: 'Rich editor supporting headings, paragraphs, bold, italic, links, and lists.',
      },
    },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      defaultValue: 'none',
      options: [
        { label: 'No Background', value: 'none' },
        { label: 'Color Background', value: 'color' },
        { label: 'Image Background', value: 'image' },
        { label: 'Video Background', value: 'video' },
      ],
      admin: {
        position: 'sidebar',
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
        description:
          "Upload a looping video file (MP4 recommended). Only shown when Background is set to 'Video'.",
        condition: (_, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      admin: {
        description: 'Upload a full background image.',
        condition: (_, siblingData) => siblingData?.backgroundType === 'image',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#1A1A1A',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color value (e.g. #1A1A1A)',
        condition: (_, siblingData) => siblingData?.backgroundType === 'color',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#B0B0B0',
      validate: validateColor,
      admin: {
        position: 'sidebar',
        description: 'Hex color value (e.g. #B0B0B0)',
      },
    },
    {
      name: 'textAlignment',
      type: 'radio',
      label: 'Text Alignment',
      defaultValue: 'centered',
      options: [
        { label: 'Left Justified', value: 'left' },
        { label: 'Centered', value: 'centered' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'verticalAlignment',
      type: 'radio',
      label: 'Vertical Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    {
      name: 'multiLinesOfText',
      type: 'radio',
      label: 'Multi Lines of Text',
      defaultValue: 'off',
      options: [
        { label: 'Off', value: 'off' },
        { label: 'On', value: 'on' },
      ],
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
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
    {
      name: 'textAnimation',
      type: 'select',
      label: 'Text Animation on Scroll',
      defaultValue: 'flashLineByLine',
      options: [
        { label: 'Flash Line by Line', value: 'flashLineByLine' },
        { label: 'Flash Line by Line (No Fade)', value: 'flashLineByLineNoFade' },
        { label: 'Stack Line on Line', value: 'stackLineOnLine' },
        { label: 'Appear Word by Word', value: 'appearWordByWord' },
        { label: 'Appear Paragraph by Paragraph', value: 'appearParagraphByParagraph' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      name: 'highlightedWords',
      type: 'text',
      label: 'Highlighted Words',
      admin: {
        description:
          'Words to highlight in the primary brand color. Enter words separated by commas to emphasize key phrases.',
      },
    },
    {
      name: 'progressBar',
      type: 'checkbox',
      label: 'Progress Bar',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show a progress bar for this section.',
      },
    },
  ],
}
