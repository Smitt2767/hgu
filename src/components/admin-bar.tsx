'use client'

import { clientEnv } from '@/env/client'
import { getPathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { PayloadAdminBar, PayloadMeUser } from '@payloadcms/admin-bar'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type AdminBarProps = {
  draft: boolean
}

/**
 * Deliberately `useRouter` from `next/navigation` rather than next-intl's.
 *
 * next-intl's wrapper calls `usePathname()` on every render — it needs the current
 * path to sync the locale cookie when a push crosses locales. `usePathname` is URL
 * data, so a Client Component calling it outside `<Suspense>` cannot be prerendered,
 * and this component sits unwrapped in the root layout. That took every page which is
 * not prebuilt down with a `CLIENT_HOOK_DYNAMIC` 500 — invisible while the one page
 * `getPagesSlugs` prebuilds happened to be the one being looked at.
 *
 * Nothing here needs the wrapper. `refresh()` is passed straight through by next-intl
 * anyway, and the single `push` targets the current locale, so there is no cookie to
 * sync. `getPathname` supplies the locale prefix as a pure function instead, and
 * `useLocale` reads the provider's context rather than the URL.
 *
 * Wrapping this in `<Suspense>` would also have silenced the error, by streaming the
 * bar in after the shell. Removing the read is better: the layout goes back to being
 * fully prerenderable, with no boundary and no fallback for chrome that is invisible
 * to everyone who is not logged in.
 */
export default function AdminBar(props: AdminBarProps) {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('common')

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
        cmsURL={clientEnv.NEXT_PUBLIC_SITE_URL}
        onAuthChange={onAuthChange}
        logo={<>{t('dashboard')}</>}
        onPreviewExit={() => {
          fetch('/next/exit-preview').then(() => {
            // Prefixed explicitly, because a bare '/' would drop a Spanish admin onto
            // the English home page on the way out of preview.
            router.push(getPathname({ href: '/', locale }))
            router.refresh()
          })
        }}
      />
    </div>
  )
}
