'use client'

import { useTranslations } from 'next-intl'

export default function TemplateLoading() {
  const t = useTranslations('common')
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-primary text-lg">{t('loading')}</p>
    </div>
  )
}
