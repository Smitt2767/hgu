import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// Read-only / inspection config for Drizzle Studio.
//
// Payload owns this database: it generates the Drizzle schema at runtime from the
// collections in src/payload.config.ts and applies changes via `payload migrate`.
// So `schema` and `out` are intentionally omitted — that keeps `drizzle-kit push`
// and `drizzle-kit generate` unusable here, since either would fight Payload's
// migrations. Studio introspects the live database directly and needs neither.
//
// Run `pnpm generate:db-schema` if you want a typed schema file for `payload.db.drizzle`.
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
