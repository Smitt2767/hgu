'use client'

import { cn } from '@/lib/utils'
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
}

export function TextLinkButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className,
  external = false,
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
      <ArrowRight className={arrowStyles} />
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseStyles}>
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
