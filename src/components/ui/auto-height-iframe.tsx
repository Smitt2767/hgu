'use client'

import { useCallback, useRef, useState } from 'react'

interface AutoHeightIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string
  minHeight?: number
}

export function AutoHeightIframe({ src, minHeight = 300, style, ...props }: AutoHeightIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number>(minHeight)

  const updateHeight = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const contentHeight = iframe.contentWindow?.document.body.scrollHeight
      if (contentHeight && contentHeight > minHeight) {
        setHeight(contentHeight)
      }
    } catch {
      // Cross-origin: cannot access iframe content directly
    }
  }, [minHeight])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      onLoad={updateHeight}
      style={{ ...style, height: `${height}px` }}
      {...props}
    />
  )
}
