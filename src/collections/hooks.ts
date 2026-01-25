import { Article, Page, Video } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

type RevalidatableCollection = Page | Article | Video

type AfterChangeArgs<T extends RevalidatableCollection> = Parameters<
  CollectionAfterChangeHook<T>
>[0]
type AfterDeleteArgs<T extends RevalidatableCollection> = Parameters<
  CollectionAfterDeleteHook<T>
>[0]

export function createRevalidateHook<T extends RevalidatableCollection>(tag: string) {
  return function revalidate({ doc, context }: AfterChangeArgs<T> | AfterDeleteArgs<T>): T {
    if (!context.disableRevalidate && doc._status === 'published') {
      revalidateTag(`${tag}:${doc.slug}`, 'max')
    }
    return doc
  }
}

export const revalidatePage = createRevalidateHook('pages')
export const revalidateVideo = createRevalidateHook('pages:videos')
export const revalidateArticle = createRevalidateHook('pages:articles')
