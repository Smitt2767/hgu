'use client'

import { GetBlockProps } from '@/types/blocks'
import { useTranslations } from 'next-intl'
import ArticleCard from '../article/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '../ui/carousel'

export default function ArticleCarousel({
  articles,
  header,
  showTitle,
  showHeader,
  showDescription,
}: GetBlockProps<'articleCarousel'>) {
  const t = useTranslations('blocks.articleCarousel')

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
            opts={{ align: 'center', containScroll: false }}
            className="w-full"
            aria-label={header || t('defaultAriaLabel')}
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
            <CarouselNavigation className="mt-6 px-6" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
