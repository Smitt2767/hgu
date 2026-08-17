import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "articles_blocks_feedback" CASCADE;
  DROP TABLE "articles_blocks_feedback_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_feedback" CASCADE;
  DROP TABLE "_articles_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "videos_blocks_feedback" CASCADE;
  DROP TABLE "videos_blocks_feedback_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_feedback" CASCADE;
  DROP TABLE "_videos_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "templates_blocks_feedback" CASCADE;
  DROP TABLE "templates_blocks_feedback_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "pages_blocks_feedback" CASCADE;
  DROP TABLE "pages_blocks_feedback_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_locales" CASCADE;
  DROP TYPE "public"."enum_articles_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_mobile_aspect_ratio";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TABLE "articles_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum_articles_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum_articles_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_articles_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_articles_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum__articles_v_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum__articles_v_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__articles_v_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "videos_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "videos_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "videos_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum_videos_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum_videos_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_videos_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_videos_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum__videos_v_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum__videos_v_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__videos_v_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "templates_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "templates_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "templates_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum_templates_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum_templates_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_templates_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_templates_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum__templates_v_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum__templates_v_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__templates_v_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum_pages_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum_pages_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_pages_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feedback" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_fields_first_name" boolean DEFAULT true,
  	"form_fields_last_name" boolean DEFAULT true,
  	"form_fields_email" boolean DEFAULT true,
  	"form_fields_message" boolean DEFAULT true,
  	"privacy_checkbox" boolean DEFAULT true,
  	"contact_checkbox" boolean DEFAULT false,
  	"privacy_link_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feedback_locales" (
  	"question_text" varchar,
  	"yes_button_label" varchar DEFAULT 'Yes',
  	"no_button_label" varchar DEFAULT 'No',
  	"yes_form_title" varchar,
  	"no_form_title" varchar,
  	"back_button" varchar DEFAULT 'Back',
  	"submit_button" varchar DEFAULT 'Submit',
  	"success_title" varchar DEFAULT 'Thank You',
  	"success_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience_intro_lines_locales" (
  	"line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience_scenes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience_scenes_locales" (
  	"title" jsonb,
  	"quote" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_sub_text" "enum__pages_v_blocks_pause_experience_show_sub_text" DEFAULT 'show',
  	"duration" numeric DEFAULT 60,
  	"animation_speed" numeric DEFAULT 1,
  	"background_type" "enum__pages_v_blocks_pause_experience_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__pages_v_blocks_pause_experience_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_pause_experience_mobile_aspect_ratio" DEFAULT '9:16',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pause_experience_locales" (
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "articles_blocks_feedback" ADD CONSTRAINT "articles_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_feedback" ADD CONSTRAINT "articles_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_feedback_locales" ADD CONSTRAINT "articles_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_intro_lines" ADD CONSTRAINT "articles_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "articles_blocks_pause_experience_intro_lines_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_scenes" ADD CONSTRAINT "articles_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "articles_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_locales" ADD CONSTRAINT "articles_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback" ADD CONSTRAINT "_articles_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback" ADD CONSTRAINT "_articles_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback_locales" ADD CONSTRAINT "_articles_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_articles_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_intro_lines_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_articles_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_scenes_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback" ADD CONSTRAINT "videos_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback" ADD CONSTRAINT "videos_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback_locales" ADD CONSTRAINT "videos_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_intro_lines" ADD CONSTRAINT "videos_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "videos_blocks_pause_experience_intro_lines_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_scenes" ADD CONSTRAINT "videos_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "videos_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_locales" ADD CONSTRAINT "videos_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback" ADD CONSTRAINT "_videos_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback" ADD CONSTRAINT "_videos_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback_locales" ADD CONSTRAINT "_videos_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_videos_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_intro_lines_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_videos_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_scenes_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback" ADD CONSTRAINT "templates_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback" ADD CONSTRAINT "templates_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback_locales" ADD CONSTRAINT "templates_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_intro_lines" ADD CONSTRAINT "templates_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "templates_blocks_pause_experience_intro_lines_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_scenes" ADD CONSTRAINT "templates_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "templates_blocks_pause_experience_scenes_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_locales" ADD CONSTRAINT "templates_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback" ADD CONSTRAINT "_templates_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback" ADD CONSTRAINT "_templates_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback_locales" ADD CONSTRAINT "_templates_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_templates_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_intro_lines_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_templates_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_scenes_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback" ADD CONSTRAINT "pages_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback" ADD CONSTRAINT "pages_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback_locales" ADD CONSTRAINT "pages_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_intro_lines" ADD CONSTRAINT "pages_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "pages_blocks_pause_experience_intro_lines_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_scenes" ADD CONSTRAINT "pages_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "pages_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_locales" ADD CONSTRAINT "pages_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback" ADD CONSTRAINT "_pages_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback" ADD CONSTRAINT "_pages_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback_locales" ADD CONSTRAINT "_pages_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_pages_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_intro_lines_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_pages_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_blocks_feedback_order_idx" ON "articles_blocks_feedback" USING btree ("_order");
  CREATE INDEX "articles_blocks_feedback_parent_id_idx" ON "articles_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_feedback_path_idx" ON "articles_blocks_feedback" USING btree ("_path");
  CREATE INDEX "articles_blocks_feedback_privacy_link_idx" ON "articles_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "articles_blocks_feedback_locales_locale_parent_id_unique" ON "articles_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_pause_experience_intro_lines_order_idx" ON "articles_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "articles_blocks_pause_experience_intro_lines_parent_id_idx" ON "articles_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_pause_experience_intro_lines_locales_locale_" ON "articles_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_pause_experience_scenes_order_idx" ON "articles_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "articles_blocks_pause_experience_scenes_parent_id_idx" ON "articles_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_pause_experience_scenes_locales_locale_paren" ON "articles_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_pause_experience_order_idx" ON "articles_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "articles_blocks_pause_experience_parent_id_idx" ON "articles_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_pause_experience_path_idx" ON "articles_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "articles_blocks_pause_experience_background_image_idx" ON "articles_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "articles_blocks_pause_experience_background_video_idx" ON "articles_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "articles_blocks_pause_experience_locales_locale_parent_id_un" ON "articles_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_feedback_order_idx" ON "_articles_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_feedback_parent_id_idx" ON "_articles_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_feedback_path_idx" ON "_articles_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_feedback_privacy_link_idx" ON "_articles_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_feedback_locales_locale_parent_id_unique" ON "_articles_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_pause_experience_intro_lines_order_idx" ON "_articles_v_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_pause_experience_intro_lines_parent_id_idx" ON "_articles_v_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_pause_experience_intro_lines_locales_loca" ON "_articles_v_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_pause_experience_scenes_order_idx" ON "_articles_v_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_pause_experience_scenes_parent_id_idx" ON "_articles_v_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_pause_experience_scenes_locales_locale_pa" ON "_articles_v_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_pause_experience_order_idx" ON "_articles_v_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_pause_experience_parent_id_idx" ON "_articles_v_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_pause_experience_path_idx" ON "_articles_v_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_pause_experience_background_image_idx" ON "_articles_v_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "_articles_v_blocks_pause_experience_background_video_idx" ON "_articles_v_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_pause_experience_locales_locale_parent_id" ON "_articles_v_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_feedback_order_idx" ON "videos_blocks_feedback" USING btree ("_order");
  CREATE INDEX "videos_blocks_feedback_parent_id_idx" ON "videos_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_feedback_path_idx" ON "videos_blocks_feedback" USING btree ("_path");
  CREATE INDEX "videos_blocks_feedback_privacy_link_idx" ON "videos_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "videos_blocks_feedback_locales_locale_parent_id_unique" ON "videos_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_pause_experience_intro_lines_order_idx" ON "videos_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "videos_blocks_pause_experience_intro_lines_parent_id_idx" ON "videos_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "videos_blocks_pause_experience_intro_lines_locales_locale_pa" ON "videos_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_pause_experience_scenes_order_idx" ON "videos_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "videos_blocks_pause_experience_scenes_parent_id_idx" ON "videos_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "videos_blocks_pause_experience_scenes_locales_locale_parent_" ON "videos_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_pause_experience_order_idx" ON "videos_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "videos_blocks_pause_experience_parent_id_idx" ON "videos_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_pause_experience_path_idx" ON "videos_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "videos_blocks_pause_experience_background_image_idx" ON "videos_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "videos_blocks_pause_experience_background_video_idx" ON "videos_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "videos_blocks_pause_experience_locales_locale_parent_id_uniq" ON "videos_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_feedback_order_idx" ON "_videos_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_feedback_parent_id_idx" ON "_videos_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_feedback_path_idx" ON "_videos_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_feedback_privacy_link_idx" ON "_videos_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_feedback_locales_locale_parent_id_unique" ON "_videos_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_pause_experience_intro_lines_order_idx" ON "_videos_v_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_pause_experience_intro_lines_parent_id_idx" ON "_videos_v_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_pause_experience_intro_lines_locales_locale" ON "_videos_v_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_pause_experience_scenes_order_idx" ON "_videos_v_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_pause_experience_scenes_parent_id_idx" ON "_videos_v_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_pause_experience_scenes_locales_locale_pare" ON "_videos_v_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_pause_experience_order_idx" ON "_videos_v_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_pause_experience_parent_id_idx" ON "_videos_v_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_pause_experience_path_idx" ON "_videos_v_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_pause_experience_background_image_idx" ON "_videos_v_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "_videos_v_blocks_pause_experience_background_video_idx" ON "_videos_v_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_pause_experience_locales_locale_parent_id_u" ON "_videos_v_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_feedback_order_idx" ON "templates_blocks_feedback" USING btree ("_order");
  CREATE INDEX "templates_blocks_feedback_parent_id_idx" ON "templates_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_feedback_path_idx" ON "templates_blocks_feedback" USING btree ("_path");
  CREATE INDEX "templates_blocks_feedback_privacy_link_idx" ON "templates_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "templates_blocks_feedback_locales_locale_parent_id_unique" ON "templates_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_pause_experience_intro_lines_order_idx" ON "templates_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "templates_blocks_pause_experience_intro_lines_parent_id_idx" ON "templates_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "templates_blocks_pause_experience_intro_lines_locales_locale" ON "templates_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_pause_experience_scenes_order_idx" ON "templates_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "templates_blocks_pause_experience_scenes_parent_id_idx" ON "templates_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "templates_blocks_pause_experience_scenes_locales_locale_pare" ON "templates_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_pause_experience_order_idx" ON "templates_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "templates_blocks_pause_experience_parent_id_idx" ON "templates_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_pause_experience_path_idx" ON "templates_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "templates_blocks_pause_experience_background_image_idx" ON "templates_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "templates_blocks_pause_experience_background_video_idx" ON "templates_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "templates_blocks_pause_experience_locales_locale_parent_id_u" ON "templates_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_order_idx" ON "_templates_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_feedback_parent_id_idx" ON "_templates_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_path_idx" ON "_templates_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_feedback_privacy_link_idx" ON "_templates_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_feedback_locales_locale_parent_id_unique" ON "_templates_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_pause_experience_intro_lines_order_idx" ON "_templates_v_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_pause_experience_intro_lines_parent_id_idx" ON "_templates_v_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_pause_experience_intro_lines_locales_loc" ON "_templates_v_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_pause_experience_scenes_order_idx" ON "_templates_v_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_pause_experience_scenes_parent_id_idx" ON "_templates_v_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_pause_experience_scenes_locales_locale_p" ON "_templates_v_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_pause_experience_order_idx" ON "_templates_v_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_pause_experience_parent_id_idx" ON "_templates_v_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_pause_experience_path_idx" ON "_templates_v_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_pause_experience_background_image_idx" ON "_templates_v_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "_templates_v_blocks_pause_experience_background_video_idx" ON "_templates_v_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_pause_experience_locales_locale_parent_i" ON "_templates_v_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feedback_order_idx" ON "pages_blocks_feedback" USING btree ("_order");
  CREATE INDEX "pages_blocks_feedback_parent_id_idx" ON "pages_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feedback_path_idx" ON "pages_blocks_feedback" USING btree ("_path");
  CREATE INDEX "pages_blocks_feedback_privacy_link_idx" ON "pages_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "pages_blocks_feedback_locales_locale_parent_id_unique" ON "pages_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pause_experience_intro_lines_order_idx" ON "pages_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "pages_blocks_pause_experience_intro_lines_parent_id_idx" ON "pages_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pause_experience_intro_lines_locales_locale_par" ON "pages_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pause_experience_scenes_order_idx" ON "pages_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "pages_blocks_pause_experience_scenes_parent_id_idx" ON "pages_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pause_experience_scenes_locales_locale_parent_i" ON "pages_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_pause_experience_order_idx" ON "pages_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "pages_blocks_pause_experience_parent_id_idx" ON "pages_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pause_experience_path_idx" ON "pages_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "pages_blocks_pause_experience_background_image_idx" ON "pages_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_pause_experience_background_video_idx" ON "pages_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "pages_blocks_pause_experience_locales_locale_parent_id_uniqu" ON "pages_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_order_idx" ON "_pages_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feedback_parent_id_idx" ON "_pages_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_path_idx" ON "_pages_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feedback_privacy_link_idx" ON "_pages_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feedback_locales_locale_parent_id_unique" ON "_pages_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pause_experience_intro_lines_order_idx" ON "_pages_v_blocks_pause_experience_intro_lines" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pause_experience_intro_lines_parent_id_idx" ON "_pages_v_blocks_pause_experience_intro_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pause_experience_intro_lines_locales_locale_" ON "_pages_v_blocks_pause_experience_intro_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pause_experience_scenes_order_idx" ON "_pages_v_blocks_pause_experience_scenes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pause_experience_scenes_parent_id_idx" ON "_pages_v_blocks_pause_experience_scenes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pause_experience_scenes_locales_locale_paren" ON "_pages_v_blocks_pause_experience_scenes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_pause_experience_order_idx" ON "_pages_v_blocks_pause_experience" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pause_experience_parent_id_idx" ON "_pages_v_blocks_pause_experience" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pause_experience_path_idx" ON "_pages_v_blocks_pause_experience" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pause_experience_background_image_idx" ON "_pages_v_blocks_pause_experience" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_pause_experience_background_video_idx" ON "_pages_v_blocks_pause_experience" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_pause_experience_locales_locale_parent_id_un" ON "_pages_v_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");`)
}
