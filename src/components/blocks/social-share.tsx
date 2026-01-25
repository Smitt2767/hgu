'use client'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useShare } from '@/hooks/use-share'
import { cn } from '@/lib/utils'
import { GetBlockProps } from '@/types/blocks'
import { CheckIcon, CopyIcon, Share2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TextLinkButton } from '../ui/text-link-button'

export default function SocialShare({
  showTitle,
  title,
  shareURL,
  shareButton,
  shareText,
}: GetBlockProps<'socialShare'>) {
  const { copy, isCopied } = useCopyToClipboard()
  const { share, isCopied: isShareCopied } = useShare()
  const t = useTranslations('blocks.socialShare')

  const handleCopyText = () => {
    if (isCopied) return
    copy(shareURL || location.href)
  }

  const handleShare = () => {
    share({
      title: title || document.title,
      url: shareURL || location.href,
      text: shareText || '',
    })
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8">
          {showTitle && (
            <h3 className="text-lg md:text-xl font-bold text-white text-center max-w-md mx-auto leading-relaxed">
              {title}
            </h3>
          )}
          <div className="flex items-center justify-center gap-4">
            <TextLinkButton
              className={cn(
                'uppercase flex items-center gap-3',
                isCopied &&
                  'bg-primary text-primary-foreground border-primary hover:border-primary',
              )}
              onClick={handleCopyText}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />} {isCopied ? t('copied') : t('copyLink')}
            </TextLinkButton>
            <TextLinkButton
              className={cn(
                'p-3',
                isShareCopied &&
                  'bg-primary text-primary-foreground border-primary hover:border-primary',
              )}
              onClick={handleShare}
            >
              {isShareCopied ? <CheckIcon /> : <Share2Icon />}
              <span className="sr-only">{isShareCopied ? t('copied') : shareButton}</span>
            </TextLinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
