import { useCallback } from 'react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { nativeShare } from '@/lib/utils'

export function useShare() {
  const { isCopied, copy } = useCopyToClipboard()

  const share = useCallback(
    async (data: ShareData) => {
      const shared = await nativeShare(data)
      if (!shared) {
        return copy(data.url ?? data.text ?? '')
      }
      return shared
    },
    [copy],
  )

  return { isCopied, share }
}
