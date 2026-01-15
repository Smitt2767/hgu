import { Page } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

type AfterChangeArgs = Parameters<CollectionAfterChangeHook<Page>>[0]
type AfterDeleteArgs = Parameters<CollectionAfterDeleteHook<Page>>[0]

export function revalidatePage(args: AfterChangeArgs): Page
export function revalidatePage(args: AfterDeleteArgs): Page
export function revalidatePage({ doc, context }: AfterChangeArgs | AfterDeleteArgs): Page {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidateTag(`pages:${doc.slug}`, 'max')
  }
  return doc
}
