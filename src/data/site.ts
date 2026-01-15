import { getTypedLocale } from '@/utils/i18n'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getSiteData = cache(async (locale: string) => {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({
      slug: 'site',
      depth: 2,
      locale: getTypedLocale(locale),
    })
  } catch {
    return null
  }
})
