import { serverEnv } from '@/env/server'
import { getSiteSlug } from '@/utils/slug'
import { PayloadRequest } from 'payload'

type Props = {
  prefixPath?: '/videos' | '/articles'
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ slug, prefixPath }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: `${prefixPath ?? ''}/${getSiteSlug(encodedSlug)}`,
    previewSecret: serverEnv.PREVIEW_SECRET,
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
