import { Media } from '@/payload-types'
import { GetBlockProps } from '@/types/blocks'
import { cva } from 'class-variance-authority'
import { getImageProps } from 'next/image'

const containerStyles = cva(
  'block relative w-full [&_img]:object-cover [&_img]:object-center md:rounded-2xl overflow-hidden',
  {
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
  },
)

export default function FeaturedImage({
  caption,
  captionText,
  desktopAspectRatio,
  mobileAspectRatio,
  ...rest
}: GetBlockProps<'featuredImage'>) {
  const desktopImage = rest.desktopImage as Media
  const mobileImage = rest.mobileImage as Media

  const { props: desktopProps } = getImageProps({
    fill: true,
    src: desktopImage.url!,
    alt: desktopImage.alt,
    sizes: '100vw',
    preload: true,
  })

  const { props: mobileProps } = getImageProps({
    fill: true,
    src: mobileImage.url!,
    alt: mobileImage.alt,
    sizes: '100vw',
    preload: true,
  })

  return (
    <div className="w-full md:px-6 py-12">
      <div className="md:max-w-3xl mx-auto">
        <picture className={containerStyles({ desktopAspectRatio, mobileAspectRatio })}>
          <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} />
          <source media="(max-width: 767px)" srcSet={mobileProps.srcSet} />
          <img {...mobileProps} />
        </picture>
        {caption === 'on' && captionText && (
          <p className="mt-4 text-center text-gray-400 text-sm max-md:px-6">{captionText}</p>
        )}
      </div>
    </div>
  )
}
