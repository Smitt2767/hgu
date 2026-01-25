'use client'

import useModal from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import { Article } from '@/payload-types'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { MoonIcon, SunIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ComponentProps, useState } from 'react'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer'
import { getTextLinkButtonProps, TextLinkButton } from '../ui/text-link-button'

type ArticleDrawerProps = { article: Article; showReadMore?: boolean | null } & Required<
  Pick<ComponentProps<typeof Drawer>, 'open' | 'onOpenChange'>
>

function ArticleDrawer({ open, article, showReadMore, onOpenChange }: ArticleDrawerProps) {
  const [dark, setDark] = useState(true)
  const t = useTranslations('components.article')

  const linkButtonProps = getTextLinkButtonProps({ link: article.referenceLink })

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={cn('max-w-3xl mx-auto', !dark && 'light')}>
        <DrawerTitle className="sr-only">{article.title}</DrawerTitle>
        <DrawerHeader className="flex flex-row items-center justify-between border-b pt-0">
          <Button
            variant="secondary"
            size="icon-lg"
            className="rounded-full"
            onClick={() => setDark((prev) => !prev)}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            variant="secondary"
            size="icon-lg"
            className="rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <XIcon />
          </Button>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          <div className="relative overflow-hidden aspect-video rounded-2xl mb-4">
            {article.image && typeof article.image === 'object' && (
              <Image alt={article.image.alt} src={article.image.url!} fill sizes="100vw" priority />
            )}
          </div>
          <h2 className="font-sans text-2xl font-bold text-foreground mb-8">{article.title}</h2>
          {article.content && (
            <div
              className={cn('prose prose-sm mb-6', dark ? 'prose-invert' : 'prose-neutral')}
              dangerouslySetInnerHTML={{
                __html: convertLexicalToHTML({ data: article.content }),
              }}
            />
          )}
          {showReadMore && (
            <>
              <div className="border-b h-px mb-6" />
              <TextLinkButton
                className="bg-primary border-primary text-primary-foreground hover:border-primary px-5 y-1 text-sm!"
                {...linkButtonProps}
              >
                {t('readMore')}
              </TextLinkButton>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function ArticleCard({
  article,
  showTitle,
  showDescription,
  showReadMore,
  className,
}: {
  showTitle?: boolean | null
  showDescription?: boolean | null
  showReadMore?: boolean | null
  article?: Article | number | null
  className?: string
}) {
  const modal = useModal()
  const t = useTranslations('components.article')

  if (!article || typeof article !== 'object') return null

  const handleArticleRead = () => {
    modal.open()
  }

  return (
    <>
      <ArticleDrawer
        article={article}
        showReadMore={showReadMore}
        open={modal.isOpen}
        onOpenChange={(open) => (open ? modal.open() : modal.close())}
      />
      <article
        role="button"
        tabIndex={0}
        onClick={handleArticleRead}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleArticleRead()
          }
        }}
        aria-label={t('readArticleAriaLabel', { title: article.title })}
        className={cn(
          'relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group bg-card focus-visible:bg-border hover:bg-border',
          className,
        )}
      >
        <div className="relative overflow-hidden aspect-video">
          {article.image && typeof article.image === 'object' && (
            <Image alt={article.image.alt} src={article.image.url!} fill sizes="100vw" priority />
          )}
        </div>
        <div className="p-6">
          {showTitle && (
            <h3 className="font-sans text-xl font-bold text-foreground mb-2 group-hover:text-primary group-focus-visible:text-primary transition-colors">
              {article.title}
            </h3>
          )}
          {showDescription && article.content && (
            <p className="font-sans text-sm text-gray-400 line-clamp-2">
              {convertLexicalToPlaintext({ data: article.content })}
            </p>
          )}
        </div>
      </article>
    </>
  )
}
