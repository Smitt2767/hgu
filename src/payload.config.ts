import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateURL } from '@payloadcms/plugin-seo/types'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Pages } from './collections/pages/config'
import { Footer } from './globals/footer/config'
import { Header } from './globals/header/config'
import { Site } from './globals/site/config'
import { Socials } from './globals/socials/config'
import { Page } from './payload-types'
import { slugToPath } from './utils/slug'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = process.env.NEXT_PUBLIC_SITE_URL!

  return doc?.slug ? `${url}${slugToPath(doc.slug)}` : url
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Pages],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({
    features({ defaultFeatures }) {
      return [...defaultFeatures, FixedToolbarFeature()]
    },
  }),
  globals: [Site, Header, Footer, Socials],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Spanish',
        code: 'es',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      generateURL,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
