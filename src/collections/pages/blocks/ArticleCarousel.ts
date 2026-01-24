import { Block } from 'payload'

export const ArticleCarousel: Block = {
  slug: 'articleCarousel',
  imageURL: '/images/blocks/article-carousel.png',
  labels: {
    singular: 'Article Carousel',
    plural: 'Article Carousel',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      required: true,
    },
    {
      name: 'horizontalScrollPath',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showHeader',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showTitle',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showDescription',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
