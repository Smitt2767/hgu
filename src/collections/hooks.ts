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
  return function revalidate(args: AfterChangeArgs<T> | AfterDeleteArgs<T>): T {
    const { doc, context } = args

    // Unpublishing — including pulling a live document back to a pre-release stage —
    // flips `_status` to `draft`, so keying only off the new status would leave the
    // last published HTML in the cache indefinitely.
    const wasPublished = 'previousDoc' in args && args.previousDoc?._status === 'published'

    if (!context.disableRevalidate && (doc._status === 'published' || wasPublished)) {
      revalidateTag(`${tag}:${doc.slug}`, 'max')
      revalidateTag('sitemap', 'max')
    }
    return doc
  }
}

export const revalidatePage = createRevalidateHook('pages')
export const revalidateVideo = createRevalidateHook('pages:videos')
export const revalidateArticle = createRevalidateHook('pages:articles')
