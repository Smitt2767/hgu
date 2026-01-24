import { Block } from 'payload'

export const FeaturedArticle: Block = {
  slug: 'featuredArticle',
  imageURL: '/images/featured-article.png',
  labels: {
    singular: 'Featured Article',
    plural: 'Featured Article',
  },
  fields: [
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: true,
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
    {
      name: 'showReadMore',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
