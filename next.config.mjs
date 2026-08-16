import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // Instant navigation. `<Link prefetch={true}>` prefetches only the static shell
  // of a route and never its dynamic data, so a click swaps in an already-fetched
  // shell and streams the rest — instead of waiting on the slowest uncached read
  // before painting anything. Makes the default segment-level `prefetch`
  // `'partial'`; a per-segment `prefetch` export still wins. Requires
  // cacheComponents, which is on above.
  //
  // This is the payoff for the `use cache` boundaries: whatever is in the shell
  // is what arrives instantly, so anything left uncached above the fold is what
  // makes navigation feel slow.
  partialPrefetching: true,
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
