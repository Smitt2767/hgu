'use client'

import { useTranslations } from 'next-intl'

export default function Name() {
  const t = useTranslations()

  return <div>{t('title')}</div>
}
