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

type CardCarouselProps = GetBlockProps<'cardCarousel'>

type Card = CardCarouselProps['cards'][0]

type CardProps = { card: Card } & Pick<
  CardCarouselProps,
  'desktopAspectRatio' | 'mobileAspectRatio'
>

const containerStyles = cva(
  'block relative w-full [&_img]:object-cover [&_img]:object-center rounded-2xl overflow-hidden',
  {
    variants: mobileAndDesktopRatioStyleVariants,
  },
)

function CardDrawer({
  content,
  ...props
}: { content: Card['modalContent'] } & Omit<ComponentProps<typeof ThemedDrawer>, 'children'>) {
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

function Card({ card, desktopAspectRatio, mobileAspectRatio }: CardProps) {
  const modal = useModal()
  const t = useTranslations('blocks.cardCarousel')

  const handleRead = () => {
    modal.open()
  }

  return (
    <>
      <CardDrawer
        open={modal.isOpen}
        onOpenChange={(value) => (value ? modal.open() : modal.close())}
        title={t('drawerTitle')}
        content={card.modalContent}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleRead}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleRead()
          }
        }}
        aria-label={t('readCardAriaLabel')}
        className={containerStyles({ desktopAspectRatio, mobileAspectRatio })}
      >
        {card.mediaType === 'image' && card.cardImage && typeof card.cardImage === 'object' && (
          <Image
            fill
            priority
            sizes="100vw"
            alt={card.cardImage.alt}
            src={card.cardImage.url!}
            className="object-cover object-center -z-10"
          />
        )}
        {card.mediaType === 'video' && card.cardVideo && typeof card.cardVideo === 'object' && (
          <video
            loop
            autoPlay
            playsInline
            muted
            preload="auto"
            src={card.cardVideo.url!}
            className="absolute inset-0 h-full w-full object-cover object-center -z-10"
          />
        )}
      </div>
    </>
  )
}

export default function CardCarousel({
  cards,
  desktopAspectRatio,
  mobileAspectRatio,
  header,
}: CardCarouselProps) {
  const t = useTranslations('blocks.cardCarousel')

  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto">
        <div className="w-full relative">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center px-6">{header}</h2>
          <div className="max-md:hidden absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="max-md:hidden absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
          <Carousel
            opts={{ align: 'center', containScroll: false }}
            className="w-full"
            aria-label={header || t('defaultAriaLabel')}
          >
            <CarouselContent className="py-1">
              {cards.map((card) => {
                return (
                  <CarouselItem className="basis-[80%] md:basis-[48%]" key={card.id}>
                    <Card
                      card={card}
                      desktopAspectRatio={desktopAspectRatio}
                      mobileAspectRatio={mobileAspectRatio}
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
