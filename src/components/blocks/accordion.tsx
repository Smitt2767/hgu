'use client'

import { cn } from '@/lib/utils'
import { GetBlockProps } from '@/types/blocks'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// TODO: handle gsap animations
export default function Accordion({ headerText, items }: GetBlockProps<'accordion'>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!items.length) {
    return null
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {headerText && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            {headerText}
          </h2>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="accordion-item bg-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className={cn(
                  'w-full flex items-center justify-between p-6 text-left group',
                  openIndex === index ? 'rounded-t-2xl' : 'rounded-2xl',
                )}
              >
                <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors pr-4">
                  {item.questionText}
                </span>
                <ChevronDown
                  className={cn(
                    'w-6 h-6 text-gray-400 transition-transform duration-300 shrink-0',
                    openIndex === index && 'rotate-180 text-primary',
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0',
                )}
              >
                <div
                  className="px-6 pb-6 text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: convertLexicalToHTML({ data: item.answerText }),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
