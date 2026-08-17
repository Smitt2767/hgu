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
    // GrowthBook SDK client key, from the SDK Connection in the dashboard. Optional
    // so the app still builds and renders without it — every flag falls back to its
    // declared default. Local and production share one connection, so this is the
    // same value in .env and in Vercel.
    GROWTHBOOK_CLIENT_KEY: z.string().min(1).optional(),
    GROWTHBOOK_API_HOST: z.url().default('https://cdn.growthbook.io'),
    // Shared secret for the GrowthBook SDK Webhook that expires the cached
    // ruleset. Read it from SDK Configuration → SDK Connections; used as the raw
    // HMAC key, not base64-decoded.
    GROWTHBOOK_WEBHOOK_SECRET: z.string().min(1).optional(),
    // Signs precomputed URL segments, and gates /api/flags/debug in production.
    // 32 random bytes, base64url. Optional, but without it nothing is prebuilt and
    // every request renders on demand — the build says so rather than looking fine.
    FLAGS_SECRET: z.string().min(1).optional(),
    // Origin of the GrowthBook Managed Warehouse ingest endpoint, region-specific:
    // https://us1.gb-ingest.com or https://eu-west-1.gb-ingest.com. Provision the
    // warehouse in GrowthBook (Settings → one click) to find out which.
    //
    // Optional, and while it is unset exposure events are counted and logged but not
    // sent. That is the useful failure: an experiment silently recording nothing looks
    // exactly like an experiment nobody has entered yet.
    //
    // Authentication is GROWTHBOOK_CLIENT_KEY on the query string, which is why this
    // is read on the server and never shipped to the browser — that key also fetches
    // the full ruleset, so exposing it hands over every flag rule in the project.
    GROWTHBOOK_INGEST_HOST: z.url().optional(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
