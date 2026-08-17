import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // Instant navigation, deliberately off for now.
  //
  // `true` opts every `<Link prefetch>` into fetching only a route's static shell,
  // so a click paints an already-fetched shell and streams the rest rather than
  // blocking on the slowest uncached read. The catch is the contract it imposes:
  // the shell must render without reading the URL, so any `await params` in a page
  // body becomes an error rather than a warning.
  //
  // Turning it back on means auditing every dynamic route for that. `[[...slug]]`
  // is already done — see `readRouteParams` there for the shape — but
  // `articles/[slug]`, `videos/[slug]` and `templates/[id]` still read `params`
  // directly in their page bodies. Those did not surface while their content was
  // all drafts; they would at build time with published content.
  //
  // Worth revisiting alongside the precompute tier, which restructures these routes
  // anyway and produces exactly the audience-resolved shell this feature rewards.
  partialPrefetching: false,
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
