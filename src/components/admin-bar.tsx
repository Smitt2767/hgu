'use client'

import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { PayloadAdminBar, PayloadMeUser } from '@payloadcms/admin-bar'
import { useCallback, useState } from 'react'

type AdminBarProps = {
  draft: boolean
}

export default function AdminBar(props: AdminBarProps) {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const onAuthChange = useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn('dark', {
        block: show,
        hidden: !show,
      })}
    >
      <PayloadAdminBar
        className="relative! bg-background! text-foreground!"
        preview={props.draft}
        cmsURL={process.env.NEXT_PUBLIC_SITE_URL}
        collectionSlug="pages"
        onAuthChange={onAuthChange}
        logo={<>Dashboard</>}
        onPreviewExit={() => {
          fetch('/next/exit-preview').then(() => {
            router.push('/')
            router.refresh()
          })
        }}
      />
    </div>
  )
}
