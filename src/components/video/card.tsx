import { mobileAndDesktopRatioStyleVariants } from '@/constants'
import { Video } from '@/payload-types'
import { cva } from 'class-variance-authority'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps } from 'react'

const containerStyles = cva(
  'block group relative w-full [&_img]:object-cover [&_img]:object-center',
  {
    variants: mobileAndDesktopRatioStyleVariants,
  },
)

export default function VideoCard({
  video,
  showVideo,
  desktopAspectRatio,
  mobileAspectRatio,
  onClick,
}: {
  video?: number | Video | null
  showVideo?: boolean
  desktopAspectRatio?: '16:9' | '4:3' | null
  mobileAspectRatio?: '9:16' | '4:5' | null
  onClick?: () => void
}) {
  if (!video || typeof video !== 'object') return null

  const imageProps =
    video.thumbnailType === 'image' && video.thumbnail && typeof video.thumbnail === 'object'
      ? ({
          alt: video.thumbnail?.alt,
          src: video.thumbnail?.url!,
          fill: true,
          sizes: '100vw',
          priority: true,
          className: 'rounded-2xl -z-10',
        } satisfies ComponentProps<typeof Image>)
      : null

  const videoProps =
    video.thumbnailType === 'video' &&
    video.videoThumbnail &&
    typeof video.videoThumbnail === 'object'
      ? ({
          loop: true,
          muted: true,
          autoPlay: true,
          playsInline: true,
          preload: 'auto' as const,
          src: video.videoThumbnail.url!,
          className: 'absolute inset-0 -z-10 h-full w-full object-cover object-center rounded-2xl',
        } satisfies ComponentProps<'video'>)
      : null

  return (
    <div className={containerStyles({ desktopAspectRatio, mobileAspectRatio })}>
      {showVideo ? (
        <iframe
          title={video.title!}
          src={`${video.generatedUrl}?autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <>
          {imageProps && <Image {...imageProps} />}
          {videoProps && <video {...videoProps} />}
          <button
            onClick={onClick}
            className="absolute cursor-pointer top-1/2 left-1/2 -translate-1/2 w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/50 group-hover:border-white group-hover:scale-110 transition-all duration-300"
          >
            <PlayIcon fill="currentColor" strokeWidth={0} />
          </button>
          <div className="absolute -z-9 inset-0 bg-black/40 group-hover:bg-black/30 transition-colors rounded-2xl" />
        </>
      )}
    </div>
  )
}
