'use client'

import { cn, loop } from '@/lib/utils'
import { GetBlockProps } from '@/types/blocks'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import ArticleCard from '../article/card'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'
import { TextLinkButton } from '../ui/text-link-button'

export default function ArticleCarousel({
  articles,
  header,
  showTitle,
  showHeader,
  showDescription,
}: GetBlockProps<'articleCarousel'>) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (articles.length === 0) return null

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
            opts={{
              align: 'center',
              containScroll: false,
            }}
            setApi={setApi}
            className="w-full"
            aria-label={header || 'Article Carousel'}
          >
            <CarouselContent className="py-1">
              {articles.map((article, index) => {
                return (
                  <CarouselItem
                    className="basis-[80%] md:basis-[48%]"
                    key={article && typeof article === 'object' ? article.id : index}
                  >
                    <ArticleCard
                      showReadMore
                      article={article}
                      showTitle={showTitle}
                      showDescription={showDescription}
                      className="h-full"
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
          <div className="mt-6 flex items-center justify-center gap-4 px-6">
            <TextLinkButton
              disabled={!api?.canScrollPrev()}
              onClick={() => api?.scrollPrev()}
              className="p-3"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon aria-hidden="true" />
              <span className="sr-only">Previous slide</span>
            </TextLinkButton>
            <div className="flex gap-2" role="tablist" aria-label="Carousel pagination">
              {loop(count).map((key, index) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={index + 1 === current}
                  aria-label={`Go to slide ${index + 1} of ${count}`}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-2 rounded-full transition-all cursor-pointer bg-foreground/30 w-2',
                    index + 1 === current && 'w-6 bg-primary',
                  )}
                />
              ))}
            </div>
            <TextLinkButton
              disabled={!api?.canScrollNext()}
              onClick={() => api?.scrollNext()}
              className="p-3 hover:border-primary"
              aria-label="Next slide"
            >
              <ChevronRightIcon aria-hidden="true" />
              <span className="sr-only">Next slide</span>
            </TextLinkButton>
          </div>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Slide {current} of {count}
          </div>
        </div>
      </div>
    </div>
  )
}
