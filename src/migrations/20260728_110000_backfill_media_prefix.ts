import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Data-only migration; no schema change.
//
// media.prefix is nullable, and rows created before Media gave the field a
// defaultValue/beforeChange hook hold null. The Vercel Blob adapter defaults the
// value with `prefix = ''`, which only covers undefined, so a null flows into
// `path.posix.join(null, filename)` and throws. That surfaces as a 500 on the Media
// list view (via generateURL) and on delete (via handleDelete).
//
// Collapse the nulls to the empty string the adapter expects. Idempotent.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "media" SET "prefix" = '' WHERE "prefix" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "media" SET "prefix" = NULL WHERE "prefix" = '';
  `)
}
