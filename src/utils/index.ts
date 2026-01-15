import { clientEnv } from '@/env/client'
import { Media } from '@/payload-types'

export const getImageUrl = (media: Media | number | null | undefined) => {
  if (!media || typeof media === 'number') return null
  if (!media.url) return null
  return `${clientEnv.NEXT_PUBLIC_SITE_URL}${media.url}`
}
