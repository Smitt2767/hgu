import { canCreate, canDelete, canUpdate } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Upload and manage images, videos, and other media files.',
  },
  access: {
    read: () => true,
    create: canCreate,
    update: canUpdate,
    delete: canDelete,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
