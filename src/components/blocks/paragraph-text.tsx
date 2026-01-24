import { GetBlockProps } from '@/types/blocks'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { cva } from 'class-variance-authority'
import HighlightedRichText from '../ui/highlighted-rich-text'

const textStyles = cva('text-foreground', {
  variants: {
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    size: {
      body: '',
      smallText: 'text-xs',
    },
  },
})

export default function ParagraphText({
  content,
  highlightedWords,
  textAlignment,
  textColor,
  textSize,
}: GetBlockProps<'paragraphText'>) {
  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <HighlightedRichText
          className={textStyles({ alignment: textAlignment, size: textSize })}
          style={{ ...(textColor && { color: textColor }) }}
          content={convertLexicalToHTML({ data: content })}
          words={highlightedWords}
        />
      </div>
    </div>
  )
}
