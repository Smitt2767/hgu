import { getSiteData } from '@/data/site'
import { getImageUrl } from '@/utils'
import type { MetadataRoute } from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteData('en')

  const name = site?.title || 'He Gets Us'
  const description = site?.meta?.description || ''
  const faviconUrl = getImageUrl(site?.favicon) ?? '/favicon.ico'
  const themeColor = site?.primaryColors?.primaryGold || '#FEDA00'
  const backgroundColor = site?.neutrals?.background || '#0A0A0A'

  return {
    name,
    short_name: name,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: faviconUrl,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
