import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum__articles_v_version_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum_videos_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum__videos_v_version_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum_pages_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum__pages_v_version_stage" AS ENUM('internal', 'alpha', 'beta');
  CREATE TYPE "public"."enum_users_preview_stages" AS ENUM('alpha', 'beta');
  CREATE TABLE "users_preview_stages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_preview_stages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "articles" ADD COLUMN "stage" "enum_articles_stage" DEFAULT 'internal';
  ALTER TABLE "_articles_v" ADD COLUMN "version_stage" "enum__articles_v_version_stage" DEFAULT 'internal';
  ALTER TABLE "videos" ADD COLUMN "stage" "enum_videos_stage" DEFAULT 'internal';
  ALTER TABLE "_videos_v" ADD COLUMN "version_stage" "enum__videos_v_version_stage" DEFAULT 'internal';
  ALTER TABLE "pages" ADD COLUMN "stage" "enum_pages_stage" DEFAULT 'internal';
  ALTER TABLE "_pages_v" ADD COLUMN "version_stage" "enum__pages_v_version_stage" DEFAULT 'internal';
  ALTER TABLE "users_preview_stages" ADD CONSTRAINT "users_preview_stages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_preview_stages_order_idx" ON "users_preview_stages" USING btree ("order");
  CREATE INDEX "users_preview_stages_parent_idx" ON "users_preview_stages" USING btree ("parent_id");
  CREATE INDEX "articles_stage_idx" ON "articles" USING btree ("stage");
  CREATE INDEX "_articles_v_version_version_stage_idx" ON "_articles_v" USING btree ("version_stage");
  CREATE INDEX "videos_stage_idx" ON "videos" USING btree ("stage");
  CREATE INDEX "_videos_v_version_version_stage_idx" ON "_videos_v" USING btree ("version_stage");
  CREATE INDEX "pages_stage_idx" ON "pages" USING btree ("stage");
  CREATE INDEX "_pages_v_version_version_stage_idx" ON "_pages_v" USING btree ("version_stage");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_preview_stages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_preview_stages" CASCADE;
  DROP INDEX "articles_stage_idx";
  DROP INDEX "_articles_v_version_version_stage_idx";
  DROP INDEX "videos_stage_idx";
  DROP INDEX "_videos_v_version_version_stage_idx";
  DROP INDEX "pages_stage_idx";
  DROP INDEX "_pages_v_version_version_stage_idx";
  ALTER TABLE "articles" DROP COLUMN "stage";
  ALTER TABLE "_articles_v" DROP COLUMN "version_stage";
  ALTER TABLE "videos" DROP COLUMN "stage";
  ALTER TABLE "_videos_v" DROP COLUMN "version_stage";
  ALTER TABLE "pages" DROP COLUMN "stage";
  ALTER TABLE "_pages_v" DROP COLUMN "version_stage";
  DROP TYPE "public"."enum_articles_stage";
  DROP TYPE "public"."enum__articles_v_version_stage";
  DROP TYPE "public"."enum_videos_stage";
  DROP TYPE "public"."enum__videos_v_version_stage";
  DROP TYPE "public"."enum_pages_stage";
  DROP TYPE "public"."enum__pages_v_version_stage";
  DROP TYPE "public"."enum_users_preview_stages";`)
}
