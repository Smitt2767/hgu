import { cacheLife } from 'next/cache'

/**
 * Reads a route's params without making the route dynamic.
 *
 * Under Cache Components `params` is runtime data, so awaiting it in a page or layout
 * body fails the prerender outright — even though `generateStaticParams` enumerates
 * every value. Handing the *unresolved* promise to a `use cache` scope and awaiting it
 * inside is what makes the read legal.
 *
 * This is also the contract `partialPrefetching` enforces. With it on, a prefetch
 * fetches only a route's static shell, so the shell must render without reading the
 * URL; a direct `await params` stops being a warning and becomes an error.
 *
 * `cacheLife('max')` because this is a pure function of the segment and can never go
 * stale. Only pass params through here — anything request-scoped belongs behind
 * `<Suspense>` instead, and putting it in a shared cache entry would serve one
 * visitor's data to the next.
 */
export async function readRouteParams<T>(params: Promise<T>): Promise<T> {
  'use cache'
  cacheLife('max')

  return await params
}
