import React from 'react'

type HighlightedTextProps = {
  text: string
  words?: string | null
}

export default function HighlightedText({ text, words }: HighlightedTextProps) {
  if (!text) return null

  // Parse comma-separated words and trim whitespace
  const wordsToHighlight = words
    ? words
        .split(',')
        .map((word) => word.trim())
        .filter((word) => word)
    : []

  if (wordsToHighlight.length === 0) {
    return <>{text}</>
  }

  // Create a regex pattern that matches any of the highlighted words (case-insensitive)
  const pattern = new RegExp(
    `\\b(${wordsToHighlight.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi',
  )

  // Split text by the pattern while keeping the matched words
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null

        // Check if this part matches any highlighted word (case-insensitive)
        const isHighlighted = wordsToHighlight.some(
          (word) => word.toLowerCase() === part.toLowerCase(),
        )

        return isHighlighted ? (
          <span key={index} className="text-primary">
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      })}
    </>
  )
}
