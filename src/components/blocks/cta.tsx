'use client'

import { mobileAndDesktopRatioStyleVariants } from '@/constants'
import { beacon } from '@/flags/beacon'
import { GetBlockProps } from '@/types/blocks'
import { cva } from 'class-variance-authority'
import { useLocale } from 'next-intl'
import Background from '../ui/background'
import { getTextLinkButtonProps, TextLinkButton } from '../ui/text-link-button'

const containerStyles = cva('relative w-full rounded-2xl overflow-hidden', {
  variants: mobileAndDesktopRatioStyleVariants,
})

export default function CTA({
  backgroundColor,
  backgroundImage,
  backgroundVideo,
  backgroundType,
  desktopAspectRatio,
  mobileAspectRatio,
  message,
  showTitle,
  link,
  label,
  id,
}: GetBlockProps<'cta'>) {
  const linkProps = getTextLinkButtonProps({ link, children: label })
  // From the provider's context rather than the URL, so this stays prerenderable —
  // `useLocale` reads what the layout passed down, unlike `usePathname`.
  const locale = useLocale()

  /**
   * The conversion half of a CTA experiment.
   *
   * Fired for every CTA, flagged or not: which of them is under test is decided in
   * GrowthBook, and a metric that only counted clicks on modules already known to be
   * experimental could never be used to start a new one. The event carries no variant —
   * the exposure already established that from a signed code, and GrowthBook joins the
   * two on the visitor id.
   *
   * `beacon` rather than `fetch`, because the next thing this click does is navigate
   * away, and an ordinary request would be cancelled with the document.
   */
  const trackClick = () => {
    beacon('/api/flags/conversion', {
      event: 'CTA Clicked',
      locale,
      // Enough to tell two CTAs on one page apart when reading results, without
      // becoming a second copy of the content.
      properties: { label: label ?? '', blockId: id ?? '' },
    })
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className={containerStyles({ desktopAspectRatio, mobileAspectRatio })}>
          <Background
            type={backgroundType}
            color={backgroundColor}
            image={backgroundImage}
            video={backgroundVideo}
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex flex-col items-center gap-8 p-8">
            {showTitle === 'show' && message && <p className="text-2xl text-center">{message}</p>}
            {linkProps && <TextLinkButton showArrow {...linkProps} onClick={trackClick} />}
          </div>
        </div>
      </div>
    </div>
  )
}
