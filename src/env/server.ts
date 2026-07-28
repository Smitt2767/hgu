import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    PREVIEW_SECRET: z.string().min(1),
    // Injected automatically by Vercel once a Blob store is linked to the project.
    // Optional on purpose: when it is absent the storage adapter disables itself and
    // uploads fall back to the local filesystem, which is what we want in dev.
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
