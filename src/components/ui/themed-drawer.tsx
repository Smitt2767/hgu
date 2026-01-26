'use client'

import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon, XIcon } from 'lucide-react'
import { ComponentProps, ReactNode, useState } from 'react'
import { Button } from './button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './drawer'

type ThemedDrawerProps = {
  title: string
  className?: string
  children: ReactNode | ((isDark: boolean) => ReactNode)
} & Required<Pick<ComponentProps<typeof Drawer>, 'open' | 'onOpenChange'>>

export function ThemedDrawer({
  open,
  onOpenChange,
  title,
  className,
  children,
}: ThemedDrawerProps) {
  const [dark, setDark] = useState(true)

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={cn('max-w-3xl mx-auto', !dark && 'light', className)}>
        <DrawerTitle className="sr-only">{title}</DrawerTitle>
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
        {typeof children === 'function' ? children(dark) : children}
      </DrawerContent>
    </Drawer>
  )
}
