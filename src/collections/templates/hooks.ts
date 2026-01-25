import { Template } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import {
  Access,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
} from 'payload'

/**
 * Prevents deletion of templates marked as default.
 * Default templates are system templates that should always be available.
 */
export const preventDefaultTemplateDeletion: CollectionBeforeDeleteHook = async ({ req, id }) => {
  const template = await req.payload.findByID({
    collection: 'templates',
    id,
  })

  if (template?.isDefault) {
    throw new Error('Cannot delete a default template. Remove the "Default Template" flag first.')
  }
}

/**
 * Ensures only one template per content type can be marked as system default.
 * When a template is marked as system default, unmarks any other templates of the same content type.
 */
export const ensureSingleSystemDefault: CollectionBeforeChangeHook<Template> = async ({
  data,
  req,
  originalDoc,
}) => {
  // Only run if isSystemDefault is being set to true
  if (!data.isSystemDefault) return data

  // If it was already system default, no need to update others
  if (originalDoc?.isSystemDefault) return data

  const contentType = data.contentType || originalDoc?.contentType
  if (!contentType) return data

  // Find and unset any existing system default for this content type
  const existingDefaults = await req.payload.find({
    collection: 'templates',
    where: {
      and: [{ contentType: { equals: contentType } }, { isSystemDefault: { equals: true } }],
    },
    limit: 100,
  })

  // Unset isSystemDefault on all existing defaults
  for (const template of existingDefaults.docs) {
    if (template.id !== originalDoc?.id) {
      await req.payload.update({
        collection: 'templates',
        id: template.id,
        data: { isSystemDefault: false },
        context: { disableRevalidate: true },
      })
    }
  }

  return data
}

/**
 * Revalidates cache when a template is changed or deleted.
 * Also revalidates all content that might use this template.
 */
export const revalidateTemplate: CollectionAfterChangeHook<Template> &
  CollectionAfterDeleteHook<Template> = ({ doc, context }) => {
  if (!context.disableRevalidate) {
    // Revalidate this specific template
    revalidateTag(`templates:${doc.id}`, 'max')

    // If this is a system default, revalidate the default tag
    if (doc.isSystemDefault) {
      revalidateTag(`templates:default:${doc.contentType}`, 'max')
    }

    // Revalidate all content of this type since template changed
    // This ensures pages using this template get re-rendered
    if (doc.contentType === 'videos') {
      revalidateTag('pages:videos', 'max')
    } else if (doc.contentType === 'articles') {
      revalidateTag('pages:articles', 'max')
    }
  }
  return doc
}

/**
 * Access control for deleting templates.
 * Only admins can delete, and default templates cannot be deleted.
 */
export const canDeleteTemplate: Access<Template> = async ({ req: { user, payload }, id }) => {
  // Only admins can delete templates
  if (user?.role !== 'admin') return false

  // Check if attempting to delete a default template
  if (id) {
    const template = await payload.findByID({
      collection: 'templates',
      id,
    })
    // Prevent deletion of default templates
    if (template?.isDefault) return false
  }

  return true
}
