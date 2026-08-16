import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from './flags/constants'
import { routing } from './i18n/routing'

const handleI18n = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  const response = handleI18n(request)

  // Mint the anonymous visitor id here because this is the only place that can.
  // A Server Component may not set a cookie, so an id created during render would
  // never reach the browser — every request would look like a new visitor and no
  // experiment could hold anyone in a bucket for longer than one page view.
  if (!request.cookies.get(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: VISITOR_COOKIE_MAX_AGE,
    })
  }

  return response
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|next|admin|trpc|_next|_vercel|.*\\..*).*)',
}
