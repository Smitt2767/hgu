import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      // Media is served from Vercel Blob in deployed environments, so next/image
      // needs the blob host allowlisted. Locally the adapter is disabled and URLs
      // stay relative (/api/media/file/...), which needs no entry here.
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
