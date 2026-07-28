import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { payloadTotp } from '@clocklimited/payload-2fa'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateURL } from '@payloadcms/plugin-seo/types'
import { Articles } from './collections/Articles'
import { Links } from './collections/Links'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Templates } from './collections/Templates'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { clientEnv } from './env/client'
import { serverEnv } from './env/server'
import { Footer } from './globals/footer/config'
import { Header } from './globals/header/config'
import { Site } from './globals/site/config'
import { Socials } from './globals/socials/config'
import { Page } from './payload-types'
import { getSiteSlug } from './utils/slug'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = clientEnv.NEXT_PUBLIC_SITE_URL

  return doc?.slug ? `${url}/${getSiteSlug(doc.slug)}` : url
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
  collections: [Media, Links, Articles, Videos, Templates, Pages, Users],
  db: postgresAdapter({
    pool: {
      connectionString: serverEnv.DATABASE_URL,
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
    payloadTotp({
      collection: 'users',
    }),
    // MCP server for AI clients — see .mcp.json. Exposes find/create/update on
    // all content collections. `delete` is deliberately never enabled here, and
    // `experimental` tools stay off (they write TypeScript files to disk and
    // include auth tools that bypass access control).
    //
    // This is only the first of two permission layers: each capability must also
    // be toggled on the individual API key (MCP → API Keys), which is where
    // per-client scoping happens at runtime. Payload access control in
    // src/access/index.ts still applies on top of both.
    mcpPlugin({
      collections: {
        media: {
          description: 'Upload and manage images, videos, and other media files.',
          enabled: { create: true, find: true, update: true },
        },
        links: {
          description: 'Manage website and external links.',
          enabled: { create: true, find: true, update: true },
        },
        articles: {
          description: 'Manage articles with content, images, and reference links.',
          enabled: { create: true, find: true, update: true },
        },
        videos: {
          description: 'Manage video embeds with thumbnails and metadata.',
          enabled: { create: true, find: true, update: true },
        },
        templates: {
          description:
            'Create and manage reusable templates for content pages (Videos, Articles, etc.).',
          enabled: { create: true, find: true, update: true },
        },
        pages: {
          description:
            'Create and manage website pages with customizable layouts and SEO settings.',
          enabled: { create: true, find: true, update: true },
        },
        // `users` is deliberately NOT exposed. The generated create/update
        // schemas include `hash`, `salt`, `totpSecret` and `resetPasswordToken`
        // as writable strings, and Payload accepts them — verified: writing a
        // raw hash/salt succeeded, which is account takeover. Reading users
        // offers little upside, so the whole collection stays off.
      },
      // Globals are singletons, so the plugin only supports find/update —
      // create/delete are not available for them.
      globals: {
        site: {
          enabled: { find: true, update: true },
        },
        header: {
          enabled: { find: true, update: true },
        },
        footer: {
          enabled: { find: true, update: true },
        },
        socials: {
          enabled: { find: true, update: true },
        },
      },
    }),
  ],
  secret: serverEnv.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
