import { CSSProperties } from 'react'

type HighlightedRichTextProps = {
  className?: string
  style?: CSSProperties
  content: string
  words?: string | null
}

// Helper function to highlight text in HTML (server-safe)
const highlightInHTML = (content: string, wordsToHighlight: string[]): string => {
  if (!content || wordsToHighlight.length === 0) return content

  // Escape special regex characters in words
  const escapedWords = wordsToHighlight.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  // Create pattern for matching words
  const pattern = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi')

  // Process HTML content while preserving tags
  // Split by HTML tags
  const htmlParts = content.split(/(<[^>]+>)/g)

  const processedParts = htmlParts.map((part) => {
    // If it's an HTML tag, return as-is
    if (part.startsWith('<') && part.endsWith('>')) {
      return part
    }

    // If it's text content, highlight words
    return part.replace(pattern, (match) => {
      return `<span class="text-primary">${match}</span>`
    })
  })

  return processedParts.join('')
}

export default function HighlightedRichText({
  content,
  words,
  className,
  style,
}: HighlightedRichTextProps) {
  if (!content) return null

  // Parse comma-separated words and trim whitespace
  const wordsToHighlight = words
    ? words
        .split(',')
        .map((word) => word.trim())
        .filter((word) => word)
    : []

  const highlightedContent = highlightInHTML(content, wordsToHighlight)

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
      suppressHydrationWarning
    />
  )
}
