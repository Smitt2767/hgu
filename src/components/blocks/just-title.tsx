import { GetBlockProps } from '@/types/blocks'

import { cva } from 'class-variance-authority'
import HighlightedText from '../ui/highlighted-text'

const headingStyles = cva('text-foreground', {
  variants: {
    level: {
      h1: 'text-4xl',
      h2: 'text-2xl',
      h3: 'text-xl',
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    fontFamily: {
      oswald: 'font-oswald',
      merriweather: 'font-merriweather',
    },
  },
})

export default function JustTitle({
  fontFamily,
  titleText,
  headingLevel,
  highlightedWords,
  textAlignment,
  textColor,
}: GetBlockProps<'justTitle'>) {
  const Heading = headingLevel

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Heading
          className={headingStyles({ alignment: textAlignment, fontFamily, level: headingLevel })}
          style={{ ...(textColor && { color: textColor }) }}
        >
          <HighlightedText text={titleText} words={highlightedWords} />
        </Heading>
      </div>
    </div>
  )
}
