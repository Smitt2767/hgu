import { getSitemapData } from '@/data/sitemap'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const sitemapData = await getSitemapData()
  return getServerSideSitemap(sitemapData)
}
