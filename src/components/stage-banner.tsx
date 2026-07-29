import type { Stage } from '@/collections/shared/stage'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

type StageBannerProps = {
  stage?: Stage | null
  status?: 'draft' | 'published' | null
}

const stageStyles: Record<Stage, string> = {
  internal: 'bg-zinc-800 text-zinc-100',
  alpha: 'bg-amber-600 text-amber-50',
  beta: 'bg-sky-700 text-sky-50',
}

/**
 * Tells whoever is previewing which release stage they are looking at.
 *
 * Only rendered on the draft-mode path, so it never reaches the prerendered HTML
 * the public receives. A published document renders nothing: at that point the
 * stage is meaningless and the preview matches what everyone else sees.
 */
export default async function StageBanner({ stage, status }: StageBannerProps) {
  if (status === 'published') return null

  const resolvedStage: Stage = stage ?? 'internal'
  const t = await getTranslations('stage')

  return (
    <div
      className={cn(
        'w-full px-6 py-2 text-center text-sm font-semibold tracking-wide uppercase',
        stageStyles[resolvedStage],
      )}
      role="status"
    >
      {t(`${resolvedStage}Preview`)}
    </div>
  )
}
