'use client'

import { cn } from '@/lib/utils'
import { Article, Link as LinkType, Page, Video } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

interface TextLinkButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  external?: boolean
  target?: React.HTMLAttributeAnchorTarget
  showArrow?: boolean
}

type GetTextLinkButtonProps = {
  link?: number | LinkType | null
  children?: React.ReactNode
}

export const getTextLinkButtonProps = ({
  link,
  children,
}: GetTextLinkButtonProps): TextLinkButtonProps | null => {
  if (!link || typeof link !== 'object') return null

  const commonProps = {
    children: children ?? link.label,
    target: link.newTab ? '_blank' : '_self',
  } satisfies TextLinkButtonProps

  if (link.type === 'custom') {
    return {
      href: link.url!,
      ...commonProps,
    }
  }

  if (link.type === 'reference') {
    const href =
      link.reference?.relationTo === 'articles'
        ? `/articles/${(link.reference.value as Article).slug}`
        : link.reference?.relationTo === 'videos'
          ? `/videos/${(link.reference.value as Video).slug}`
          : `/${(link.reference?.value as Page).slug}`

    return { href, ...commonProps }
  }

  if (link.type === 'static') {
    return {
      href: link.staticPage ?? '/',
      ...commonProps,
    }
  }

  return null
}

export function TextLinkButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className,
  external = false,
  target,
  showArrow = false,
}: TextLinkButtonProps) {
  const baseStyles = cn(
    'group inline-flex items-center gap-3 font-display text-base lg:text-lg font-bold uppercase tracking-wider px-6 py-3 rounded-full border border-gray-700 text-white transition-all duration-200 hover:border-white',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  )

  const arrowStyles =
    'w-4 h-4 lg:w-5 lg:h-5 text-white transition-all duration-200 group-hover:text-primary group-hover:translate-x-1'

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className={arrowStyles} />}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target={target} rel="noopener noreferrer" className={baseStyles}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseStyles}>
      {content}
    </button>
  )
}
