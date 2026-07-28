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
    // Owned by @payloadcms/storage-vercel-blob, declared here on purpose.
    //
    // That adapter normally injects this field itself, and its `alwaysInsertFields`
    // option is documented to inject it even when the adapter is disabled — but in
    // 3.71.1 the Vercel Blob wrapper returns the config early when no
    // BLOB_READ_WRITE_TOKEN is set, before the option is ever honoured. So the field
    // would exist in the schema on Vercel and not locally, and a migration generated
    // on a dev machine would emit `DROP COLUMN prefix` against production.
    //
    // Declaring it ourselves makes the schema token-independent. The adapter detects
    // the existing field and merges into it rather than duplicating it.
    // It must never be null. The adapter reads it back with `prefix = ''` and
    // `{ prefix = '' }` defaults, which only cover `undefined` — a null reaches
    // `path.posix.join(null, filename)` and throws `The "path" argument must be of
    // type string`. That breaks `generateURL` (so the admin list view 500s) and
    // `handleDelete`. Only `handleUpload` is null-safe, via `data.prefix || prefix`,
    // which is why a null row uploads fine and then fails on read.
    //
    // defaultValue alone is not enough: it applies only when the incoming value is
    // undefined, and the admin submits this hidden field as null. The hook is what
    // actually guarantees a string. Both survive the adapter's field merge, which
    // overrides defaultValue but spreads the rest of this definition through.
    {
      name: 'prefix',
      type: 'text',
      defaultValue: '',
      admin: {
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [({ value }) => value ?? ''],
      },
    },
  ],
  upload: true,
}
