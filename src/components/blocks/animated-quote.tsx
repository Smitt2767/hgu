import { GetBlockProps } from '@/types/blocks'
import { cva } from 'class-variance-authority'
import Background from '../ui/background'
import HighlightedText from '../ui/highlighted-text'

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

export default function AnimatedQuote({
  quote,
  author,
  backgroundColor,
  backgroundImage,
  backgroundType,
  backgroundVideo,
  desktopAspectRatio,
  mobileAspectRatio,
  highlightedWords,
}: GetBlockProps<'animatedQuote'>) {
  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className={containerStyles({ desktopAspectRatio, mobileAspectRatio })}>
          <Background
            type={backgroundType}
            color={backgroundColor}
            image={backgroundImage}
            video={backgroundVideo}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between gap-8 p-8">
            <blockquote className="text-4xl md:text-4xl font-light leading-relaxed text-gray-400 text-center">
              <span className="text-primary">"</span>
              <HighlightedText text={quote} words={highlightedWords} />
              <span className="text-primary">"</span>
            </blockquote>
            <p className="text-lg font-bold text-white">{author}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
