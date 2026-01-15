import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    PREVIEW_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
