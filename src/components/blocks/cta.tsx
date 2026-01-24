'use client'

import { GetBlockProps } from '@/types/blocks'
import { cva } from 'class-variance-authority'
import Background from '../ui/background'
import { getTextLinkButtonProps, TextLinkButton } from '../ui/text-link-button'

const containerStyles = cva('relative w-full rounded-2xl overflow-hidden', {
  variants: {
    desktopAspectRatio: {
      '16:9': 'md:aspect-video',
      '4:3': 'md:aspect-4/3',
    },
    mobileAspectRatio: {
      '9:16': 'aspect-9/16',
      '4:5': 'aspect-4/5',
    },
  },
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
}: GetBlockProps<'cta'>) {
  const linkProps = getTextLinkButtonProps({ link, children: label })

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
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex flex-col items-center gap-8 p-4">
            {showTitle === 'show' && message && <p className="text-2xl text-center">{message}</p>}
            {linkProps && <TextLinkButton {...linkProps} />}
          </div>
        </div>
      </div>
    </div>
  )
}
