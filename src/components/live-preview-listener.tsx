'use client'

import { clientEnv } from '@/env/client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export default function LivePreviewListener() {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={clientEnv.NEXT_PUBLIC_SITE_URL} />
}
