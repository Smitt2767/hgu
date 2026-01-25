'use client'

import { useTranslations } from 'next-intl'

type MockContentHeaderProps = {
  contentType: 'videos' | 'articles'
}

export default function MockContentHeader({ contentType }: MockContentHeaderProps) {
  const t = useTranslations('components.mockContentHeader')
  const label = contentType === 'videos' ? t('video') : t('article')

  return (
    <section className="w-full px-6 py-12">
      <div className="h-[50vh] w-full border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
        <p className="text-primary text-lg">{t('detailsPlaceholder', { label })}</p>
      </div>
    </section>
  )
}
