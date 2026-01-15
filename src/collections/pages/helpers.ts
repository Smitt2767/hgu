import { getSiteSlug } from '@/utils/slug'
import { PayloadRequest } from 'payload'

type Props = {
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: `/${getSiteSlug(encodedSlug)}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
