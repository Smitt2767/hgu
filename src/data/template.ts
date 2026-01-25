import { ContentType } from '@/collections/shared/template-fields'
import { getTypedLocale } from '@/utils/i18n'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'

/**
 * Fetches a specific template by ID with full depth for blocks.
 */
export const getTemplate = cache(async (id: number, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('templates', `templates:${id}`)

  try {
    const payload = await getPayload({ config })

    const template = await payload.findByID({
      collection: 'templates',
      id,
      locale: getTypedLocale(locale),
      depth: 2, // Populate block relationships
    })

    return template ?? null
  } catch {
    return null
  }
})

/**
 * Fetches the system default template for a given content type.
 * This is used when no template is explicitly selected for a piece of content.
 */
export const getDefaultTemplate = cache(async (contentType: ContentType, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('templates', `templates:default:${contentType}`)

  try {
    const payload = await getPayload({ config })

    const templates = await payload.find({
      collection: 'templates',
      locale: getTypedLocale(locale),
      where: {
        and: [{ contentType: { equals: contentType } }, { isSystemDefault: { equals: true } }],
      },
      depth: 2, // Populate block relationships
      limit: 1,
    })

    return templates.docs[0] ?? null
  } catch {
    return null
  }
})

/**
 * Fetches all templates for a given content type.
 * Useful for template selection dropdowns.
 */
export const getTemplatesByContentType = cache(async (contentType: ContentType, locale: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('templates')

  try {
    const payload = await getPayload({ config })

    const templates = await payload.find({
      collection: 'templates',
      locale: getTypedLocale(locale),
      where: {
        contentType: { equals: contentType },
      },
      limit: 100,
    })

    return templates.docs
  } catch {
    return []
  }
})

/**
 * Fetches a template by ID with draft mode support.
 * Used for template preview pages.
 */
export const getTemplateById = async (id: string, locale: string, draft = false) => {
  try {
    const payload = await getPayload({ config })

    const template = await payload.findByID({
      collection: 'templates',
      id,
      locale: getTypedLocale(locale),
      depth: 2,
      draft,
    })

    return template ?? null
  } catch {
    return null
  }
}
