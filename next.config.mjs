import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // Instant navigation.
  //
  // Every `<Link prefetch>` fetches only a route's static shell, so a click paints an
  // already-fetched shell and streams the rest rather than blocking on the slowest
  // uncached read.
  //
  // The contract it imposes is that the shell must render without reading the URL, so
  // any `await params` in a page or layout body is an error rather than a warning. The
  // audit that used to block this is done: every dynamic route now resolves params
  // through `readRouteParams` (`src/utils/route-params.ts`), and the locale comes from
  // the `[locale]` root param via `getLocale()` rather than from `setRequestLocale`.
  //
  // Keep it that way. Reading `params` directly in a new route's body now fails the
  // build here rather than degrading quietly, which is the point.
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
