import { useCallback, useRef, useState } from 'react'

import { copyToClipboard } from '@/lib/utils'

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text)

      if (success) {
        setIsCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsCopied(false), timeout)
      }

      return success
    },
    [timeout],
  )

  return { isCopied, copy }
}
