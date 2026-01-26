'use client'

import { Video } from '@/payload-types'
import { GetBlockProps } from '@/types/blocks'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '../ui/carousel'
import VideoCard from '../video/card'

function Card({
  video,
  showVideoTitles,
  desktopAspectRatio,
  mobileAspectRatio,
}: { video: Video } & Pick<
  GetBlockProps<'videoCarousel'>,
  'desktopAspectRatio' | 'mobileAspectRatio' | 'showVideoTitles'
>) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <VideoCard
        showVideo={showVideo}
        desktopAspectRatio={desktopAspectRatio}
        mobileAspectRatio={mobileAspectRatio}
        video={video}
        onClick={() => setShowVideo(true)}
      />
      {showVideoTitles && (
        <p className="text-white text-sm font-medium mt-3 text-center">{video.title}</p>
      )}
    </>
  )
}

export default function VideoCarousel({
  header,
  showHeader,
  showVideoTitles,
  desktopAspectRatio,
  mobileAspectRatio,
  videos,
  horizontalScrollPath,
}: GetBlockProps<'videoCarousel'>) {
  const t = useTranslations('blocks.videoCarousel')

  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto">
        <div className="w-full relative">
          {showHeader && header && (
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center px-6">{header}</h2>
          )}
          <div className="max-md:hidden absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="max-md:hidden absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
          <Carousel
            opts={{ align: 'center', containScroll: false }}
            className="w-full"
            aria-label={header || t('defaultAriaLabel')}
          >
            <CarouselContent className="py-1">
              {videos.map((video) => {
                if (!video || typeof video !== 'object') return null

                return (
                  <CarouselItem className="basis-[80%] md:basis-[48%]" key={video.id}>
                    <Card
                      video={video}
                      desktopAspectRatio={desktopAspectRatio}
                      mobileAspectRatio={mobileAspectRatio}
                      showVideoTitles={showVideoTitles}
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselNavigation className="mt-6 px-6" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
