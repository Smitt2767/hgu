import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { getPayload, type TypedUser } from 'payload'
import { cache } from 'react'

/**
 * Resolves the Payload account behind the current request from its `payload-token`
 * cookie.
 *
 * Draft mode on its own identifies nobody. Enabling it sets `__prerender_bypass`
 * to a single shared `previewModeId` (see
 * `next/dist/server/async-storage/draft-mode-provider.js`), so the moment any
 * tester has draft mode on they can request every other URL on the site and get a
 * live render. The stage gate therefore has to hang off the authenticated user,
 * which is why each preview fetch runs with `overrideAccess: false` and passes
 * this through for `canReadStaged` to evaluate.
 *
 * Only ever call this behind `draftMode().isEnabled`. Reading headers is a
 * request-time operation: doing it on the public path would opt the route out of
 * prerendering entirely and send every anonymous visitor through the server.
 */
export const getPreviewUser = cache(async (): Promise<TypedUser | null> => {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await getHeaders() })
    return user ?? null
  } catch {
    return null
  }
})
