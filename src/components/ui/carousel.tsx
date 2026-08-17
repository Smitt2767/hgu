'use client'

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { TextLinkButton } from '@/components/ui/text-link-button'
import { cn, loop } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

/**
 * Subscribes React to Embla's own change events, for use with
 * `useSyncExternalStore`.
 *
 * Embla owns the scroll position; React only mirrors it. Reading it through a store
 * subscription rather than copying it into state with an effect means there is no
 * render pass where the two disagree, and no `setState` in an effect body — which is
 * the pattern React flags for causing cascading renders.
 *
 * The identity of this callback changes when `api` does, so React re-subscribes and
 * re-reads on its own once Embla finishes mounting. That is the whole reason the
 * effect existed.
 */
function useEmblaSubscription(api: CarouselApi) {
  return React.useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {}

      api.on('select', onStoreChange)
      // `reInit` fires when slides are added or the breakpoint changes, which moves
      // both the snap count and the current index.
      api.on('reInit', onStoreChange)

      return () => {
        api.off('select', onStoreChange)
        api.off('reInit', onStoreChange)
      }
    },
    [api],
  )
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const subscribe = useEmblaSubscription(api)

  // `false` on the server and before Embla mounts: both arrows start disabled, which
  // is the honest answer while there is nothing to scroll yet.
  const canScrollPrev = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false,
  )
  const canScrollNext = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false,
  )

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(
          'relative transition-opacity duration-300',
          api ? 'opacity-100' : 'opacity-0',
          className,
        )}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  const t = useTranslations('ui.carousel')

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">{t('previousSlide')}</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  const t = useTranslations('ui.carousel')

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">{t('nextSlide')}</span>
    </Button>
  )
}

function CarouselNavigation({ className }: { className?: string }) {
  const { api, canScrollNext, canScrollPrev, scrollNext, scrollPrev } = useCarousel()
  const tUI = useTranslations('ui.carousel')
  const tA11y = useTranslations('accessibility')
  const subscribe = useEmblaSubscription(api)

  const count = React.useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0,
  )
  // One-based, to read as "slide 2 of 5" rather than as an index.
  const current = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 0),
    () => 0,
  )

  return (
    <>
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <TextLinkButton
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          className="p-3"
          aria-label={tUI('previousSlide')}
        >
          <ChevronLeftIcon aria-hidden="true" />
          <span className="sr-only">{tUI('previousSlide')}</span>
        </TextLinkButton>
        <div className="flex gap-2" role="tablist" aria-label={tA11y('carouselPagination')}>
          {loop(count).map((key, index) => (
            <button
              key={key}
              role="tab"
              aria-selected={index + 1 === current}
              aria-label={tUI('goToSlide', { index: index + 1, count })}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all cursor-pointer bg-foreground/30 w-2',
                index + 1 === current && 'w-6 bg-primary',
              )}
            />
          ))}
        </div>
        <TextLinkButton
          disabled={!canScrollNext}
          onClick={scrollNext}
          className="p-3 hover:border-primary"
          aria-label={tUI('nextSlide')}
        >
          <ChevronRightIcon aria-hidden="true" />
          <span className="sr-only">{tUI('nextSlide')}</span>
        </TextLinkButton>
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {tUI('slideIndicator', { current, count })}
      </div>
    </>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
}
