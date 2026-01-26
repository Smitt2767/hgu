import { mobileAndDesktopRatioStyleVariants } from '@/constants'
import { cn } from '@/lib/utils'
import { GetBlockProps } from '@/types/blocks'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import HighlightedRichText from '../ui/highlighted-rich-text'

const containerStyles = cva(
  'block relative w-full [&_img]:object-cover [&_img]:object-center overflow-hidden',
  {
    variants: {
      ...mobileAndDesktopRatioStyleVariants,
      backgroundType: {
        color: 'bg-card',
        image: 'bg-black',
        video: 'bg-black',
        none: 'bg-transparent',
      },
    },
  },
)
export default function JustText({
  content,
  backgroundColor,
  backgroundImage,
  backgroundType,
  desktopAspectRatio,
  mobileAspectRatio,
  textAlignment,
  progressBar,
  textColor,
  verticalAlignment,
  highlightedWords,
  backgroundVideo,
}: GetBlockProps<'justText'>) {
  console.log({ verticalAlignment })
  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto">
        <div
          style={{ ...(backgroundType === 'color' && backgroundColor && { backgroundColor }) }}
          className={containerStyles({ desktopAspectRatio, mobileAspectRatio, backgroundType })}
        >
          {/* Background Image */}
          {backgroundType === 'image' && backgroundImage && typeof backgroundImage === 'object' && (
            <>
              <Image
                fill
                priority
                sizes="100vw"
                alt={backgroundImage.alt}
                src={backgroundImage.url!}
                className="object-cover object-center opacity-40 pointer-events-none"
              />
            </>
          )}

          {/* Background Video */}
          {backgroundType === 'video' && backgroundVideo && typeof backgroundVideo === 'object' && (
            <>
              <video
                loop
                autoPlay
                playsInline
                muted
                preload="auto"
                src={backgroundVideo.url!}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-40 pointer-events-none"
              />
            </>
          )}

          {/* Text Content */}
          <HighlightedRichText
            content={convertLexicalToHTML({ data: content })}
            words={highlightedWords}
            className={cn('text-foreground h-full flex flex-col pt-20 px-12 absolute inset-0', {
              'text-center': textAlignment === 'centered',
              'text-left': textAlignment === 'left',
              'justify-center pt-0': verticalAlignment === 'center',
            })}
            style={{ ...(textColor && { color: textColor }) }}
          />
        </div>
      </div>
    </div>
  )
}
