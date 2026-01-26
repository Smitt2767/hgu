'use client'

import { mobileAndDesktopRatioStyleVariants } from '@/constants'
import useModal from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import { GetBlockProps } from '@/types/blocks'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { cva } from 'class-variance-authority'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '../ui/carousel'
import { ThemedDrawer } from '../ui/themed-drawer'

type TextCarouselProps = GetBlockProps<'textCarousel'>

type Slide = TextCarouselProps['slides'][0]

type SlideCardProps = {
  slide: Slide
  titleColor?: string | null
  subtextColor?: string | null
} & Pick<TextCarouselProps, 'desktopAspectRatio' | 'mobileAspectRatio'>

const containerStyles = cva(
  'bg-black p-6 relative w-full rounded-2xl overflow-hidden cursor-pointer',
  {
    variants: {
      ...mobileAndDesktopRatioStyleVariants,
      backgroundType: {
        none: 'border border-border bg-transparent',
        color: 'bg-card',
        image: '',
        video: '',
      },
    },
  },
)

function SlideDrawer({
  content,
  ...props
}: { content: Slide['slideBody'] } & Omit<ComponentProps<typeof ThemedDrawer>, 'children'>) {
  return (
    <ThemedDrawer {...props}>
      {(isDark) => (
        <div className="p-4 overflow-y-auto">
          {content && (
            <div
              className={cn('prose prose-sm max-w-full', isDark ? 'prose-invert' : 'prose-neutral')}
              dangerouslySetInnerHTML={{
                __html: convertLexicalToHTML({ data: content }),
              }}
            />
          )}
        </div>
      )}
    </ThemedDrawer>
  )
}

function SlideCard({
  slide,
  desktopAspectRatio,
  mobileAspectRatio,
  titleColor,
  subtextColor,
}: SlideCardProps) {
  const modal = useModal()
  const t = useTranslations('blocks.textCarousel')

  const handleOpen = () => {
    modal.open()
  }

  return (
    <>
      <SlideDrawer
        open={modal.isOpen}
        onOpenChange={(value) => (value ? modal.open() : modal.close())}
        title={slide.slideTitle || t('drawerTitle')}
        content={slide.slideBody}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
        aria-label={slide.slideTitle || t('readSlideAriaLabel')}
        className={containerStyles({
          desktopAspectRatio,
          mobileAspectRatio,
          backgroundType: slide.backgroundType,
        })}
        style={
          slide.backgroundType === 'color' && slide.backgroundColor
            ? { backgroundColor: slide.backgroundColor }
            : undefined
        }
      >
        {/* Background Image */}
        {slide.backgroundType === 'image' &&
          slide.backgroundImage &&
          typeof slide.backgroundImage === 'object' && (
            <>
              <Image
                fill
                priority
                sizes="100vw"
                alt={slide.backgroundImage.alt || ''}
                src={slide.backgroundImage.url!}
                className="object-cover object-center z-0 opacity-40 pointer-events-none"
              />
            </>
          )}

        {/* Background Video */}
        {slide.backgroundType === 'video' &&
          slide.backgroundVideo &&
          typeof slide.backgroundVideo === 'object' && (
            <>
              <video
                loop
                autoPlay
                playsInline
                muted
                preload="auto"
                src={slide.backgroundVideo.url!}
                className="absolute inset-0 h-full w-full object-cover object-center z-0 opacity-40 pointer-events-none"
              />
            </>
          )}

        {/* Text Content */}
        <div className="relative z-10 pointer-events-none">
          {slide.showTitle === 'on' && slide.slideTitle && (
            <h3
              className="text-xl font-semibold mb-2 line-clamp-2 text-foreground"
              style={{ ...(titleColor && { color: titleColor }) }}
            >
              {slide.slideTitle}
            </h3>
          )}
          {slide.slideBody && (
            <div
              className="prose prose-sm max-w-full [&_p]:m-0 text-gray-400"
              style={{ ...(subtextColor && { color: subtextColor }) }}
              dangerouslySetInnerHTML={{
                __html: convertLexicalToHTML({ data: slide.slideBody }),
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default function TextCarousel({
  slides,
  header,
  desktopAspectRatio,
  mobileAspectRatio,
  titleColor,
  subtextColor,
}: TextCarouselProps) {
  const t = useTranslations('blocks.textCarousel')

  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto">
        <div className="w-full relative">
          {header && (
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
              {slides.map((slide) => (
                <CarouselItem className="basis-[80%] md:basis-[48%]" key={slide.id}>
                  <SlideCard
                    slide={slide}
                    desktopAspectRatio={desktopAspectRatio}
                    mobileAspectRatio={mobileAspectRatio}
                    titleColor={titleColor}
                    subtextColor={subtextColor}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNavigation className="mt-6 px-6" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
