import { getSiteData } from '@/data/site'
import { clientEnv } from '@/env/client'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteData('en')
  const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL

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
        disallow: ['/admin/', '/api/', '/templates/', '/es/templates/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
