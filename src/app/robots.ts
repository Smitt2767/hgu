import { getSiteData } from '@/data/site'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteData('en')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  if (site?.maintenanceMode) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
