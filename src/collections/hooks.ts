import { Article, Page, Video } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

type PageAfterChangeArgs = Parameters<CollectionAfterChangeHook<Page>>[0]
type PageAfterDeleteArgs = Parameters<CollectionAfterDeleteHook<Page>>[0]

export function revalidatePage(args: PageAfterChangeArgs): Page
export function revalidatePage(args: PageAfterDeleteArgs): Page
export function revalidatePage({ doc, context }: PageAfterChangeArgs | PageAfterDeleteArgs): Page {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidateTag(`pages:${doc.slug}`, 'max')
  }
  return doc
}

type VideoAfterChangeArgs = Parameters<CollectionAfterChangeHook<Video>>[0]
type VideoAfterDeleteArgs = Parameters<CollectionAfterDeleteHook<Video>>[0]

export function revalidateVideo(args: VideoAfterChangeArgs): Video
export function revalidateVideo(args: VideoAfterDeleteArgs): Video
export function revalidateVideo({
  doc,
  context,
}: VideoAfterChangeArgs | VideoAfterDeleteArgs): Video {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidateTag(`pages:videos:${doc.slug}`, 'max')
  }
  return doc
}

type ArticleAfterChangeArgs = Parameters<CollectionAfterChangeHook<Article>>[0]
type ArticleAfterDeleteArgs = Parameters<CollectionAfterDeleteHook<Article>>[0]

export function revalidateArticle(args: ArticleAfterChangeArgs): Article
export function revalidateArticle(args: ArticleAfterDeleteArgs): Article
export function revalidateArticle({
  doc,
  context,
}: ArticleAfterChangeArgs | ArticleAfterDeleteArgs): Article {
  if (!context.disableRevalidate && doc._status === 'published') {
    revalidateTag(`pages:articles:${doc.slug}`, 'max')
  }
  return doc
}
