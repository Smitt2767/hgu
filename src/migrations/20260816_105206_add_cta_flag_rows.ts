import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_flag_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_flag_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_flag_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_flag_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TABLE "pages_blocks_cta_flag_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"when_value" varchar,
  	"render" boolean DEFAULT true,
  	"orphaned" boolean DEFAULT false,
  	"overrides_show_title" "enum_flag_cta_show_title",
  	"overrides_link_id" integer,
  	"overrides_background_type" "enum_flag_cta_background_type",
  	"overrides_background_color" varchar,
  	"overrides_background_image_id" integer,
  	"overrides_background_video_id" integer,
  	"overrides_desktop_aspect_ratio" "enum_flag_cta_desktop_aspect_ratio",
  	"overrides_mobile_aspect_ratio" "enum_flag_cta_mobile_aspect_ratio"
  );
  
  CREATE TABLE "pages_blocks_cta_flag_rows_locales" (
  	"overrides_label" varchar,
  	"overrides_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_flag_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"when_value" varchar,
  	"render" boolean DEFAULT true,
  	"orphaned" boolean DEFAULT false,
  	"overrides_show_title" "enum_flag_cta_show_title",
  	"overrides_link_id" integer,
  	"overrides_background_type" "enum_flag_cta_background_type",
  	"overrides_background_color" varchar,
  	"overrides_background_image_id" integer,
  	"overrides_background_video_id" integer,
  	"overrides_desktop_aspect_ratio" "enum_flag_cta_desktop_aspect_ratio",
  	"overrides_mobile_aspect_ratio" "enum_flag_cta_mobile_aspect_ratio",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_flag_rows_locales" (
  	"overrides_label" varchar,
  	"overrides_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "flag_key" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "flag_key" varchar;
  ALTER TABLE "pages_blocks_cta_flag_rows" ADD CONSTRAINT "pages_blocks_cta_flag_rows_overrides_link_id_links_id_fk" FOREIGN KEY ("overrides_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_flag_rows" ADD CONSTRAINT "pages_blocks_cta_flag_rows_overrides_background_image_id_media_id_fk" FOREIGN KEY ("overrides_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_flag_rows" ADD CONSTRAINT "pages_blocks_cta_flag_rows_overrides_background_video_id_media_id_fk" FOREIGN KEY ("overrides_background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_flag_rows" ADD CONSTRAINT "pages_blocks_cta_flag_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_flag_rows_locales" ADD CONSTRAINT "pages_blocks_cta_flag_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_flag_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_flag_rows" ADD CONSTRAINT "_pages_v_blocks_cta_flag_rows_overrides_link_id_links_id_fk" FOREIGN KEY ("overrides_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_flag_rows" ADD CONSTRAINT "_pages_v_blocks_cta_flag_rows_overrides_background_image_id_media_id_fk" FOREIGN KEY ("overrides_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_flag_rows" ADD CONSTRAINT "_pages_v_blocks_cta_flag_rows_overrides_background_video_id_media_id_fk" FOREIGN KEY ("overrides_background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_flag_rows" ADD CONSTRAINT "_pages_v_blocks_cta_flag_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_flag_rows_locales" ADD CONSTRAINT "_pages_v_blocks_cta_flag_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_flag_rows"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_flag_rows_order_idx" ON "pages_blocks_cta_flag_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_flag_rows_parent_id_idx" ON "pages_blocks_cta_flag_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_flag_rows_overrides_overrides_link_idx" ON "pages_blocks_cta_flag_rows" USING btree ("overrides_link_id");
  CREATE INDEX "pages_blocks_cta_flag_rows_overrides_overrides_backgroun_idx" ON "pages_blocks_cta_flag_rows" USING btree ("overrides_background_image_id");
  CREATE INDEX "pages_blocks_cta_flag_rows_overrides_overrides_backgro_1_idx" ON "pages_blocks_cta_flag_rows" USING btree ("overrides_background_video_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_flag_rows_locales_locale_parent_id_unique" ON "pages_blocks_cta_flag_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_flag_rows_order_idx" ON "_pages_v_blocks_cta_flag_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_flag_rows_parent_id_idx" ON "_pages_v_blocks_cta_flag_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_flag_rows_overrides_overrides_link_idx" ON "_pages_v_blocks_cta_flag_rows" USING btree ("overrides_link_id");
  CREATE INDEX "_pages_v_blocks_cta_flag_rows_overrides_overrides_backgr_idx" ON "_pages_v_blocks_cta_flag_rows" USING btree ("overrides_background_image_id");
  CREATE INDEX "_pages_v_blocks_cta_flag_rows_overrides_overrides_back_1_idx" ON "_pages_v_blocks_cta_flag_rows" USING btree ("overrides_background_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_flag_rows_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_cta_flag_rows_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cta_flag_rows" CASCADE;
  DROP TABLE "pages_blocks_cta_flag_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_flag_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_flag_rows_locales" CASCADE;
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "flag_key";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "flag_key";
  DROP TYPE "public"."enum_flag_cta_show_title";
  DROP TYPE "public"."enum_flag_cta_background_type";
  DROP TYPE "public"."enum_flag_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum_flag_cta_mobile_aspect_ratio";`)
}
