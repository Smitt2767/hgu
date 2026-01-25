'use client'

import { useTranslations } from 'next-intl'

export default function Maintenance() {
  const t = useTranslations('common')
  return <div>{t('maintenance')}</div>
}
