'use client'

import { mobileAndDesktopRatioStyleVariants } from '@/constants'
import { Media, Video } from '@/payload-types'
import { GetBlockProps } from '@/types/blocks'
import { cva } from 'class-variance-authority'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps, useMemo, useState } from 'react'

const containerStyles = cva(
  'block group relative w-full [&_img]:object-cover [&_img]:object-center',
  {
    variants: mobileAndDesktopRatioStyleVariants,
  },
)

export default function FeaturedVideo({
  caption,
  desktopAspectRatio,
  mobileAspectRatio,
  ...rest
}: GetBlockProps<'featuredVideo'>) {
  const [showVideo, setShowVideo] = useState(false)
  const video = rest.video as Video

  const imageProps = useMemo(() => {
    if (video.thumbnailType === 'image' && video.thumbnail && typeof video.thumbnail === 'object') {
      return {
        alt: video.thumbnail?.alt,
        src: video.thumbnail?.url!,
        fill: true,
        sizes: '100vw',
        priority: true,
        className: 'rounded-2xl -z-10',
      } satisfies ComponentProps<typeof Image>
    }

    return null
  }, [video])

  const videoProps = useMemo(() => {
    if (
      video.thumbnailType === 'video' &&
      video.videoThumbnail &&
      typeof video.videoThumbnail === 'object'
    ) {
      const videoThumbnail = video.videoThumbnail as Media
      return {
        loop: true,
        muted: true,
        autoPlay: true,
        playsInline: true,
        preload: 'auto' as const,
        src: videoThumbnail.url!,
        className: 'absolute inset-0 -z-10 h-full w-full object-cover object-center rounded-2xl',
      } satisfies ComponentProps<'video'>
    }

    return null
  }, [video])

  const handleShowVideo = () => {
    setShowVideo(true)
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-xl font-semibold text-center">{video.title}</h3>
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
                  onClick={handleShowVideo}
                  className="absolute cursor-pointer top-1/2 left-1/2 -translate-1/2 w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/50 group-hover:border-white group-hover:scale-110 transition-all duration-300"
                >
                  <PlayIcon fill="currentColor" strokeWidth={0} />
                </button>
                <div className="absolute -z-9 inset-0 bg-black/40 group-hover:bg-black/30 transition-colors rounded-2xl" />
              </>
            )}
          </div>
          {caption && <p className="text-center text-gray-400 text-sm">{caption}</p>}
        </div>
      </div>
    </div>
  )
}
