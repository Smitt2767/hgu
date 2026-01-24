import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function nativeShare(data: ShareData): Promise<boolean> {
  try {
    await navigator.share(data)
    return true
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return true
    }
    return false
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
