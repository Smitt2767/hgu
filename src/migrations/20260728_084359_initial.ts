import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_links_type" AS ENUM('reference', 'custom', 'static');
  CREATE TYPE "public"."enum_links_static_page" AS ENUM('/videos', '/articles');
  CREATE TYPE "public"."enum_articles_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_articles_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_articles_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_articles_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_articles_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_articles_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_articles_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum_articles_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum_articles_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_articles_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_articles_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum_articles_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_articles_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum_articles_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_articles_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum_articles_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_articles_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_articles_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_articles_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum_articles_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_articles_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_articles_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_articles_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__articles_v_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__articles_v_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__articles_v_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__articles_v_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__articles_v_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum__articles_v_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__articles_v_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum__articles_v_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__articles_v_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum__articles_v_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__articles_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__articles_v_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum__articles_v_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__articles_v_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__articles_v_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__articles_v_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_videos_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_videos_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_videos_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_videos_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_videos_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_videos_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_videos_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum_videos_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum_videos_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_videos_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_videos_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum_videos_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_videos_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum_videos_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_videos_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum_videos_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_videos_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_videos_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_videos_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum_videos_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_videos_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_videos_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_videos_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_videos_platform" AS ENUM('youtube');
  CREATE TYPE "public"."enum_videos_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_videos_thumbnail_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_videos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__videos_v_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__videos_v_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__videos_v_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__videos_v_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__videos_v_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__videos_v_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__videos_v_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum__videos_v_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__videos_v_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum__videos_v_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__videos_v_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum__videos_v_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__videos_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__videos_v_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum__videos_v_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__videos_v_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__videos_v_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__videos_v_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__videos_v_version_platform" AS ENUM('youtube');
  CREATE TYPE "public"."enum__videos_v_version_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__videos_v_version_thumbnail_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__videos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__videos_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_templates_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_templates_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_templates_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_templates_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_templates_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_templates_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_templates_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum_templates_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum_templates_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_templates_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_templates_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum_templates_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_templates_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum_templates_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_templates_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum_templates_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_templates_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_templates_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_templates_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum_templates_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_templates_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_templates_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_templates_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_templates_content_type" AS ENUM('videos', 'articles');
  CREATE TYPE "public"."enum_templates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__templates_v_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__templates_v_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__templates_v_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__templates_v_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__templates_v_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__templates_v_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__templates_v_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum__templates_v_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__templates_v_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum__templates_v_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__templates_v_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum__templates_v_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__templates_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__templates_v_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum__templates_v_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__templates_v_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__templates_v_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__templates_v_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__templates_v_version_content_type" AS ENUM('videos', 'articles');
  CREATE TYPE "public"."enum__templates_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__templates_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_pages_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_pages_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_pages_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_featured_video_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_featured_video_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum_pages_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum_pages_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_pages_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum_pages_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_pages_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum_pages_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum_pages_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum_pages_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum_pages_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_pages_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum_pages_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum_pages_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum_pages_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_video_carousel_desktop_aspect_ratio" AS ENUM('9:16', '16:9');
  CREATE TYPE "public"."enum_pages_blocks_video_carousel_mobile_aspect_ratio" AS ENUM('9:16', '16:9');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_animated_quote_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_animated_quote_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_animated_quote_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_cards_media_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_card_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_image_caption" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_image_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_image_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_video_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_video_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_text_alignment" AS ENUM('left', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_vertical_alignment" AS ENUM('top', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_multi_lines_of_text" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_desktop_aspect_ratio" AS ENUM('16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_just_text_text_animation" AS ENUM('flashLineByLine', 'flashLineByLineNoFade', 'stackLineOnLine', 'appearWordByWord', 'appearParagraphByParagraph', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_just_title_heading_level" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__pages_v_blocks_just_title_font_family" AS ENUM('oswald', 'merriweather');
  CREATE TYPE "public"."enum__pages_v_blocks_just_title_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_show_sub_text" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_background_type" AS ENUM('image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_desktop_aspect_ratio" AS ENUM('16:9');
  CREATE TYPE "public"."enum__pages_v_blocks_pause_experience_mobile_aspect_ratio" AS ENUM('9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_paragraph_text_text_size" AS ENUM('body', 'smallText');
  CREATE TYPE "public"."enum__pages_v_blocks_paragraph_text_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_social_share_show_title" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum__pages_v_blocks_take_over_media" AS ENUM('video', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_text_carousel_slides_show_title" AS ENUM('on', 'off');
  CREATE TYPE "public"."enum__pages_v_blocks_text_carousel_slides_background_type" AS ENUM('none', 'color', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_text_carousel_horizontal_scroll_path" AS ENUM('off', 'on');
  CREATE TYPE "public"."enum__pages_v_blocks_text_carousel_desktop_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_text_carousel_mobile_aspect_ratio" AS ENUM('4:5', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_video_carousel_desktop_aspect_ratio" AS ENUM('9:16', '16:9');
  CREATE TYPE "public"."enum__pages_v_blocks_video_carousel_mobile_aspect_ratio" AS ENUM('9:16', '16:9');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_socials_links_platform" AS ENUM('Facebook', 'X', 'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Telegram');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_links_type" DEFAULT 'reference',
  	"static_page" "enum_links_static_page",
  	"new_tab" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "links_locales" (
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "links_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"videos_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "articles_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "articles_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_articles_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_articles_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_articles_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_articles_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer
  );
  
  CREATE TABLE "articles_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_articles_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_articles_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_articles_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_articles_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum_articles_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_articles_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_articles_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum_articles_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum_articles_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_articles_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "articles_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_articles_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum_articles_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum_articles_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum_articles_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_articles_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_articles_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum_articles_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_level" "enum_articles_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum_articles_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum_articles_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_size" "enum_articles_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum_articles_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "articles_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_articles_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_articles_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_articles_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum_articles_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer
  );
  
  CREATE TABLE "articles_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_articles_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum_articles_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_articles_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"image_id" integer,
  	"reference_link_id" integer,
  	"template_id" integer,
  	"use_custom_layout" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__articles_v_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__articles_v_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__articles_v_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__articles_v_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__articles_v_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__articles_v_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum__articles_v_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__articles_v_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum__articles_v_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum__articles_v_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "_articles_v_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__articles_v_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum__articles_v_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum__articles_v_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum__articles_v_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__articles_v_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum__articles_v_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_level" "enum__articles_v_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum__articles_v_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum__articles_v_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_size" "enum__articles_v_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum__articles_v_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "_articles_v_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__articles_v_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media" "enum__articles_v_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__articles_v_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum__articles_v_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__articles_v_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum__articles_v_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__articles_v_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_image_id" integer,
  	"version_reference_link_id" integer,
  	"version_template_id" integer,
  	"version_use_custom_layout" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__articles_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "videos_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "videos_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_videos_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_videos_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_videos_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_videos_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer
  );
  
  CREATE TABLE "videos_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_videos_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_videos_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_videos_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_videos_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum_videos_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_videos_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_videos_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum_videos_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum_videos_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_videos_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "videos_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_videos_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum_videos_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum_videos_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum_videos_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_videos_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_videos_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum_videos_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_level" "enum_videos_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum_videos_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum_videos_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_size" "enum_videos_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum_videos_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "videos_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_videos_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_videos_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_videos_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum_videos_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer
  );
  
  CREATE TABLE "videos_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_videos_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum_videos_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_videos_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "videos_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"platform" "enum_videos_platform" DEFAULT 'youtube',
  	"orientation" "enum_videos_orientation" DEFAULT 'horizontal',
  	"video_id" varchar,
  	"thumbnail_type" "enum_videos_thumbnail_type" DEFAULT 'image',
  	"thumbnail_id" integer,
  	"video_thumbnail_id" integer,
  	"template_id" integer,
  	"use_custom_layout" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_videos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "videos_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__videos_v_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__videos_v_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__videos_v_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__videos_v_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__videos_v_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__videos_v_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum__videos_v_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__videos_v_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum__videos_v_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum__videos_v_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "_videos_v_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__videos_v_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum__videos_v_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum__videos_v_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum__videos_v_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__videos_v_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum__videos_v_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_level" "enum__videos_v_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum__videos_v_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum__videos_v_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_size" "enum__videos_v_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum__videos_v_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "_videos_v_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__videos_v_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media" "enum__videos_v_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__videos_v_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum__videos_v_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__videos_v_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum__videos_v_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__videos_v_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_videos_v_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_videos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_platform" "enum__videos_v_version_platform" DEFAULT 'youtube',
  	"version_orientation" "enum__videos_v_version_orientation" DEFAULT 'horizontal',
  	"version_video_id" varchar,
  	"version_thumbnail_type" "enum__videos_v_version_thumbnail_type" DEFAULT 'image',
  	"version_thumbnail_id" integer,
  	"version_video_thumbnail_id" integer,
  	"version_template_id" integer,
  	"version_use_custom_layout" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__videos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__videos_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_videos_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "templates_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "templates_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_templates_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_templates_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_templates_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_templates_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer
  );
  
  CREATE TABLE "templates_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_templates_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_templates_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_templates_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_templates_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum_templates_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_templates_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_templates_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum_templates_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum_templates_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_templates_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "templates_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_templates_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum_templates_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum_templates_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum_templates_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_templates_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_templates_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum_templates_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_level" "enum_templates_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum_templates_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum_templates_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_size" "enum_templates_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum_templates_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "templates_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_templates_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_templates_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_templates_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum_templates_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer
  );
  
  CREATE TABLE "templates_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_templates_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum_templates_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_templates_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_type" "enum_templates_content_type",
  	"is_default" boolean DEFAULT false,
  	"is_system_default" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_templates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "templates_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__templates_v_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__templates_v_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__templates_v_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__templates_v_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__templates_v_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__templates_v_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum__templates_v_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__templates_v_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum__templates_v_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum__templates_v_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "_templates_v_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__templates_v_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum__templates_v_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum__templates_v_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum__templates_v_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__templates_v_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum__templates_v_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_level" "enum__templates_v_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum__templates_v_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum__templates_v_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_size" "enum__templates_v_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum__templates_v_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "_templates_v_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__templates_v_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media" "enum__templates_v_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__templates_v_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum__templates_v_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__templates_v_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum__templates_v_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__templates_v_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_templates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_content_type" "enum__templates_v_version_content_type",
  	"version_is_default" boolean DEFAULT false,
  	"version_is_system_default" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__templates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__templates_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_templates_v_locales" (
  	"version_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_pages_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_pages_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_article_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" boolean DEFAULT false,
  	"show_header" boolean DEFAULT true,
  	"show_title" boolean DEFAULT true,
  	"show_description" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_pages_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer
  );
  
  CREATE TABLE "pages_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_pages_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_pages_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_pages_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_pages_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum_pages_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum_pages_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_featured_article" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"article_id" integer,
  	"show_title" boolean DEFAULT true,
  	"show_description" boolean DEFAULT true,
  	"show_read_more" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum_pages_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum_pages_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_featured_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"desktop_aspect_ratio" "enum_pages_blocks_featured_video_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_featured_video_mobile_aspect_ratio" DEFAULT '9:16',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_video_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "pages_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_type" "enum_pages_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum_pages_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum_pages_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum_pages_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum_pages_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum_pages_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum_pages_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_level" "enum_pages_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum_pages_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum_pages_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "pages_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_size" "enum_pages_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum_pages_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_pages_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_pages_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_title" "enum_pages_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum_pages_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer
  );
  
  CREATE TABLE "pages_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum_pages_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum_pages_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum_pages_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_aspect_ratio" "enum_pages_blocks_video_carousel_desktop_aspect_ratio" DEFAULT '9:16',
  	"mobile_aspect_ratio" "enum_pages_blocks_video_carousel_mobile_aspect_ratio" DEFAULT '9:16',
  	"horizontal_scroll_path" boolean DEFAULT false,
  	"show_header" boolean DEFAULT true,
  	"show_video_titles" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer,
  	"videos_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items_locales" (
  	"question_text" varchar,
  	"answer_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_locales" (
  	"header_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_alpha" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_powered_by" boolean DEFAULT true,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_alpha_locales" (
  	"title" varchar,
  	"button_text" varchar,
  	"iframe_header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_alpha_iframe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"iframe_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_animated_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__pages_v_blocks_animated_quote_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__pages_v_blocks_animated_quote_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_animated_quote_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_animated_quote_locales" (
  	"quote" varchar,
  	"highlighted_words" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_article_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" boolean DEFAULT false,
  	"show_header" boolean DEFAULT true,
  	"show_title" boolean DEFAULT true,
  	"show_description" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__pages_v_blocks_card_carousel_cards_media_type" DEFAULT 'image',
  	"card_image_id" integer,
  	"card_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel_cards_locales" (
  	"modal_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__pages_v_blocks_card_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__pages_v_blocks_card_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_card_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__pages_v_blocks_cta_show_title" DEFAULT 'show',
  	"link_id" integer,
  	"background_type" "enum__pages_v_blocks_cta_background_type" DEFAULT 'video',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"desktop_aspect_ratio" "enum__pages_v_blocks_cta_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_cta_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"label" varchar,
  	"message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_featured_article" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"article_id" integer,
  	"show_title" boolean DEFAULT true,
  	"show_description" boolean DEFAULT true,
  	"show_read_more" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"caption" "enum__pages_v_blocks_featured_image_caption" DEFAULT 'on',
  	"desktop_aspect_ratio" "enum__pages_v_blocks_featured_image_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_featured_image_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_image_locales" (
  	"caption_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_featured_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"desktop_aspect_ratio" "enum__pages_v_blocks_featured_video_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_featured_video_mobile_aspect_ratio" DEFAULT '9:16',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_video_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "_pages_v_blocks_just_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_type" "enum__pages_v_blocks_just_text_background_type" DEFAULT 'none',
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"background_color" varchar DEFAULT '#1A1A1A',
  	"text_color" varchar DEFAULT '#B0B0B0',
  	"text_alignment" "enum__pages_v_blocks_just_text_text_alignment" DEFAULT 'centered',
  	"vertical_alignment" "enum__pages_v_blocks_just_text_vertical_alignment" DEFAULT 'center',
  	"multi_lines_of_text" "enum__pages_v_blocks_just_text_multi_lines_of_text" DEFAULT 'off',
  	"desktop_aspect_ratio" "enum__pages_v_blocks_just_text_desktop_aspect_ratio" DEFAULT '16:9',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_just_text_mobile_aspect_ratio" DEFAULT '4:5',
  	"text_animation" "enum__pages_v_blocks_just_text_text_animation" DEFAULT 'flashLineByLine',
  	"progress_bar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_just_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_just_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_level" "enum__pages_v_blocks_just_title_heading_level" DEFAULT 'h1',
  	"font_family" "enum__pages_v_blocks_just_title_font_family" DEFAULT 'oswald',
  	"text_alignment" "enum__pages_v_blocks_just_title_text_alignment" DEFAULT 'center',
  	"text_color" varchar DEFAULT '#FFFFFF',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_just_title_locales" (
  	"title_text" varchar,
  	"highlighted_words" varchar,
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
  
  CREATE TABLE "_pages_v_blocks_paragraph_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_size" "enum__pages_v_blocks_paragraph_text_text_size" DEFAULT 'body',
  	"text_alignment" "enum__pages_v_blocks_paragraph_text_text_alignment" DEFAULT 'left',
  	"text_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_paragraph_text_locales" (
  	"content" jsonb,
  	"highlighted_words" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_social_share" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__pages_v_blocks_social_share_show_title" DEFAULT 'show',
  	"share_u_r_l" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_share_locales" (
  	"title" varchar,
  	"share_text" varchar,
  	"share_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_take_over" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media" "enum__pages_v_blocks_take_over_media" DEFAULT 'video',
  	"video_id" integer,
  	"image_id" integer,
  	"replay_with_audio" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_title" "enum__pages_v_blocks_text_carousel_slides_show_title" DEFAULT 'on',
  	"background_type" "enum__pages_v_blocks_text_carousel_slides_background_type" DEFAULT 'none',
  	"background_color" varchar DEFAULT '#1a1a1a',
  	"background_image_id" integer,
  	"background_video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_carousel_slides_locales" (
  	"slide_title" varchar,
  	"slide_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_text_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_scroll_path" "enum__pages_v_blocks_text_carousel_horizontal_scroll_path" DEFAULT 'off',
  	"title_color" varchar DEFAULT '#ffffff',
  	"subtext_color" varchar DEFAULT '#9ca3af',
  	"desktop_aspect_ratio" "enum__pages_v_blocks_text_carousel_desktop_aspect_ratio" DEFAULT '4:5',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_text_carousel_mobile_aspect_ratio" DEFAULT '4:5',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_video_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_aspect_ratio" "enum__pages_v_blocks_video_carousel_desktop_aspect_ratio" DEFAULT '9:16',
  	"mobile_aspect_ratio" "enum__pages_v_blocks_video_carousel_mobile_aspect_ratio" DEFAULT '9:16',
  	"horizontal_scroll_path" boolean DEFAULT false,
  	"show_header" boolean DEFAULT true,
  	"show_video_titles" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_carousel_locales" (
  	"header" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer,
  	"videos_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"totp_secret" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"media_update" boolean DEFAULT false,
  	"links_find" boolean DEFAULT false,
  	"links_create" boolean DEFAULT false,
  	"links_update" boolean DEFAULT false,
  	"articles_find" boolean DEFAULT false,
  	"articles_create" boolean DEFAULT false,
  	"articles_update" boolean DEFAULT false,
  	"videos_find" boolean DEFAULT false,
  	"videos_create" boolean DEFAULT false,
  	"videos_update" boolean DEFAULT false,
  	"templates_find" boolean DEFAULT false,
  	"templates_create" boolean DEFAULT false,
  	"templates_update" boolean DEFAULT false,
  	"pages_find" boolean DEFAULT false,
  	"pages_create" boolean DEFAULT false,
  	"pages_update" boolean DEFAULT false,
  	"site_find" boolean DEFAULT false,
  	"site_update" boolean DEFAULT false,
  	"header_find" boolean DEFAULT false,
  	"header_update" boolean DEFAULT false,
  	"footer_find" boolean DEFAULT false,
  	"footer_update" boolean DEFAULT false,
  	"socials_find" boolean DEFAULT false,
  	"socials_update" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"links_id" integer,
  	"articles_id" integer,
  	"videos_id" integer,
  	"templates_id" integer,
  	"pages_id" integer,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"favicon_id" integer NOT NULL,
  	"primary_colors_primary_gold" varchar DEFAULT '#FEDA00' NOT NULL,
  	"text_colors_white" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"text_colors_gray" varchar DEFAULT '#86888A' NOT NULL,
  	"text_colors_primary_gold" varchar DEFAULT '#FEDA00' NOT NULL,
  	"box_background_box_bg_gray" varchar DEFAULT '#444546' NOT NULL,
  	"neutrals_background" varchar DEFAULT '#0A0A0A' NOT NULL,
  	"neutrals_surface" varchar DEFAULT '#1A1A1A' NOT NULL,
  	"neutrals_border" varchar DEFAULT '#252525' NOT NULL,
  	"neutrals_white" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"neutrals_gray" varchar DEFAULT '#B0B0B0' NOT NULL,
  	"maintenance_mode" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"copyright_text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "socials_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_socials_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer NOT NULL
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "links_locales" ADD CONSTRAINT "links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "links_rels" ADD CONSTRAINT "links_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "links_rels" ADD CONSTRAINT "links_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "links_rels" ADD CONSTRAINT "links_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "links_rels" ADD CONSTRAINT "links_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_accordion_items" ADD CONSTRAINT "articles_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_accordion_items_locales" ADD CONSTRAINT "articles_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_accordion" ADD CONSTRAINT "articles_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_accordion_locales" ADD CONSTRAINT "articles_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_alpha" ADD CONSTRAINT "articles_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_alpha_locales" ADD CONSTRAINT "articles_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_alpha_iframe" ADD CONSTRAINT "articles_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_animated_quote" ADD CONSTRAINT "articles_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_animated_quote" ADD CONSTRAINT "articles_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_animated_quote" ADD CONSTRAINT "articles_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_animated_quote_locales" ADD CONSTRAINT "articles_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel_cards" ADD CONSTRAINT "articles_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel_cards" ADD CONSTRAINT "articles_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel_cards" ADD CONSTRAINT "articles_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel_cards_locales" ADD CONSTRAINT "articles_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel" ADD CONSTRAINT "articles_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_card_carousel_locales" ADD CONSTRAINT "articles_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta" ADD CONSTRAINT "articles_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta" ADD CONSTRAINT "articles_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta" ADD CONSTRAINT "articles_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta" ADD CONSTRAINT "articles_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_cta_locales" ADD CONSTRAINT "articles_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_image" ADD CONSTRAINT "articles_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_image" ADD CONSTRAINT "articles_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_image" ADD CONSTRAINT "articles_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_image_locales" ADD CONSTRAINT "articles_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_feedback" ADD CONSTRAINT "articles_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_feedback" ADD CONSTRAINT "articles_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_feedback_locales" ADD CONSTRAINT "articles_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_text" ADD CONSTRAINT "articles_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_text" ADD CONSTRAINT "articles_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_text" ADD CONSTRAINT "articles_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_text_locales" ADD CONSTRAINT "articles_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_title" ADD CONSTRAINT "articles_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_just_title_locales" ADD CONSTRAINT "articles_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_paragraph_text" ADD CONSTRAINT "articles_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_paragraph_text_locales" ADD CONSTRAINT "articles_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_intro_lines" ADD CONSTRAINT "articles_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "articles_blocks_pause_experience_intro_lines_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_scenes" ADD CONSTRAINT "articles_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "articles_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience" ADD CONSTRAINT "articles_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_pause_experience_locales" ADD CONSTRAINT "articles_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_social_share" ADD CONSTRAINT "articles_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_social_share_locales" ADD CONSTRAINT "articles_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_take_over" ADD CONSTRAINT "articles_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_take_over" ADD CONSTRAINT "articles_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_take_over" ADD CONSTRAINT "articles_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel_slides" ADD CONSTRAINT "articles_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel_slides" ADD CONSTRAINT "articles_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel_slides" ADD CONSTRAINT "articles_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel_slides_locales" ADD CONSTRAINT "articles_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel" ADD CONSTRAINT "articles_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_text_carousel_locales" ADD CONSTRAINT "articles_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_reference_link_id_links_id_fk" FOREIGN KEY ("reference_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_accordion_items" ADD CONSTRAINT "_articles_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_accordion_items_locales" ADD CONSTRAINT "_articles_v_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_accordion" ADD CONSTRAINT "_articles_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_accordion_locales" ADD CONSTRAINT "_articles_v_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_alpha" ADD CONSTRAINT "_articles_v_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_alpha_locales" ADD CONSTRAINT "_articles_v_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_alpha_iframe" ADD CONSTRAINT "_articles_v_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_animated_quote" ADD CONSTRAINT "_articles_v_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_animated_quote" ADD CONSTRAINT "_articles_v_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_animated_quote" ADD CONSTRAINT "_articles_v_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_animated_quote_locales" ADD CONSTRAINT "_articles_v_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel_cards" ADD CONSTRAINT "_articles_v_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel_cards" ADD CONSTRAINT "_articles_v_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel_cards" ADD CONSTRAINT "_articles_v_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel_cards_locales" ADD CONSTRAINT "_articles_v_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel" ADD CONSTRAINT "_articles_v_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_card_carousel_locales" ADD CONSTRAINT "_articles_v_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta" ADD CONSTRAINT "_articles_v_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta" ADD CONSTRAINT "_articles_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta" ADD CONSTRAINT "_articles_v_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta" ADD CONSTRAINT "_articles_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_cta_locales" ADD CONSTRAINT "_articles_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_featured_image" ADD CONSTRAINT "_articles_v_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_featured_image" ADD CONSTRAINT "_articles_v_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_featured_image" ADD CONSTRAINT "_articles_v_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_featured_image_locales" ADD CONSTRAINT "_articles_v_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback" ADD CONSTRAINT "_articles_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback" ADD CONSTRAINT "_articles_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_feedback_locales" ADD CONSTRAINT "_articles_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_text" ADD CONSTRAINT "_articles_v_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_text" ADD CONSTRAINT "_articles_v_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_text" ADD CONSTRAINT "_articles_v_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_text_locales" ADD CONSTRAINT "_articles_v_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_title" ADD CONSTRAINT "_articles_v_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_just_title_locales" ADD CONSTRAINT "_articles_v_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_paragraph_text" ADD CONSTRAINT "_articles_v_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_paragraph_text_locales" ADD CONSTRAINT "_articles_v_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_articles_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_intro_lines_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_articles_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_scenes_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience" ADD CONSTRAINT "_articles_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_pause_experience_locales" ADD CONSTRAINT "_articles_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_social_share" ADD CONSTRAINT "_articles_v_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_social_share_locales" ADD CONSTRAINT "_articles_v_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_take_over" ADD CONSTRAINT "_articles_v_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_take_over" ADD CONSTRAINT "_articles_v_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_take_over" ADD CONSTRAINT "_articles_v_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel_slides" ADD CONSTRAINT "_articles_v_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel_slides" ADD CONSTRAINT "_articles_v_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel_slides" ADD CONSTRAINT "_articles_v_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel_slides_locales" ADD CONSTRAINT "_articles_v_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel" ADD CONSTRAINT "_articles_v_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_text_carousel_locales" ADD CONSTRAINT "_articles_v_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_reference_link_id_links_id_fk" FOREIGN KEY ("version_reference_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_template_id_templates_id_fk" FOREIGN KEY ("version_template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_locales" ADD CONSTRAINT "_articles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_accordion_items" ADD CONSTRAINT "videos_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_accordion_items_locales" ADD CONSTRAINT "videos_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_accordion" ADD CONSTRAINT "videos_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_accordion_locales" ADD CONSTRAINT "videos_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_alpha" ADD CONSTRAINT "videos_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_alpha_locales" ADD CONSTRAINT "videos_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_alpha_iframe" ADD CONSTRAINT "videos_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_animated_quote" ADD CONSTRAINT "videos_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_animated_quote" ADD CONSTRAINT "videos_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_animated_quote" ADD CONSTRAINT "videos_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_animated_quote_locales" ADD CONSTRAINT "videos_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel_cards" ADD CONSTRAINT "videos_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel_cards" ADD CONSTRAINT "videos_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel_cards" ADD CONSTRAINT "videos_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel_cards_locales" ADD CONSTRAINT "videos_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel" ADD CONSTRAINT "videos_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_card_carousel_locales" ADD CONSTRAINT "videos_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_cta" ADD CONSTRAINT "videos_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_cta" ADD CONSTRAINT "videos_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_cta" ADD CONSTRAINT "videos_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_cta" ADD CONSTRAINT "videos_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_cta_locales" ADD CONSTRAINT "videos_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_featured_image" ADD CONSTRAINT "videos_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_featured_image" ADD CONSTRAINT "videos_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_featured_image" ADD CONSTRAINT "videos_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_featured_image_locales" ADD CONSTRAINT "videos_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback" ADD CONSTRAINT "videos_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback" ADD CONSTRAINT "videos_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_feedback_locales" ADD CONSTRAINT "videos_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_text" ADD CONSTRAINT "videos_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_text" ADD CONSTRAINT "videos_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_text" ADD CONSTRAINT "videos_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_text_locales" ADD CONSTRAINT "videos_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_title" ADD CONSTRAINT "videos_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_just_title_locales" ADD CONSTRAINT "videos_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_paragraph_text" ADD CONSTRAINT "videos_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_paragraph_text_locales" ADD CONSTRAINT "videos_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_intro_lines" ADD CONSTRAINT "videos_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "videos_blocks_pause_experience_intro_lines_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_scenes" ADD CONSTRAINT "videos_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "videos_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience" ADD CONSTRAINT "videos_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_pause_experience_locales" ADD CONSTRAINT "videos_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_social_share" ADD CONSTRAINT "videos_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_social_share_locales" ADD CONSTRAINT "videos_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_take_over" ADD CONSTRAINT "videos_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_take_over" ADD CONSTRAINT "videos_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_take_over" ADD CONSTRAINT "videos_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel_slides" ADD CONSTRAINT "videos_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel_slides" ADD CONSTRAINT "videos_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel_slides" ADD CONSTRAINT "videos_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel_slides_locales" ADD CONSTRAINT "videos_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel" ADD CONSTRAINT "videos_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_blocks_text_carousel_locales" ADD CONSTRAINT "videos_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_video_thumbnail_id_media_id_fk" FOREIGN KEY ("video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_locales" ADD CONSTRAINT "videos_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_locales" ADD CONSTRAINT "videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_accordion_items" ADD CONSTRAINT "_videos_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_accordion_items_locales" ADD CONSTRAINT "_videos_v_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_accordion" ADD CONSTRAINT "_videos_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_accordion_locales" ADD CONSTRAINT "_videos_v_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_alpha" ADD CONSTRAINT "_videos_v_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_alpha_locales" ADD CONSTRAINT "_videos_v_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_alpha_iframe" ADD CONSTRAINT "_videos_v_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_animated_quote" ADD CONSTRAINT "_videos_v_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_animated_quote" ADD CONSTRAINT "_videos_v_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_animated_quote" ADD CONSTRAINT "_videos_v_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_animated_quote_locales" ADD CONSTRAINT "_videos_v_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel_cards" ADD CONSTRAINT "_videos_v_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel_cards" ADD CONSTRAINT "_videos_v_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel_cards" ADD CONSTRAINT "_videos_v_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel_cards_locales" ADD CONSTRAINT "_videos_v_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel" ADD CONSTRAINT "_videos_v_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_card_carousel_locales" ADD CONSTRAINT "_videos_v_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_cta" ADD CONSTRAINT "_videos_v_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_cta" ADD CONSTRAINT "_videos_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_cta" ADD CONSTRAINT "_videos_v_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_cta" ADD CONSTRAINT "_videos_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_cta_locales" ADD CONSTRAINT "_videos_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_featured_image" ADD CONSTRAINT "_videos_v_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_featured_image" ADD CONSTRAINT "_videos_v_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_featured_image" ADD CONSTRAINT "_videos_v_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_featured_image_locales" ADD CONSTRAINT "_videos_v_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback" ADD CONSTRAINT "_videos_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback" ADD CONSTRAINT "_videos_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_feedback_locales" ADD CONSTRAINT "_videos_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_text" ADD CONSTRAINT "_videos_v_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_text" ADD CONSTRAINT "_videos_v_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_text" ADD CONSTRAINT "_videos_v_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_text_locales" ADD CONSTRAINT "_videos_v_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_title" ADD CONSTRAINT "_videos_v_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_just_title_locales" ADD CONSTRAINT "_videos_v_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_paragraph_text" ADD CONSTRAINT "_videos_v_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_paragraph_text_locales" ADD CONSTRAINT "_videos_v_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_videos_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_intro_lines_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_videos_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_scenes_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience" ADD CONSTRAINT "_videos_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_pause_experience_locales" ADD CONSTRAINT "_videos_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_social_share" ADD CONSTRAINT "_videos_v_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_social_share_locales" ADD CONSTRAINT "_videos_v_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_take_over" ADD CONSTRAINT "_videos_v_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_take_over" ADD CONSTRAINT "_videos_v_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_take_over" ADD CONSTRAINT "_videos_v_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel_slides" ADD CONSTRAINT "_videos_v_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel_slides" ADD CONSTRAINT "_videos_v_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel_slides" ADD CONSTRAINT "_videos_v_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel_slides_locales" ADD CONSTRAINT "_videos_v_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel" ADD CONSTRAINT "_videos_v_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_blocks_text_carousel_locales" ADD CONSTRAINT "_videos_v_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_parent_id_videos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_video_thumbnail_id_media_id_fk" FOREIGN KEY ("version_video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_template_id_templates_id_fk" FOREIGN KEY ("version_template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_locales" ADD CONSTRAINT "_videos_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_locales" ADD CONSTRAINT "_videos_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_accordion_items" ADD CONSTRAINT "templates_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_accordion_items_locales" ADD CONSTRAINT "templates_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_accordion" ADD CONSTRAINT "templates_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_accordion_locales" ADD CONSTRAINT "templates_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_alpha" ADD CONSTRAINT "templates_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_alpha_locales" ADD CONSTRAINT "templates_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_alpha_iframe" ADD CONSTRAINT "templates_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_animated_quote" ADD CONSTRAINT "templates_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_animated_quote" ADD CONSTRAINT "templates_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_animated_quote" ADD CONSTRAINT "templates_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_animated_quote_locales" ADD CONSTRAINT "templates_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel_cards" ADD CONSTRAINT "templates_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel_cards" ADD CONSTRAINT "templates_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel_cards" ADD CONSTRAINT "templates_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel_cards_locales" ADD CONSTRAINT "templates_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel" ADD CONSTRAINT "templates_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_card_carousel_locales" ADD CONSTRAINT "templates_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_cta" ADD CONSTRAINT "templates_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_cta" ADD CONSTRAINT "templates_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_cta" ADD CONSTRAINT "templates_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_cta" ADD CONSTRAINT "templates_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_cta_locales" ADD CONSTRAINT "templates_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_featured_image" ADD CONSTRAINT "templates_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_featured_image" ADD CONSTRAINT "templates_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_featured_image" ADD CONSTRAINT "templates_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_featured_image_locales" ADD CONSTRAINT "templates_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback" ADD CONSTRAINT "templates_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback" ADD CONSTRAINT "templates_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback_locales" ADD CONSTRAINT "templates_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_text" ADD CONSTRAINT "templates_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_text" ADD CONSTRAINT "templates_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_text" ADD CONSTRAINT "templates_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_text_locales" ADD CONSTRAINT "templates_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_title" ADD CONSTRAINT "templates_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_just_title_locales" ADD CONSTRAINT "templates_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_paragraph_text" ADD CONSTRAINT "templates_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_paragraph_text_locales" ADD CONSTRAINT "templates_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_intro_lines" ADD CONSTRAINT "templates_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "templates_blocks_pause_experience_intro_lines_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_scenes" ADD CONSTRAINT "templates_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "templates_blocks_pause_experience_scenes_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience" ADD CONSTRAINT "templates_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_pause_experience_locales" ADD CONSTRAINT "templates_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_social_share" ADD CONSTRAINT "templates_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_social_share_locales" ADD CONSTRAINT "templates_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_take_over" ADD CONSTRAINT "templates_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_take_over" ADD CONSTRAINT "templates_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_take_over" ADD CONSTRAINT "templates_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel_slides" ADD CONSTRAINT "templates_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel_slides" ADD CONSTRAINT "templates_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel_slides" ADD CONSTRAINT "templates_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel_slides_locales" ADD CONSTRAINT "templates_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel" ADD CONSTRAINT "templates_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_text_carousel_locales" ADD CONSTRAINT "templates_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_locales" ADD CONSTRAINT "templates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_accordion_items" ADD CONSTRAINT "_templates_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_accordion_items_locales" ADD CONSTRAINT "_templates_v_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_accordion" ADD CONSTRAINT "_templates_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_accordion_locales" ADD CONSTRAINT "_templates_v_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_alpha" ADD CONSTRAINT "_templates_v_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_alpha_locales" ADD CONSTRAINT "_templates_v_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_alpha_iframe" ADD CONSTRAINT "_templates_v_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_animated_quote" ADD CONSTRAINT "_templates_v_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_animated_quote" ADD CONSTRAINT "_templates_v_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_animated_quote" ADD CONSTRAINT "_templates_v_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_animated_quote_locales" ADD CONSTRAINT "_templates_v_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel_cards" ADD CONSTRAINT "_templates_v_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel_cards" ADD CONSTRAINT "_templates_v_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel_cards" ADD CONSTRAINT "_templates_v_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel_cards_locales" ADD CONSTRAINT "_templates_v_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel" ADD CONSTRAINT "_templates_v_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_card_carousel_locales" ADD CONSTRAINT "_templates_v_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_cta" ADD CONSTRAINT "_templates_v_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_cta" ADD CONSTRAINT "_templates_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_cta" ADD CONSTRAINT "_templates_v_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_cta" ADD CONSTRAINT "_templates_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_cta_locales" ADD CONSTRAINT "_templates_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_featured_image" ADD CONSTRAINT "_templates_v_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_featured_image" ADD CONSTRAINT "_templates_v_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_featured_image" ADD CONSTRAINT "_templates_v_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_featured_image_locales" ADD CONSTRAINT "_templates_v_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback" ADD CONSTRAINT "_templates_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback" ADD CONSTRAINT "_templates_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback_locales" ADD CONSTRAINT "_templates_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_text" ADD CONSTRAINT "_templates_v_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_text" ADD CONSTRAINT "_templates_v_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_text" ADD CONSTRAINT "_templates_v_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_text_locales" ADD CONSTRAINT "_templates_v_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_title" ADD CONSTRAINT "_templates_v_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_just_title_locales" ADD CONSTRAINT "_templates_v_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_paragraph_text" ADD CONSTRAINT "_templates_v_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_paragraph_text_locales" ADD CONSTRAINT "_templates_v_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_templates_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_intro_lines_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_templates_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_scenes_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience" ADD CONSTRAINT "_templates_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_pause_experience_locales" ADD CONSTRAINT "_templates_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_social_share" ADD CONSTRAINT "_templates_v_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_social_share_locales" ADD CONSTRAINT "_templates_v_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_take_over" ADD CONSTRAINT "_templates_v_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_take_over" ADD CONSTRAINT "_templates_v_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_take_over" ADD CONSTRAINT "_templates_v_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel_slides" ADD CONSTRAINT "_templates_v_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel_slides" ADD CONSTRAINT "_templates_v_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel_slides" ADD CONSTRAINT "_templates_v_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel_slides_locales" ADD CONSTRAINT "_templates_v_blocks_text_carousel_slides_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel" ADD CONSTRAINT "_templates_v_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_text_carousel_locales" ADD CONSTRAINT "_templates_v_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v" ADD CONSTRAINT "_templates_v_parent_id_templates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_locales" ADD CONSTRAINT "_templates_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_items_locales" ADD CONSTRAINT "pages_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_locales" ADD CONSTRAINT "pages_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alpha" ADD CONSTRAINT "pages_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alpha_locales" ADD CONSTRAINT "pages_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alpha_iframe" ADD CONSTRAINT "pages_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_animated_quote" ADD CONSTRAINT "pages_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_animated_quote" ADD CONSTRAINT "pages_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_animated_quote" ADD CONSTRAINT "pages_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_animated_quote_locales" ADD CONSTRAINT "pages_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_carousel" ADD CONSTRAINT "pages_blocks_article_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_carousel_locales" ADD CONSTRAINT "pages_blocks_article_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_article_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards" ADD CONSTRAINT "pages_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_cards_locales" ADD CONSTRAINT "pages_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel" ADD CONSTRAINT "pages_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_carousel_locales" ADD CONSTRAINT "pages_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_article" ADD CONSTRAINT "pages_blocks_featured_article_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_article" ADD CONSTRAINT "pages_blocks_featured_article_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_image" ADD CONSTRAINT "pages_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_image" ADD CONSTRAINT "pages_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_image" ADD CONSTRAINT "pages_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_image_locales" ADD CONSTRAINT "pages_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_video" ADD CONSTRAINT "pages_blocks_featured_video_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_video" ADD CONSTRAINT "pages_blocks_featured_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_video_locales" ADD CONSTRAINT "pages_blocks_featured_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback" ADD CONSTRAINT "pages_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback" ADD CONSTRAINT "pages_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback_locales" ADD CONSTRAINT "pages_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_text" ADD CONSTRAINT "pages_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_text" ADD CONSTRAINT "pages_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_text" ADD CONSTRAINT "pages_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_text_locales" ADD CONSTRAINT "pages_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_title" ADD CONSTRAINT "pages_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_just_title_locales" ADD CONSTRAINT "pages_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_intro_lines" ADD CONSTRAINT "pages_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "pages_blocks_pause_experience_intro_lines_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_scenes" ADD CONSTRAINT "pages_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "pages_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience" ADD CONSTRAINT "pages_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pause_experience_locales" ADD CONSTRAINT "pages_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_paragraph_text" ADD CONSTRAINT "pages_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_paragraph_text_locales" ADD CONSTRAINT "pages_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_share" ADD CONSTRAINT "pages_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_share_locales" ADD CONSTRAINT "pages_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_take_over" ADD CONSTRAINT "pages_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_take_over" ADD CONSTRAINT "pages_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_take_over" ADD CONSTRAINT "pages_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel_slides" ADD CONSTRAINT "pages_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel_slides" ADD CONSTRAINT "pages_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel_slides" ADD CONSTRAINT "pages_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel_slides_locales" ADD CONSTRAINT "pages_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel" ADD CONSTRAINT "pages_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_carousel_locales" ADD CONSTRAINT "pages_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_carousel" ADD CONSTRAINT "pages_blocks_video_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_carousel_locales" ADD CONSTRAINT "pages_blocks_video_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items_locales" ADD CONSTRAINT "_pages_v_blocks_accordion_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_locales" ADD CONSTRAINT "_pages_v_blocks_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alpha" ADD CONSTRAINT "_pages_v_blocks_alpha_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alpha_locales" ADD CONSTRAINT "_pages_v_blocks_alpha_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_alpha"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alpha_iframe" ADD CONSTRAINT "_pages_v_blocks_alpha_iframe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_animated_quote" ADD CONSTRAINT "_pages_v_blocks_animated_quote_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_animated_quote" ADD CONSTRAINT "_pages_v_blocks_animated_quote_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_animated_quote" ADD CONSTRAINT "_pages_v_blocks_animated_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_animated_quote_locales" ADD CONSTRAINT "_pages_v_blocks_animated_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_animated_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_carousel" ADD CONSTRAINT "_pages_v_blocks_article_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_carousel_locales" ADD CONSTRAINT "_pages_v_blocks_article_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_article_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_card_video_id_media_id_fk" FOREIGN KEY ("card_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_cards_locales" ADD CONSTRAINT "_pages_v_blocks_card_carousel_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_carousel_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel" ADD CONSTRAINT "_pages_v_blocks_card_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_carousel_locales" ADD CONSTRAINT "_pages_v_blocks_card_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_article" ADD CONSTRAINT "_pages_v_blocks_featured_article_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_article" ADD CONSTRAINT "_pages_v_blocks_featured_article_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_image" ADD CONSTRAINT "_pages_v_blocks_featured_image_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_image" ADD CONSTRAINT "_pages_v_blocks_featured_image_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_image" ADD CONSTRAINT "_pages_v_blocks_featured_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_image_locales" ADD CONSTRAINT "_pages_v_blocks_featured_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_video" ADD CONSTRAINT "_pages_v_blocks_featured_video_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_video" ADD CONSTRAINT "_pages_v_blocks_featured_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_video_locales" ADD CONSTRAINT "_pages_v_blocks_featured_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback" ADD CONSTRAINT "_pages_v_blocks_feedback_privacy_link_id_links_id_fk" FOREIGN KEY ("privacy_link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback" ADD CONSTRAINT "_pages_v_blocks_feedback_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback_locales" ADD CONSTRAINT "_pages_v_blocks_feedback_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_text" ADD CONSTRAINT "_pages_v_blocks_just_text_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_text" ADD CONSTRAINT "_pages_v_blocks_just_text_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_text" ADD CONSTRAINT "_pages_v_blocks_just_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_text_locales" ADD CONSTRAINT "_pages_v_blocks_just_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_just_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_title" ADD CONSTRAINT "_pages_v_blocks_just_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_just_title_locales" ADD CONSTRAINT "_pages_v_blocks_just_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_just_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_intro_lines" ADD CONSTRAINT "_pages_v_blocks_pause_experience_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_intro_lines_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_intro_lines_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience_intro_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_scenes" ADD CONSTRAINT "_pages_v_blocks_pause_experience_scenes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_scenes_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_scenes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience_scenes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience" ADD CONSTRAINT "_pages_v_blocks_pause_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pause_experience_locales" ADD CONSTRAINT "_pages_v_blocks_pause_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pause_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_paragraph_text" ADD CONSTRAINT "_pages_v_blocks_paragraph_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_paragraph_text_locales" ADD CONSTRAINT "_pages_v_blocks_paragraph_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_paragraph_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_share" ADD CONSTRAINT "_pages_v_blocks_social_share_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_share_locales" ADD CONSTRAINT "_pages_v_blocks_social_share_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social_share"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_take_over" ADD CONSTRAINT "_pages_v_blocks_take_over_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_take_over" ADD CONSTRAINT "_pages_v_blocks_take_over_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_take_over" ADD CONSTRAINT "_pages_v_blocks_take_over_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_text_carousel_slides_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_text_carousel_slides_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_text_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel_slides_locales" ADD CONSTRAINT "_pages_v_blocks_text_carousel_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel" ADD CONSTRAINT "_pages_v_blocks_text_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_carousel_locales" ADD CONSTRAINT "_pages_v_blocks_text_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_carousel" ADD CONSTRAINT "_pages_v_blocks_video_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_carousel_locales" ADD CONSTRAINT "_pages_v_blocks_video_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_links_fk" FOREIGN KEY ("links_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_templates_fk" FOREIGN KEY ("templates_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_links" ADD CONSTRAINT "socials_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials_links" ADD CONSTRAINT "socials_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "links_updated_at_idx" ON "links" USING btree ("updated_at");
  CREATE INDEX "links_created_at_idx" ON "links" USING btree ("created_at");
  CREATE UNIQUE INDEX "links_locales_locale_parent_id_unique" ON "links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "links_rels_order_idx" ON "links_rels" USING btree ("order");
  CREATE INDEX "links_rels_parent_idx" ON "links_rels" USING btree ("parent_id");
  CREATE INDEX "links_rels_path_idx" ON "links_rels" USING btree ("path");
  CREATE INDEX "links_rels_pages_id_idx" ON "links_rels" USING btree ("pages_id");
  CREATE INDEX "links_rels_videos_id_idx" ON "links_rels" USING btree ("videos_id");
  CREATE INDEX "links_rels_articles_id_idx" ON "links_rels" USING btree ("articles_id");
  CREATE INDEX "articles_blocks_accordion_items_order_idx" ON "articles_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_accordion_items_parent_id_idx" ON "articles_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_blocks_accordion_items_locales_locale_parent_id_uni" ON "articles_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_accordion_order_idx" ON "articles_blocks_accordion" USING btree ("_order");
  CREATE INDEX "articles_blocks_accordion_parent_id_idx" ON "articles_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_accordion_path_idx" ON "articles_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_accordion_locales_locale_parent_id_unique" ON "articles_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_alpha_order_idx" ON "articles_blocks_alpha" USING btree ("_order");
  CREATE INDEX "articles_blocks_alpha_parent_id_idx" ON "articles_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_alpha_path_idx" ON "articles_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_alpha_locales_locale_parent_id_unique" ON "articles_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_alpha_iframe_order_idx" ON "articles_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "articles_blocks_alpha_iframe_parent_id_idx" ON "articles_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_alpha_iframe_path_idx" ON "articles_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "articles_blocks_animated_quote_order_idx" ON "articles_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "articles_blocks_animated_quote_parent_id_idx" ON "articles_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_animated_quote_path_idx" ON "articles_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "articles_blocks_animated_quote_background_image_idx" ON "articles_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "articles_blocks_animated_quote_background_video_idx" ON "articles_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "articles_blocks_animated_quote_locales_locale_parent_id_uniq" ON "articles_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_card_carousel_cards_order_idx" ON "articles_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "articles_blocks_card_carousel_cards_parent_id_idx" ON "articles_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_card_carousel_cards_card_image_idx" ON "articles_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "articles_blocks_card_carousel_cards_card_video_idx" ON "articles_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "articles_blocks_card_carousel_cards_locales_locale_parent_id" ON "articles_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_card_carousel_order_idx" ON "articles_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "articles_blocks_card_carousel_parent_id_idx" ON "articles_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_card_carousel_path_idx" ON "articles_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_card_carousel_locales_locale_parent_id_uniqu" ON "articles_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_cta_order_idx" ON "articles_blocks_cta" USING btree ("_order");
  CREATE INDEX "articles_blocks_cta_parent_id_idx" ON "articles_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_cta_path_idx" ON "articles_blocks_cta" USING btree ("_path");
  CREATE INDEX "articles_blocks_cta_link_idx" ON "articles_blocks_cta" USING btree ("link_id");
  CREATE INDEX "articles_blocks_cta_background_image_idx" ON "articles_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "articles_blocks_cta_background_video_idx" ON "articles_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "articles_blocks_cta_locales_locale_parent_id_unique" ON "articles_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_featured_image_order_idx" ON "articles_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_featured_image_parent_id_idx" ON "articles_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_featured_image_path_idx" ON "articles_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_featured_image_desktop_image_idx" ON "articles_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "articles_blocks_featured_image_mobile_image_idx" ON "articles_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "articles_blocks_featured_image_locales_locale_parent_id_uniq" ON "articles_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_feedback_order_idx" ON "articles_blocks_feedback" USING btree ("_order");
  CREATE INDEX "articles_blocks_feedback_parent_id_idx" ON "articles_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_feedback_path_idx" ON "articles_blocks_feedback" USING btree ("_path");
  CREATE INDEX "articles_blocks_feedback_privacy_link_idx" ON "articles_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "articles_blocks_feedback_locales_locale_parent_id_unique" ON "articles_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_just_text_order_idx" ON "articles_blocks_just_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_just_text_parent_id_idx" ON "articles_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_just_text_path_idx" ON "articles_blocks_just_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_just_text_background_video_idx" ON "articles_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "articles_blocks_just_text_background_image_idx" ON "articles_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "articles_blocks_just_text_locales_locale_parent_id_unique" ON "articles_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_just_title_order_idx" ON "articles_blocks_just_title" USING btree ("_order");
  CREATE INDEX "articles_blocks_just_title_parent_id_idx" ON "articles_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_just_title_path_idx" ON "articles_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_just_title_locales_locale_parent_id_unique" ON "articles_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_paragraph_text_order_idx" ON "articles_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_paragraph_text_parent_id_idx" ON "articles_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_paragraph_text_path_idx" ON "articles_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_paragraph_text_locales_locale_parent_id_uniq" ON "articles_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "articles_blocks_social_share_order_idx" ON "articles_blocks_social_share" USING btree ("_order");
  CREATE INDEX "articles_blocks_social_share_parent_id_idx" ON "articles_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_social_share_path_idx" ON "articles_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_social_share_locales_locale_parent_id_unique" ON "articles_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_take_over_order_idx" ON "articles_blocks_take_over" USING btree ("_order");
  CREATE INDEX "articles_blocks_take_over_parent_id_idx" ON "articles_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_take_over_path_idx" ON "articles_blocks_take_over" USING btree ("_path");
  CREATE INDEX "articles_blocks_take_over_video_idx" ON "articles_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "articles_blocks_take_over_image_idx" ON "articles_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "articles_blocks_text_carousel_slides_order_idx" ON "articles_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_carousel_slides_parent_id_idx" ON "articles_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_carousel_slides_background_image_idx" ON "articles_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "articles_blocks_text_carousel_slides_background_video_idx" ON "articles_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "articles_blocks_text_carousel_slides_locales_locale_parent_i" ON "articles_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_blocks_text_carousel_order_idx" ON "articles_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "articles_blocks_text_carousel_parent_id_idx" ON "articles_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_text_carousel_path_idx" ON "articles_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_blocks_text_carousel_locales_locale_parent_id_uniqu" ON "articles_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_image_idx" ON "articles" USING btree ("image_id");
  CREATE INDEX "articles_reference_link_idx" ON "articles" USING btree ("reference_link_id");
  CREATE INDEX "articles_template_idx" ON "articles" USING btree ("template_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_accordion_items_order_idx" ON "_articles_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_accordion_items_parent_id_idx" ON "_articles_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_accordion_items_locales_locale_parent_id_" ON "_articles_v_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_accordion_order_idx" ON "_articles_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_accordion_parent_id_idx" ON "_articles_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_accordion_path_idx" ON "_articles_v_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_accordion_locales_locale_parent_id_unique" ON "_articles_v_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_alpha_order_idx" ON "_articles_v_blocks_alpha" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_alpha_parent_id_idx" ON "_articles_v_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_alpha_path_idx" ON "_articles_v_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_alpha_locales_locale_parent_id_unique" ON "_articles_v_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_alpha_iframe_order_idx" ON "_articles_v_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_alpha_iframe_parent_id_idx" ON "_articles_v_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_alpha_iframe_path_idx" ON "_articles_v_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_animated_quote_order_idx" ON "_articles_v_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_animated_quote_parent_id_idx" ON "_articles_v_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_animated_quote_path_idx" ON "_articles_v_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_animated_quote_background_image_idx" ON "_articles_v_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "_articles_v_blocks_animated_quote_background_video_idx" ON "_articles_v_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_animated_quote_locales_locale_parent_id_u" ON "_articles_v_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_card_carousel_cards_order_idx" ON "_articles_v_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_card_carousel_cards_parent_id_idx" ON "_articles_v_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_card_carousel_cards_card_image_idx" ON "_articles_v_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "_articles_v_blocks_card_carousel_cards_card_video_idx" ON "_articles_v_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_card_carousel_cards_locales_locale_parent" ON "_articles_v_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_card_carousel_order_idx" ON "_articles_v_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_card_carousel_parent_id_idx" ON "_articles_v_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_card_carousel_path_idx" ON "_articles_v_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_card_carousel_locales_locale_parent_id_un" ON "_articles_v_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_cta_order_idx" ON "_articles_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_cta_parent_id_idx" ON "_articles_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_cta_path_idx" ON "_articles_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_cta_link_idx" ON "_articles_v_blocks_cta" USING btree ("link_id");
  CREATE INDEX "_articles_v_blocks_cta_background_image_idx" ON "_articles_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_articles_v_blocks_cta_background_video_idx" ON "_articles_v_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_cta_locales_locale_parent_id_unique" ON "_articles_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_featured_image_order_idx" ON "_articles_v_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_featured_image_parent_id_idx" ON "_articles_v_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_featured_image_path_idx" ON "_articles_v_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_featured_image_desktop_image_idx" ON "_articles_v_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "_articles_v_blocks_featured_image_mobile_image_idx" ON "_articles_v_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_featured_image_locales_locale_parent_id_u" ON "_articles_v_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_feedback_order_idx" ON "_articles_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_feedback_parent_id_idx" ON "_articles_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_feedback_path_idx" ON "_articles_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_feedback_privacy_link_idx" ON "_articles_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_feedback_locales_locale_parent_id_unique" ON "_articles_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_just_text_order_idx" ON "_articles_v_blocks_just_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_just_text_parent_id_idx" ON "_articles_v_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_just_text_path_idx" ON "_articles_v_blocks_just_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_just_text_background_video_idx" ON "_articles_v_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "_articles_v_blocks_just_text_background_image_idx" ON "_articles_v_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_just_text_locales_locale_parent_id_unique" ON "_articles_v_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_just_title_order_idx" ON "_articles_v_blocks_just_title" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_just_title_parent_id_idx" ON "_articles_v_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_just_title_path_idx" ON "_articles_v_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_just_title_locales_locale_parent_id_uniqu" ON "_articles_v_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_paragraph_text_order_idx" ON "_articles_v_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_paragraph_text_parent_id_idx" ON "_articles_v_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_paragraph_text_path_idx" ON "_articles_v_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_paragraph_text_locales_locale_parent_id_u" ON "_articles_v_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "_articles_v_blocks_social_share_order_idx" ON "_articles_v_blocks_social_share" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_social_share_parent_id_idx" ON "_articles_v_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_social_share_path_idx" ON "_articles_v_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_social_share_locales_locale_parent_id_uni" ON "_articles_v_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_take_over_order_idx" ON "_articles_v_blocks_take_over" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_take_over_parent_id_idx" ON "_articles_v_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_take_over_path_idx" ON "_articles_v_blocks_take_over" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_take_over_video_idx" ON "_articles_v_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "_articles_v_blocks_take_over_image_idx" ON "_articles_v_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "_articles_v_blocks_text_carousel_slides_order_idx" ON "_articles_v_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_carousel_slides_parent_id_idx" ON "_articles_v_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_carousel_slides_background_image_idx" ON "_articles_v_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "_articles_v_blocks_text_carousel_slides_background_video_idx" ON "_articles_v_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_articles_v_blocks_text_carousel_slides_locales_locale_paren" ON "_articles_v_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_blocks_text_carousel_order_idx" ON "_articles_v_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_text_carousel_parent_id_idx" ON "_articles_v_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_text_carousel_path_idx" ON "_articles_v_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_articles_v_blocks_text_carousel_locales_locale_parent_id_un" ON "_articles_v_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_image_idx" ON "_articles_v" USING btree ("version_image_id");
  CREATE INDEX "_articles_v_version_version_reference_link_idx" ON "_articles_v" USING btree ("version_reference_link_id");
  CREATE INDEX "_articles_v_version_version_template_idx" ON "_articles_v" USING btree ("version_template_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_snapshot_idx" ON "_articles_v" USING btree ("snapshot");
  CREATE INDEX "_articles_v_published_locale_idx" ON "_articles_v" USING btree ("published_locale");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_version_meta_version_meta_image_idx" ON "_articles_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_articles_v_locales_locale_parent_id_unique" ON "_articles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_accordion_items_order_idx" ON "videos_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "videos_blocks_accordion_items_parent_id_idx" ON "videos_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "videos_blocks_accordion_items_locales_locale_parent_id_uniqu" ON "videos_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_accordion_order_idx" ON "videos_blocks_accordion" USING btree ("_order");
  CREATE INDEX "videos_blocks_accordion_parent_id_idx" ON "videos_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_accordion_path_idx" ON "videos_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_accordion_locales_locale_parent_id_unique" ON "videos_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_alpha_order_idx" ON "videos_blocks_alpha" USING btree ("_order");
  CREATE INDEX "videos_blocks_alpha_parent_id_idx" ON "videos_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_alpha_path_idx" ON "videos_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_alpha_locales_locale_parent_id_unique" ON "videos_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_alpha_iframe_order_idx" ON "videos_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "videos_blocks_alpha_iframe_parent_id_idx" ON "videos_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_alpha_iframe_path_idx" ON "videos_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "videos_blocks_animated_quote_order_idx" ON "videos_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "videos_blocks_animated_quote_parent_id_idx" ON "videos_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_animated_quote_path_idx" ON "videos_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "videos_blocks_animated_quote_background_image_idx" ON "videos_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "videos_blocks_animated_quote_background_video_idx" ON "videos_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "videos_blocks_animated_quote_locales_locale_parent_id_unique" ON "videos_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_card_carousel_cards_order_idx" ON "videos_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "videos_blocks_card_carousel_cards_parent_id_idx" ON "videos_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_card_carousel_cards_card_image_idx" ON "videos_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "videos_blocks_card_carousel_cards_card_video_idx" ON "videos_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "videos_blocks_card_carousel_cards_locales_locale_parent_id_u" ON "videos_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_card_carousel_order_idx" ON "videos_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "videos_blocks_card_carousel_parent_id_idx" ON "videos_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_card_carousel_path_idx" ON "videos_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_card_carousel_locales_locale_parent_id_unique" ON "videos_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_cta_order_idx" ON "videos_blocks_cta" USING btree ("_order");
  CREATE INDEX "videos_blocks_cta_parent_id_idx" ON "videos_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_cta_path_idx" ON "videos_blocks_cta" USING btree ("_path");
  CREATE INDEX "videos_blocks_cta_link_idx" ON "videos_blocks_cta" USING btree ("link_id");
  CREATE INDEX "videos_blocks_cta_background_image_idx" ON "videos_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "videos_blocks_cta_background_video_idx" ON "videos_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "videos_blocks_cta_locales_locale_parent_id_unique" ON "videos_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_featured_image_order_idx" ON "videos_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "videos_blocks_featured_image_parent_id_idx" ON "videos_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_featured_image_path_idx" ON "videos_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "videos_blocks_featured_image_desktop_image_idx" ON "videos_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "videos_blocks_featured_image_mobile_image_idx" ON "videos_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "videos_blocks_featured_image_locales_locale_parent_id_unique" ON "videos_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_feedback_order_idx" ON "videos_blocks_feedback" USING btree ("_order");
  CREATE INDEX "videos_blocks_feedback_parent_id_idx" ON "videos_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_feedback_path_idx" ON "videos_blocks_feedback" USING btree ("_path");
  CREATE INDEX "videos_blocks_feedback_privacy_link_idx" ON "videos_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "videos_blocks_feedback_locales_locale_parent_id_unique" ON "videos_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_just_text_order_idx" ON "videos_blocks_just_text" USING btree ("_order");
  CREATE INDEX "videos_blocks_just_text_parent_id_idx" ON "videos_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_just_text_path_idx" ON "videos_blocks_just_text" USING btree ("_path");
  CREATE INDEX "videos_blocks_just_text_background_video_idx" ON "videos_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "videos_blocks_just_text_background_image_idx" ON "videos_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "videos_blocks_just_text_locales_locale_parent_id_unique" ON "videos_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_just_title_order_idx" ON "videos_blocks_just_title" USING btree ("_order");
  CREATE INDEX "videos_blocks_just_title_parent_id_idx" ON "videos_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_just_title_path_idx" ON "videos_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_just_title_locales_locale_parent_id_unique" ON "videos_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_paragraph_text_order_idx" ON "videos_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "videos_blocks_paragraph_text_parent_id_idx" ON "videos_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_paragraph_text_path_idx" ON "videos_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_paragraph_text_locales_locale_parent_id_unique" ON "videos_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "videos_blocks_social_share_order_idx" ON "videos_blocks_social_share" USING btree ("_order");
  CREATE INDEX "videos_blocks_social_share_parent_id_idx" ON "videos_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_social_share_path_idx" ON "videos_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_social_share_locales_locale_parent_id_unique" ON "videos_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_take_over_order_idx" ON "videos_blocks_take_over" USING btree ("_order");
  CREATE INDEX "videos_blocks_take_over_parent_id_idx" ON "videos_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_take_over_path_idx" ON "videos_blocks_take_over" USING btree ("_path");
  CREATE INDEX "videos_blocks_take_over_video_idx" ON "videos_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "videos_blocks_take_over_image_idx" ON "videos_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "videos_blocks_text_carousel_slides_order_idx" ON "videos_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "videos_blocks_text_carousel_slides_parent_id_idx" ON "videos_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_text_carousel_slides_background_image_idx" ON "videos_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "videos_blocks_text_carousel_slides_background_video_idx" ON "videos_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "videos_blocks_text_carousel_slides_locales_locale_parent_id_" ON "videos_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_blocks_text_carousel_order_idx" ON "videos_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "videos_blocks_text_carousel_parent_id_idx" ON "videos_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "videos_blocks_text_carousel_path_idx" ON "videos_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "videos_blocks_text_carousel_locales_locale_parent_id_unique" ON "videos_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "videos_slug_idx" ON "videos" USING btree ("slug");
  CREATE INDEX "videos_thumbnail_idx" ON "videos" USING btree ("thumbnail_id");
  CREATE INDEX "videos_video_thumbnail_idx" ON "videos" USING btree ("video_thumbnail_id");
  CREATE INDEX "videos_template_idx" ON "videos" USING btree ("template_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE INDEX "videos__status_idx" ON "videos" USING btree ("_status");
  CREATE INDEX "videos_meta_meta_image_idx" ON "videos_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "videos_locales_locale_parent_id_unique" ON "videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_accordion_items_order_idx" ON "_videos_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_accordion_items_parent_id_idx" ON "_videos_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_accordion_items_locales_locale_parent_id_un" ON "_videos_v_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_accordion_order_idx" ON "_videos_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_accordion_parent_id_idx" ON "_videos_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_accordion_path_idx" ON "_videos_v_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_accordion_locales_locale_parent_id_unique" ON "_videos_v_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_alpha_order_idx" ON "_videos_v_blocks_alpha" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_alpha_parent_id_idx" ON "_videos_v_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_alpha_path_idx" ON "_videos_v_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_alpha_locales_locale_parent_id_unique" ON "_videos_v_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_alpha_iframe_order_idx" ON "_videos_v_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_alpha_iframe_parent_id_idx" ON "_videos_v_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_alpha_iframe_path_idx" ON "_videos_v_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_animated_quote_order_idx" ON "_videos_v_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_animated_quote_parent_id_idx" ON "_videos_v_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_animated_quote_path_idx" ON "_videos_v_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_animated_quote_background_image_idx" ON "_videos_v_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "_videos_v_blocks_animated_quote_background_video_idx" ON "_videos_v_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_animated_quote_locales_locale_parent_id_uni" ON "_videos_v_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_card_carousel_cards_order_idx" ON "_videos_v_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_card_carousel_cards_parent_id_idx" ON "_videos_v_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_card_carousel_cards_card_image_idx" ON "_videos_v_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "_videos_v_blocks_card_carousel_cards_card_video_idx" ON "_videos_v_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_card_carousel_cards_locales_locale_parent_i" ON "_videos_v_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_card_carousel_order_idx" ON "_videos_v_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_card_carousel_parent_id_idx" ON "_videos_v_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_card_carousel_path_idx" ON "_videos_v_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_card_carousel_locales_locale_parent_id_uniq" ON "_videos_v_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_cta_order_idx" ON "_videos_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_cta_parent_id_idx" ON "_videos_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_cta_path_idx" ON "_videos_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_cta_link_idx" ON "_videos_v_blocks_cta" USING btree ("link_id");
  CREATE INDEX "_videos_v_blocks_cta_background_image_idx" ON "_videos_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_videos_v_blocks_cta_background_video_idx" ON "_videos_v_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_cta_locales_locale_parent_id_unique" ON "_videos_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_featured_image_order_idx" ON "_videos_v_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_featured_image_parent_id_idx" ON "_videos_v_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_featured_image_path_idx" ON "_videos_v_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_featured_image_desktop_image_idx" ON "_videos_v_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "_videos_v_blocks_featured_image_mobile_image_idx" ON "_videos_v_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_featured_image_locales_locale_parent_id_uni" ON "_videos_v_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_feedback_order_idx" ON "_videos_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_feedback_parent_id_idx" ON "_videos_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_feedback_path_idx" ON "_videos_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_feedback_privacy_link_idx" ON "_videos_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_feedback_locales_locale_parent_id_unique" ON "_videos_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_just_text_order_idx" ON "_videos_v_blocks_just_text" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_just_text_parent_id_idx" ON "_videos_v_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_just_text_path_idx" ON "_videos_v_blocks_just_text" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_just_text_background_video_idx" ON "_videos_v_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "_videos_v_blocks_just_text_background_image_idx" ON "_videos_v_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_just_text_locales_locale_parent_id_unique" ON "_videos_v_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_just_title_order_idx" ON "_videos_v_blocks_just_title" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_just_title_parent_id_idx" ON "_videos_v_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_just_title_path_idx" ON "_videos_v_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_just_title_locales_locale_parent_id_unique" ON "_videos_v_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_paragraph_text_order_idx" ON "_videos_v_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_paragraph_text_parent_id_idx" ON "_videos_v_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_paragraph_text_path_idx" ON "_videos_v_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_paragraph_text_locales_locale_parent_id_uni" ON "_videos_v_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "_videos_v_blocks_social_share_order_idx" ON "_videos_v_blocks_social_share" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_social_share_parent_id_idx" ON "_videos_v_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_social_share_path_idx" ON "_videos_v_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_social_share_locales_locale_parent_id_uniqu" ON "_videos_v_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_take_over_order_idx" ON "_videos_v_blocks_take_over" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_take_over_parent_id_idx" ON "_videos_v_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_take_over_path_idx" ON "_videos_v_blocks_take_over" USING btree ("_path");
  CREATE INDEX "_videos_v_blocks_take_over_video_idx" ON "_videos_v_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "_videos_v_blocks_take_over_image_idx" ON "_videos_v_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "_videos_v_blocks_text_carousel_slides_order_idx" ON "_videos_v_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_text_carousel_slides_parent_id_idx" ON "_videos_v_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_text_carousel_slides_background_image_idx" ON "_videos_v_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "_videos_v_blocks_text_carousel_slides_background_video_idx" ON "_videos_v_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_videos_v_blocks_text_carousel_slides_locales_locale_parent_" ON "_videos_v_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_blocks_text_carousel_order_idx" ON "_videos_v_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "_videos_v_blocks_text_carousel_parent_id_idx" ON "_videos_v_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_blocks_text_carousel_path_idx" ON "_videos_v_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_videos_v_blocks_text_carousel_locales_locale_parent_id_uniq" ON "_videos_v_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_videos_v_parent_idx" ON "_videos_v" USING btree ("parent_id");
  CREATE INDEX "_videos_v_version_version_slug_idx" ON "_videos_v" USING btree ("version_slug");
  CREATE INDEX "_videos_v_version_version_thumbnail_idx" ON "_videos_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_videos_v_version_version_video_thumbnail_idx" ON "_videos_v" USING btree ("version_video_thumbnail_id");
  CREATE INDEX "_videos_v_version_version_template_idx" ON "_videos_v" USING btree ("version_template_id");
  CREATE INDEX "_videos_v_version_version_updated_at_idx" ON "_videos_v" USING btree ("version_updated_at");
  CREATE INDEX "_videos_v_version_version_created_at_idx" ON "_videos_v" USING btree ("version_created_at");
  CREATE INDEX "_videos_v_version_version__status_idx" ON "_videos_v" USING btree ("version__status");
  CREATE INDEX "_videos_v_created_at_idx" ON "_videos_v" USING btree ("created_at");
  CREATE INDEX "_videos_v_updated_at_idx" ON "_videos_v" USING btree ("updated_at");
  CREATE INDEX "_videos_v_snapshot_idx" ON "_videos_v" USING btree ("snapshot");
  CREATE INDEX "_videos_v_published_locale_idx" ON "_videos_v" USING btree ("published_locale");
  CREATE INDEX "_videos_v_latest_idx" ON "_videos_v" USING btree ("latest");
  CREATE INDEX "_videos_v_version_meta_version_meta_image_idx" ON "_videos_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_videos_v_locales_locale_parent_id_unique" ON "_videos_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_accordion_items_order_idx" ON "templates_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "templates_blocks_accordion_items_parent_id_idx" ON "templates_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "templates_blocks_accordion_items_locales_locale_parent_id_un" ON "templates_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_accordion_order_idx" ON "templates_blocks_accordion" USING btree ("_order");
  CREATE INDEX "templates_blocks_accordion_parent_id_idx" ON "templates_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_accordion_path_idx" ON "templates_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_accordion_locales_locale_parent_id_unique" ON "templates_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_alpha_order_idx" ON "templates_blocks_alpha" USING btree ("_order");
  CREATE INDEX "templates_blocks_alpha_parent_id_idx" ON "templates_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_alpha_path_idx" ON "templates_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_alpha_locales_locale_parent_id_unique" ON "templates_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_alpha_iframe_order_idx" ON "templates_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "templates_blocks_alpha_iframe_parent_id_idx" ON "templates_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_alpha_iframe_path_idx" ON "templates_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "templates_blocks_animated_quote_order_idx" ON "templates_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "templates_blocks_animated_quote_parent_id_idx" ON "templates_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_animated_quote_path_idx" ON "templates_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "templates_blocks_animated_quote_background_image_idx" ON "templates_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "templates_blocks_animated_quote_background_video_idx" ON "templates_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "templates_blocks_animated_quote_locales_locale_parent_id_uni" ON "templates_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_card_carousel_cards_order_idx" ON "templates_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "templates_blocks_card_carousel_cards_parent_id_idx" ON "templates_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_card_carousel_cards_card_image_idx" ON "templates_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "templates_blocks_card_carousel_cards_card_video_idx" ON "templates_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "templates_blocks_card_carousel_cards_locales_locale_parent_i" ON "templates_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_card_carousel_order_idx" ON "templates_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "templates_blocks_card_carousel_parent_id_idx" ON "templates_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_card_carousel_path_idx" ON "templates_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_card_carousel_locales_locale_parent_id_uniq" ON "templates_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_cta_order_idx" ON "templates_blocks_cta" USING btree ("_order");
  CREATE INDEX "templates_blocks_cta_parent_id_idx" ON "templates_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_cta_path_idx" ON "templates_blocks_cta" USING btree ("_path");
  CREATE INDEX "templates_blocks_cta_link_idx" ON "templates_blocks_cta" USING btree ("link_id");
  CREATE INDEX "templates_blocks_cta_background_image_idx" ON "templates_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "templates_blocks_cta_background_video_idx" ON "templates_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "templates_blocks_cta_locales_locale_parent_id_unique" ON "templates_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_featured_image_order_idx" ON "templates_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "templates_blocks_featured_image_parent_id_idx" ON "templates_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_featured_image_path_idx" ON "templates_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "templates_blocks_featured_image_desktop_image_idx" ON "templates_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "templates_blocks_featured_image_mobile_image_idx" ON "templates_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "templates_blocks_featured_image_locales_locale_parent_id_uni" ON "templates_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_feedback_order_idx" ON "templates_blocks_feedback" USING btree ("_order");
  CREATE INDEX "templates_blocks_feedback_parent_id_idx" ON "templates_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_feedback_path_idx" ON "templates_blocks_feedback" USING btree ("_path");
  CREATE INDEX "templates_blocks_feedback_privacy_link_idx" ON "templates_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "templates_blocks_feedback_locales_locale_parent_id_unique" ON "templates_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_just_text_order_idx" ON "templates_blocks_just_text" USING btree ("_order");
  CREATE INDEX "templates_blocks_just_text_parent_id_idx" ON "templates_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_just_text_path_idx" ON "templates_blocks_just_text" USING btree ("_path");
  CREATE INDEX "templates_blocks_just_text_background_video_idx" ON "templates_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "templates_blocks_just_text_background_image_idx" ON "templates_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "templates_blocks_just_text_locales_locale_parent_id_unique" ON "templates_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_just_title_order_idx" ON "templates_blocks_just_title" USING btree ("_order");
  CREATE INDEX "templates_blocks_just_title_parent_id_idx" ON "templates_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_just_title_path_idx" ON "templates_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_just_title_locales_locale_parent_id_unique" ON "templates_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_paragraph_text_order_idx" ON "templates_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "templates_blocks_paragraph_text_parent_id_idx" ON "templates_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_paragraph_text_path_idx" ON "templates_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_paragraph_text_locales_locale_parent_id_uni" ON "templates_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "templates_blocks_social_share_order_idx" ON "templates_blocks_social_share" USING btree ("_order");
  CREATE INDEX "templates_blocks_social_share_parent_id_idx" ON "templates_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_social_share_path_idx" ON "templates_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_social_share_locales_locale_parent_id_uniqu" ON "templates_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_take_over_order_idx" ON "templates_blocks_take_over" USING btree ("_order");
  CREATE INDEX "templates_blocks_take_over_parent_id_idx" ON "templates_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_take_over_path_idx" ON "templates_blocks_take_over" USING btree ("_path");
  CREATE INDEX "templates_blocks_take_over_video_idx" ON "templates_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "templates_blocks_take_over_image_idx" ON "templates_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "templates_blocks_text_carousel_slides_order_idx" ON "templates_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "templates_blocks_text_carousel_slides_parent_id_idx" ON "templates_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_text_carousel_slides_background_image_idx" ON "templates_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "templates_blocks_text_carousel_slides_background_video_idx" ON "templates_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "templates_blocks_text_carousel_slides_locales_locale_parent_" ON "templates_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_text_carousel_order_idx" ON "templates_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "templates_blocks_text_carousel_parent_id_idx" ON "templates_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_text_carousel_path_idx" ON "templates_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_blocks_text_carousel_locales_locale_parent_id_uniq" ON "templates_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_updated_at_idx" ON "templates" USING btree ("updated_at");
  CREATE INDEX "templates_created_at_idx" ON "templates" USING btree ("created_at");
  CREATE INDEX "templates__status_idx" ON "templates" USING btree ("_status");
  CREATE UNIQUE INDEX "templates_locales_locale_parent_id_unique" ON "templates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_accordion_items_order_idx" ON "_templates_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_accordion_items_parent_id_idx" ON "_templates_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_accordion_items_locales_locale_parent_id" ON "_templates_v_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_accordion_order_idx" ON "_templates_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_accordion_parent_id_idx" ON "_templates_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_accordion_path_idx" ON "_templates_v_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_accordion_locales_locale_parent_id_uniqu" ON "_templates_v_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_alpha_order_idx" ON "_templates_v_blocks_alpha" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_alpha_parent_id_idx" ON "_templates_v_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_alpha_path_idx" ON "_templates_v_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_alpha_locales_locale_parent_id_unique" ON "_templates_v_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_alpha_iframe_order_idx" ON "_templates_v_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_alpha_iframe_parent_id_idx" ON "_templates_v_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_alpha_iframe_path_idx" ON "_templates_v_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_animated_quote_order_idx" ON "_templates_v_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_animated_quote_parent_id_idx" ON "_templates_v_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_animated_quote_path_idx" ON "_templates_v_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_animated_quote_background_image_idx" ON "_templates_v_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "_templates_v_blocks_animated_quote_background_video_idx" ON "_templates_v_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_animated_quote_locales_locale_parent_id_" ON "_templates_v_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_card_carousel_cards_order_idx" ON "_templates_v_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_card_carousel_cards_parent_id_idx" ON "_templates_v_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_card_carousel_cards_card_image_idx" ON "_templates_v_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "_templates_v_blocks_card_carousel_cards_card_video_idx" ON "_templates_v_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_card_carousel_cards_locales_locale_paren" ON "_templates_v_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_card_carousel_order_idx" ON "_templates_v_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_card_carousel_parent_id_idx" ON "_templates_v_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_card_carousel_path_idx" ON "_templates_v_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_card_carousel_locales_locale_parent_id_u" ON "_templates_v_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_cta_order_idx" ON "_templates_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_cta_parent_id_idx" ON "_templates_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_cta_path_idx" ON "_templates_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_cta_link_idx" ON "_templates_v_blocks_cta" USING btree ("link_id");
  CREATE INDEX "_templates_v_blocks_cta_background_image_idx" ON "_templates_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_templates_v_blocks_cta_background_video_idx" ON "_templates_v_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_cta_locales_locale_parent_id_unique" ON "_templates_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_featured_image_order_idx" ON "_templates_v_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_featured_image_parent_id_idx" ON "_templates_v_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_featured_image_path_idx" ON "_templates_v_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_featured_image_desktop_image_idx" ON "_templates_v_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "_templates_v_blocks_featured_image_mobile_image_idx" ON "_templates_v_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_featured_image_locales_locale_parent_id_" ON "_templates_v_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_order_idx" ON "_templates_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_feedback_parent_id_idx" ON "_templates_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_path_idx" ON "_templates_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_feedback_privacy_link_idx" ON "_templates_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_feedback_locales_locale_parent_id_unique" ON "_templates_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_just_text_order_idx" ON "_templates_v_blocks_just_text" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_just_text_parent_id_idx" ON "_templates_v_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_just_text_path_idx" ON "_templates_v_blocks_just_text" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_just_text_background_video_idx" ON "_templates_v_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "_templates_v_blocks_just_text_background_image_idx" ON "_templates_v_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_just_text_locales_locale_parent_id_uniqu" ON "_templates_v_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_just_title_order_idx" ON "_templates_v_blocks_just_title" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_just_title_parent_id_idx" ON "_templates_v_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_just_title_path_idx" ON "_templates_v_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_just_title_locales_locale_parent_id_uniq" ON "_templates_v_blocks_just_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_paragraph_text_order_idx" ON "_templates_v_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_paragraph_text_parent_id_idx" ON "_templates_v_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_paragraph_text_path_idx" ON "_templates_v_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_paragraph_text_locales_locale_parent_id_" ON "_templates_v_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "_templates_v_blocks_social_share_order_idx" ON "_templates_v_blocks_social_share" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_social_share_parent_id_idx" ON "_templates_v_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_social_share_path_idx" ON "_templates_v_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_social_share_locales_locale_parent_id_un" ON "_templates_v_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_take_over_order_idx" ON "_templates_v_blocks_take_over" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_take_over_parent_id_idx" ON "_templates_v_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_take_over_path_idx" ON "_templates_v_blocks_take_over" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_take_over_video_idx" ON "_templates_v_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "_templates_v_blocks_take_over_image_idx" ON "_templates_v_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "_templates_v_blocks_text_carousel_slides_order_idx" ON "_templates_v_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_text_carousel_slides_parent_id_idx" ON "_templates_v_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_text_carousel_slides_background_imag_idx" ON "_templates_v_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "_templates_v_blocks_text_carousel_slides_background_vide_idx" ON "_templates_v_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_templates_v_blocks_text_carousel_slides_locales_locale_pare" ON "_templates_v_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_blocks_text_carousel_order_idx" ON "_templates_v_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_text_carousel_parent_id_idx" ON "_templates_v_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_text_carousel_path_idx" ON "_templates_v_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_templates_v_blocks_text_carousel_locales_locale_parent_id_u" ON "_templates_v_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_templates_v_parent_idx" ON "_templates_v" USING btree ("parent_id");
  CREATE INDEX "_templates_v_version_version_updated_at_idx" ON "_templates_v" USING btree ("version_updated_at");
  CREATE INDEX "_templates_v_version_version_created_at_idx" ON "_templates_v" USING btree ("version_created_at");
  CREATE INDEX "_templates_v_version_version__status_idx" ON "_templates_v" USING btree ("version__status");
  CREATE INDEX "_templates_v_created_at_idx" ON "_templates_v" USING btree ("created_at");
  CREATE INDEX "_templates_v_updated_at_idx" ON "_templates_v" USING btree ("updated_at");
  CREATE INDEX "_templates_v_snapshot_idx" ON "_templates_v" USING btree ("snapshot");
  CREATE INDEX "_templates_v_published_locale_idx" ON "_templates_v" USING btree ("published_locale");
  CREATE INDEX "_templates_v_latest_idx" ON "_templates_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_templates_v_locales_locale_parent_id_unique" ON "_templates_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_accordion_items_locales_locale_parent_id_unique" ON "pages_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_accordion_locales_locale_parent_id_unique" ON "pages_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_alpha_order_idx" ON "pages_blocks_alpha" USING btree ("_order");
  CREATE INDEX "pages_blocks_alpha_parent_id_idx" ON "pages_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alpha_path_idx" ON "pages_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_alpha_locales_locale_parent_id_unique" ON "pages_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_alpha_iframe_order_idx" ON "pages_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "pages_blocks_alpha_iframe_parent_id_idx" ON "pages_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alpha_iframe_path_idx" ON "pages_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "pages_blocks_animated_quote_order_idx" ON "pages_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_animated_quote_parent_id_idx" ON "pages_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_animated_quote_path_idx" ON "pages_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_animated_quote_background_image_idx" ON "pages_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_animated_quote_background_video_idx" ON "pages_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "pages_blocks_animated_quote_locales_locale_parent_id_unique" ON "pages_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_article_carousel_order_idx" ON "pages_blocks_article_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_carousel_parent_id_idx" ON "pages_blocks_article_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_carousel_path_idx" ON "pages_blocks_article_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_article_carousel_locales_locale_parent_id_uniqu" ON "pages_blocks_article_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_order_idx" ON "pages_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_carousel_cards_parent_id_idx" ON "pages_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_card_image_idx" ON "pages_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "pages_blocks_card_carousel_cards_card_video_idx" ON "pages_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "pages_blocks_card_carousel_cards_locales_locale_parent_id_un" ON "pages_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_order_idx" ON "pages_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_carousel_parent_id_idx" ON "pages_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_carousel_path_idx" ON "pages_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_card_carousel_locales_locale_parent_id_unique" ON "pages_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_link_idx" ON "pages_blocks_cta" USING btree ("link_id");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_cta_background_video_idx" ON "pages_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_featured_article_order_idx" ON "pages_blocks_featured_article" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_article_parent_id_idx" ON "pages_blocks_featured_article" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_article_path_idx" ON "pages_blocks_featured_article" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_article_article_idx" ON "pages_blocks_featured_article" USING btree ("article_id");
  CREATE INDEX "pages_blocks_featured_image_order_idx" ON "pages_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_image_parent_id_idx" ON "pages_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_image_path_idx" ON "pages_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_image_desktop_image_idx" ON "pages_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "pages_blocks_featured_image_mobile_image_idx" ON "pages_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "pages_blocks_featured_image_locales_locale_parent_id_unique" ON "pages_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_featured_video_order_idx" ON "pages_blocks_featured_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_video_parent_id_idx" ON "pages_blocks_featured_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_video_path_idx" ON "pages_blocks_featured_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_video_video_idx" ON "pages_blocks_featured_video" USING btree ("video_id");
  CREATE UNIQUE INDEX "pages_blocks_featured_video_locales_locale_parent_id_unique" ON "pages_blocks_featured_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feedback_order_idx" ON "pages_blocks_feedback" USING btree ("_order");
  CREATE INDEX "pages_blocks_feedback_parent_id_idx" ON "pages_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feedback_path_idx" ON "pages_blocks_feedback" USING btree ("_path");
  CREATE INDEX "pages_blocks_feedback_privacy_link_idx" ON "pages_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "pages_blocks_feedback_locales_locale_parent_id_unique" ON "pages_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_just_text_order_idx" ON "pages_blocks_just_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_just_text_parent_id_idx" ON "pages_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_just_text_path_idx" ON "pages_blocks_just_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_just_text_background_video_idx" ON "pages_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "pages_blocks_just_text_background_image_idx" ON "pages_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_just_text_locales_locale_parent_id_unique" ON "pages_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_just_title_order_idx" ON "pages_blocks_just_title" USING btree ("_order");
  CREATE INDEX "pages_blocks_just_title_parent_id_idx" ON "pages_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_just_title_path_idx" ON "pages_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_just_title_locales_locale_parent_id_unique" ON "pages_blocks_just_title_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "pages_blocks_paragraph_text_order_idx" ON "pages_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_paragraph_text_parent_id_idx" ON "pages_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_paragraph_text_path_idx" ON "pages_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_paragraph_text_locales_locale_parent_id_unique" ON "pages_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_social_share_order_idx" ON "pages_blocks_social_share" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_share_parent_id_idx" ON "pages_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_share_path_idx" ON "pages_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_social_share_locales_locale_parent_id_unique" ON "pages_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_take_over_order_idx" ON "pages_blocks_take_over" USING btree ("_order");
  CREATE INDEX "pages_blocks_take_over_parent_id_idx" ON "pages_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_take_over_path_idx" ON "pages_blocks_take_over" USING btree ("_path");
  CREATE INDEX "pages_blocks_take_over_video_idx" ON "pages_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "pages_blocks_take_over_image_idx" ON "pages_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "pages_blocks_text_carousel_slides_order_idx" ON "pages_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_carousel_slides_parent_id_idx" ON "pages_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_carousel_slides_background_image_idx" ON "pages_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_text_carousel_slides_background_video_idx" ON "pages_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "pages_blocks_text_carousel_slides_locales_locale_parent_id_u" ON "pages_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_carousel_order_idx" ON "pages_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_carousel_parent_id_idx" ON "pages_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_carousel_path_idx" ON "pages_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_text_carousel_locales_locale_parent_id_unique" ON "pages_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_carousel_order_idx" ON "pages_blocks_video_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_carousel_parent_id_idx" ON "pages_blocks_video_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_carousel_path_idx" ON "pages_blocks_video_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_video_carousel_locales_locale_parent_id_unique" ON "pages_blocks_video_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "pages_rels_videos_id_idx" ON "pages_rels" USING btree ("videos_id");
  CREATE INDEX "_pages_v_blocks_accordion_items_order_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_accordion_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_accordion_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_accordion_locales_locale_parent_id_unique" ON "_pages_v_blocks_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_alpha_order_idx" ON "_pages_v_blocks_alpha" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alpha_parent_id_idx" ON "_pages_v_blocks_alpha" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alpha_path_idx" ON "_pages_v_blocks_alpha" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_alpha_locales_locale_parent_id_unique" ON "_pages_v_blocks_alpha_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_alpha_iframe_order_idx" ON "_pages_v_blocks_alpha_iframe" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alpha_iframe_parent_id_idx" ON "_pages_v_blocks_alpha_iframe" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alpha_iframe_path_idx" ON "_pages_v_blocks_alpha_iframe" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_animated_quote_order_idx" ON "_pages_v_blocks_animated_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_animated_quote_parent_id_idx" ON "_pages_v_blocks_animated_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_animated_quote_path_idx" ON "_pages_v_blocks_animated_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_animated_quote_background_image_idx" ON "_pages_v_blocks_animated_quote" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_animated_quote_background_video_idx" ON "_pages_v_blocks_animated_quote" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_animated_quote_locales_locale_parent_id_uniq" ON "_pages_v_blocks_animated_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_article_carousel_order_idx" ON "_pages_v_blocks_article_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_carousel_parent_id_idx" ON "_pages_v_blocks_article_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_carousel_path_idx" ON "_pages_v_blocks_article_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_article_carousel_locales_locale_parent_id_un" ON "_pages_v_blocks_article_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_order_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_parent_id_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_card_image_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("card_image_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_cards_card_video_idx" ON "_pages_v_blocks_card_carousel_cards" USING btree ("card_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_carousel_cards_locales_locale_parent_id" ON "_pages_v_blocks_card_carousel_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_order_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_carousel_parent_id_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_carousel_path_idx" ON "_pages_v_blocks_card_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_card_carousel_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_card_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_link_idx" ON "_pages_v_blocks_cta" USING btree ("link_id");
  CREATE INDEX "_pages_v_blocks_cta_background_image_idx" ON "_pages_v_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_cta_background_video_idx" ON "_pages_v_blocks_cta" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_article_order_idx" ON "_pages_v_blocks_featured_article" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_article_parent_id_idx" ON "_pages_v_blocks_featured_article" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_article_path_idx" ON "_pages_v_blocks_featured_article" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_article_article_idx" ON "_pages_v_blocks_featured_article" USING btree ("article_id");
  CREATE INDEX "_pages_v_blocks_featured_image_order_idx" ON "_pages_v_blocks_featured_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_image_parent_id_idx" ON "_pages_v_blocks_featured_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_image_path_idx" ON "_pages_v_blocks_featured_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_image_desktop_image_idx" ON "_pages_v_blocks_featured_image" USING btree ("desktop_image_id");
  CREATE INDEX "_pages_v_blocks_featured_image_mobile_image_idx" ON "_pages_v_blocks_featured_image" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_featured_image_locales_locale_parent_id_uniq" ON "_pages_v_blocks_featured_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_video_order_idx" ON "_pages_v_blocks_featured_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_video_parent_id_idx" ON "_pages_v_blocks_featured_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_video_path_idx" ON "_pages_v_blocks_featured_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_video_video_idx" ON "_pages_v_blocks_featured_video" USING btree ("video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_featured_video_locales_locale_parent_id_uniq" ON "_pages_v_blocks_featured_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_order_idx" ON "_pages_v_blocks_feedback" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feedback_parent_id_idx" ON "_pages_v_blocks_feedback" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_path_idx" ON "_pages_v_blocks_feedback" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feedback_privacy_link_idx" ON "_pages_v_blocks_feedback" USING btree ("privacy_link_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feedback_locales_locale_parent_id_unique" ON "_pages_v_blocks_feedback_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_just_text_order_idx" ON "_pages_v_blocks_just_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_just_text_parent_id_idx" ON "_pages_v_blocks_just_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_just_text_path_idx" ON "_pages_v_blocks_just_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_just_text_background_video_idx" ON "_pages_v_blocks_just_text" USING btree ("background_video_id");
  CREATE INDEX "_pages_v_blocks_just_text_background_image_idx" ON "_pages_v_blocks_just_text" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_just_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_just_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_just_title_order_idx" ON "_pages_v_blocks_just_title" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_just_title_parent_id_idx" ON "_pages_v_blocks_just_title" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_just_title_path_idx" ON "_pages_v_blocks_just_title" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_just_title_locales_locale_parent_id_unique" ON "_pages_v_blocks_just_title_locales" USING btree ("_locale","_parent_id");
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
  CREATE UNIQUE INDEX "_pages_v_blocks_pause_experience_locales_locale_parent_id_un" ON "_pages_v_blocks_pause_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_paragraph_text_order_idx" ON "_pages_v_blocks_paragraph_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_paragraph_text_parent_id_idx" ON "_pages_v_blocks_paragraph_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_paragraph_text_path_idx" ON "_pages_v_blocks_paragraph_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_paragraph_text_locales_locale_parent_id_uniq" ON "_pages_v_blocks_paragraph_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_social_share_order_idx" ON "_pages_v_blocks_social_share" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_share_parent_id_idx" ON "_pages_v_blocks_social_share" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_share_path_idx" ON "_pages_v_blocks_social_share" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_social_share_locales_locale_parent_id_unique" ON "_pages_v_blocks_social_share_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_take_over_order_idx" ON "_pages_v_blocks_take_over" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_take_over_parent_id_idx" ON "_pages_v_blocks_take_over" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_take_over_path_idx" ON "_pages_v_blocks_take_over" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_take_over_video_idx" ON "_pages_v_blocks_take_over" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_take_over_image_idx" ON "_pages_v_blocks_take_over" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_text_carousel_slides_order_idx" ON "_pages_v_blocks_text_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_carousel_slides_parent_id_idx" ON "_pages_v_blocks_text_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_carousel_slides_background_image_idx" ON "_pages_v_blocks_text_carousel_slides" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_text_carousel_slides_background_video_idx" ON "_pages_v_blocks_text_carousel_slides" USING btree ("background_video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_carousel_slides_locales_locale_parent_i" ON "_pages_v_blocks_text_carousel_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_carousel_order_idx" ON "_pages_v_blocks_text_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_carousel_parent_id_idx" ON "_pages_v_blocks_text_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_carousel_path_idx" ON "_pages_v_blocks_text_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_carousel_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_text_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_carousel_order_idx" ON "_pages_v_blocks_video_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_carousel_parent_id_idx" ON "_pages_v_blocks_video_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_carousel_path_idx" ON "_pages_v_blocks_video_carousel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_carousel_locales_locale_parent_id_uniq" ON "_pages_v_blocks_video_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_videos_id_idx" ON "_pages_v_rels" USING btree ("videos_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_links_id_idx" ON "payload_locked_documents_rels" USING btree ("links_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("templates_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_logo_idx" ON "site" USING btree ("logo_id");
  CREATE INDEX "site_favicon_idx" ON "site" USING btree ("favicon_id");
  CREATE INDEX "site_meta_meta_image_idx" ON "site_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_idx" ON "header_nav_items" USING btree ("link_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_link_idx" ON "footer_nav_items" USING btree ("link_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "socials_links_order_idx" ON "socials_links" USING btree ("_order");
  CREATE INDEX "socials_links_parent_id_idx" ON "socials_links" USING btree ("_parent_id");
  CREATE INDEX "socials_links_icon_idx" ON "socials_links" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "links" CASCADE;
  DROP TABLE "links_locales" CASCADE;
  DROP TABLE "links_rels" CASCADE;
  DROP TABLE "articles_blocks_accordion_items" CASCADE;
  DROP TABLE "articles_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "articles_blocks_accordion" CASCADE;
  DROP TABLE "articles_blocks_accordion_locales" CASCADE;
  DROP TABLE "articles_blocks_alpha" CASCADE;
  DROP TABLE "articles_blocks_alpha_locales" CASCADE;
  DROP TABLE "articles_blocks_alpha_iframe" CASCADE;
  DROP TABLE "articles_blocks_animated_quote" CASCADE;
  DROP TABLE "articles_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "articles_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "articles_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "articles_blocks_card_carousel" CASCADE;
  DROP TABLE "articles_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "articles_blocks_cta" CASCADE;
  DROP TABLE "articles_blocks_cta_locales" CASCADE;
  DROP TABLE "articles_blocks_featured_image" CASCADE;
  DROP TABLE "articles_blocks_featured_image_locales" CASCADE;
  DROP TABLE "articles_blocks_feedback" CASCADE;
  DROP TABLE "articles_blocks_feedback_locales" CASCADE;
  DROP TABLE "articles_blocks_just_text" CASCADE;
  DROP TABLE "articles_blocks_just_text_locales" CASCADE;
  DROP TABLE "articles_blocks_just_title" CASCADE;
  DROP TABLE "articles_blocks_just_title_locales" CASCADE;
  DROP TABLE "articles_blocks_paragraph_text" CASCADE;
  DROP TABLE "articles_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "articles_blocks_pause_experience" CASCADE;
  DROP TABLE "articles_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "articles_blocks_social_share" CASCADE;
  DROP TABLE "articles_blocks_social_share_locales" CASCADE;
  DROP TABLE "articles_blocks_take_over" CASCADE;
  DROP TABLE "articles_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "articles_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "articles_blocks_text_carousel" CASCADE;
  DROP TABLE "articles_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_articles_v_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_accordion" CASCADE;
  DROP TABLE "_articles_v_blocks_accordion_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_alpha" CASCADE;
  DROP TABLE "_articles_v_blocks_alpha_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_alpha_iframe" CASCADE;
  DROP TABLE "_articles_v_blocks_animated_quote" CASCADE;
  DROP TABLE "_articles_v_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "_articles_v_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_card_carousel" CASCADE;
  DROP TABLE "_articles_v_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_cta" CASCADE;
  DROP TABLE "_articles_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_featured_image" CASCADE;
  DROP TABLE "_articles_v_blocks_featured_image_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_feedback" CASCADE;
  DROP TABLE "_articles_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_just_text" CASCADE;
  DROP TABLE "_articles_v_blocks_just_text_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_just_title" CASCADE;
  DROP TABLE "_articles_v_blocks_just_title_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_paragraph_text" CASCADE;
  DROP TABLE "_articles_v_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_articles_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_social_share" CASCADE;
  DROP TABLE "_articles_v_blocks_social_share_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_take_over" CASCADE;
  DROP TABLE "_articles_v_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "_articles_v_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "_articles_v_blocks_text_carousel" CASCADE;
  DROP TABLE "_articles_v_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_locales" CASCADE;
  DROP TABLE "videos_blocks_accordion_items" CASCADE;
  DROP TABLE "videos_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "videos_blocks_accordion" CASCADE;
  DROP TABLE "videos_blocks_accordion_locales" CASCADE;
  DROP TABLE "videos_blocks_alpha" CASCADE;
  DROP TABLE "videos_blocks_alpha_locales" CASCADE;
  DROP TABLE "videos_blocks_alpha_iframe" CASCADE;
  DROP TABLE "videos_blocks_animated_quote" CASCADE;
  DROP TABLE "videos_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "videos_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "videos_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "videos_blocks_card_carousel" CASCADE;
  DROP TABLE "videos_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "videos_blocks_cta" CASCADE;
  DROP TABLE "videos_blocks_cta_locales" CASCADE;
  DROP TABLE "videos_blocks_featured_image" CASCADE;
  DROP TABLE "videos_blocks_featured_image_locales" CASCADE;
  DROP TABLE "videos_blocks_feedback" CASCADE;
  DROP TABLE "videos_blocks_feedback_locales" CASCADE;
  DROP TABLE "videos_blocks_just_text" CASCADE;
  DROP TABLE "videos_blocks_just_text_locales" CASCADE;
  DROP TABLE "videos_blocks_just_title" CASCADE;
  DROP TABLE "videos_blocks_just_title_locales" CASCADE;
  DROP TABLE "videos_blocks_paragraph_text" CASCADE;
  DROP TABLE "videos_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "videos_blocks_pause_experience" CASCADE;
  DROP TABLE "videos_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "videos_blocks_social_share" CASCADE;
  DROP TABLE "videos_blocks_social_share_locales" CASCADE;
  DROP TABLE "videos_blocks_take_over" CASCADE;
  DROP TABLE "videos_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "videos_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "videos_blocks_text_carousel" CASCADE;
  DROP TABLE "videos_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "videos_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_videos_v_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_accordion" CASCADE;
  DROP TABLE "_videos_v_blocks_accordion_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_alpha" CASCADE;
  DROP TABLE "_videos_v_blocks_alpha_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_alpha_iframe" CASCADE;
  DROP TABLE "_videos_v_blocks_animated_quote" CASCADE;
  DROP TABLE "_videos_v_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "_videos_v_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_card_carousel" CASCADE;
  DROP TABLE "_videos_v_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_cta" CASCADE;
  DROP TABLE "_videos_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_featured_image" CASCADE;
  DROP TABLE "_videos_v_blocks_featured_image_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_feedback" CASCADE;
  DROP TABLE "_videos_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_just_text" CASCADE;
  DROP TABLE "_videos_v_blocks_just_text_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_just_title" CASCADE;
  DROP TABLE "_videos_v_blocks_just_title_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_paragraph_text" CASCADE;
  DROP TABLE "_videos_v_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_videos_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_social_share" CASCADE;
  DROP TABLE "_videos_v_blocks_social_share_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_take_over" CASCADE;
  DROP TABLE "_videos_v_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "_videos_v_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "_videos_v_blocks_text_carousel" CASCADE;
  DROP TABLE "_videos_v_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "_videos_v" CASCADE;
  DROP TABLE "_videos_v_locales" CASCADE;
  DROP TABLE "templates_blocks_accordion_items" CASCADE;
  DROP TABLE "templates_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "templates_blocks_accordion" CASCADE;
  DROP TABLE "templates_blocks_accordion_locales" CASCADE;
  DROP TABLE "templates_blocks_alpha" CASCADE;
  DROP TABLE "templates_blocks_alpha_locales" CASCADE;
  DROP TABLE "templates_blocks_alpha_iframe" CASCADE;
  DROP TABLE "templates_blocks_animated_quote" CASCADE;
  DROP TABLE "templates_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "templates_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "templates_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "templates_blocks_card_carousel" CASCADE;
  DROP TABLE "templates_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "templates_blocks_cta" CASCADE;
  DROP TABLE "templates_blocks_cta_locales" CASCADE;
  DROP TABLE "templates_blocks_featured_image" CASCADE;
  DROP TABLE "templates_blocks_featured_image_locales" CASCADE;
  DROP TABLE "templates_blocks_feedback" CASCADE;
  DROP TABLE "templates_blocks_feedback_locales" CASCADE;
  DROP TABLE "templates_blocks_just_text" CASCADE;
  DROP TABLE "templates_blocks_just_text_locales" CASCADE;
  DROP TABLE "templates_blocks_just_title" CASCADE;
  DROP TABLE "templates_blocks_just_title_locales" CASCADE;
  DROP TABLE "templates_blocks_paragraph_text" CASCADE;
  DROP TABLE "templates_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "templates_blocks_pause_experience" CASCADE;
  DROP TABLE "templates_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "templates_blocks_social_share" CASCADE;
  DROP TABLE "templates_blocks_social_share_locales" CASCADE;
  DROP TABLE "templates_blocks_take_over" CASCADE;
  DROP TABLE "templates_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "templates_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "templates_blocks_text_carousel" CASCADE;
  DROP TABLE "templates_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "templates" CASCADE;
  DROP TABLE "templates_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_templates_v_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_accordion" CASCADE;
  DROP TABLE "_templates_v_blocks_accordion_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_alpha" CASCADE;
  DROP TABLE "_templates_v_blocks_alpha_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_alpha_iframe" CASCADE;
  DROP TABLE "_templates_v_blocks_animated_quote" CASCADE;
  DROP TABLE "_templates_v_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "_templates_v_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_card_carousel" CASCADE;
  DROP TABLE "_templates_v_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_cta" CASCADE;
  DROP TABLE "_templates_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_featured_image" CASCADE;
  DROP TABLE "_templates_v_blocks_featured_image_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_just_text" CASCADE;
  DROP TABLE "_templates_v_blocks_just_text_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_just_title" CASCADE;
  DROP TABLE "_templates_v_blocks_just_title_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_paragraph_text" CASCADE;
  DROP TABLE "_templates_v_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_templates_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_social_share" CASCADE;
  DROP TABLE "_templates_v_blocks_social_share_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_take_over" CASCADE;
  DROP TABLE "_templates_v_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "_templates_v_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "_templates_v_blocks_text_carousel" CASCADE;
  DROP TABLE "_templates_v_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "_templates_v" CASCADE;
  DROP TABLE "_templates_v_locales" CASCADE;
  DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_accordion_locales" CASCADE;
  DROP TABLE "pages_blocks_alpha" CASCADE;
  DROP TABLE "pages_blocks_alpha_locales" CASCADE;
  DROP TABLE "pages_blocks_alpha_iframe" CASCADE;
  DROP TABLE "pages_blocks_animated_quote" CASCADE;
  DROP TABLE "pages_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "pages_blocks_article_carousel" CASCADE;
  DROP TABLE "pages_blocks_article_carousel_locales" CASCADE;
  DROP TABLE "pages_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "pages_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_card_carousel" CASCADE;
  DROP TABLE "pages_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_featured_article" CASCADE;
  DROP TABLE "pages_blocks_featured_image" CASCADE;
  DROP TABLE "pages_blocks_featured_image_locales" CASCADE;
  DROP TABLE "pages_blocks_featured_video" CASCADE;
  DROP TABLE "pages_blocks_featured_video_locales" CASCADE;
  DROP TABLE "pages_blocks_feedback" CASCADE;
  DROP TABLE "pages_blocks_feedback_locales" CASCADE;
  DROP TABLE "pages_blocks_just_text" CASCADE;
  DROP TABLE "pages_blocks_just_text_locales" CASCADE;
  DROP TABLE "pages_blocks_just_title" CASCADE;
  DROP TABLE "pages_blocks_just_title_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "pages_blocks_pause_experience" CASCADE;
  DROP TABLE "pages_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "pages_blocks_paragraph_text" CASCADE;
  DROP TABLE "pages_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "pages_blocks_social_share" CASCADE;
  DROP TABLE "pages_blocks_social_share_locales" CASCADE;
  DROP TABLE "pages_blocks_take_over" CASCADE;
  DROP TABLE "pages_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "pages_blocks_text_carousel" CASCADE;
  DROP TABLE "pages_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "pages_blocks_video_carousel" CASCADE;
  DROP TABLE "pages_blocks_video_carousel_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_alpha" CASCADE;
  DROP TABLE "_pages_v_blocks_alpha_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_alpha_iframe" CASCADE;
  DROP TABLE "_pages_v_blocks_animated_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_animated_quote_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_article_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_article_carousel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_card_carousel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_article" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_image" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_image_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_video" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_video_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_just_text" CASCADE;
  DROP TABLE "_pages_v_blocks_just_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_just_title" CASCADE;
  DROP TABLE "_pages_v_blocks_just_title_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_intro_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_intro_lines_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_scenes" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_scenes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience" CASCADE;
  DROP TABLE "_pages_v_blocks_pause_experience_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_paragraph_text" CASCADE;
  DROP TABLE "_pages_v_blocks_paragraph_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_social_share" CASCADE;
  DROP TABLE "_pages_v_blocks_social_share_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_take_over" CASCADE;
  DROP TABLE "_pages_v_blocks_text_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_text_carousel_slides_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_text_carousel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_video_carousel_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "socials_links" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_links_type";
  DROP TYPE "public"."enum_links_static_page";
  DROP TYPE "public"."enum_articles_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum_articles_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum_articles_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_articles_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_cta_show_title";
  DROP TYPE "public"."enum_articles_blocks_cta_background_type";
  DROP TYPE "public"."enum_articles_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_featured_image_caption";
  DROP TYPE "public"."enum_articles_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_just_text_background_type";
  DROP TYPE "public"."enum_articles_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum_articles_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum_articles_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum_articles_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_just_text_text_animation";
  DROP TYPE "public"."enum_articles_blocks_just_title_heading_level";
  DROP TYPE "public"."enum_articles_blocks_just_title_font_family";
  DROP TYPE "public"."enum_articles_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum_articles_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum_articles_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_social_share_show_title";
  DROP TYPE "public"."enum_articles_blocks_take_over_media";
  DROP TYPE "public"."enum_articles_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum_articles_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum_articles_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_articles_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_articles_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum__articles_v_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__articles_v_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_cta_show_title";
  DROP TYPE "public"."enum__articles_v_blocks_cta_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_featured_image_caption";
  DROP TYPE "public"."enum__articles_v_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_just_text_text_animation";
  DROP TYPE "public"."enum__articles_v_blocks_just_title_heading_level";
  DROP TYPE "public"."enum__articles_v_blocks_just_title_font_family";
  DROP TYPE "public"."enum__articles_v_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum__articles_v_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum__articles_v_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_social_share_show_title";
  DROP TYPE "public"."enum__articles_v_blocks_take_over_media";
  DROP TYPE "public"."enum__articles_v_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum__articles_v_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum__articles_v_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__articles_v_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum__articles_v_published_locale";
  DROP TYPE "public"."enum_videos_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum_videos_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum_videos_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_videos_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_cta_show_title";
  DROP TYPE "public"."enum_videos_blocks_cta_background_type";
  DROP TYPE "public"."enum_videos_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_featured_image_caption";
  DROP TYPE "public"."enum_videos_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_just_text_background_type";
  DROP TYPE "public"."enum_videos_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum_videos_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum_videos_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum_videos_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_just_text_text_animation";
  DROP TYPE "public"."enum_videos_blocks_just_title_heading_level";
  DROP TYPE "public"."enum_videos_blocks_just_title_font_family";
  DROP TYPE "public"."enum_videos_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum_videos_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum_videos_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_social_share_show_title";
  DROP TYPE "public"."enum_videos_blocks_take_over_media";
  DROP TYPE "public"."enum_videos_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum_videos_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum_videos_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_videos_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_videos_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_videos_platform";
  DROP TYPE "public"."enum_videos_orientation";
  DROP TYPE "public"."enum_videos_thumbnail_type";
  DROP TYPE "public"."enum_videos_status";
  DROP TYPE "public"."enum__videos_v_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum__videos_v_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__videos_v_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_cta_show_title";
  DROP TYPE "public"."enum__videos_v_blocks_cta_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_featured_image_caption";
  DROP TYPE "public"."enum__videos_v_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_just_text_text_animation";
  DROP TYPE "public"."enum__videos_v_blocks_just_title_heading_level";
  DROP TYPE "public"."enum__videos_v_blocks_just_title_font_family";
  DROP TYPE "public"."enum__videos_v_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum__videos_v_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum__videos_v_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_social_share_show_title";
  DROP TYPE "public"."enum__videos_v_blocks_take_over_media";
  DROP TYPE "public"."enum__videos_v_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum__videos_v_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum__videos_v_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__videos_v_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__videos_v_version_platform";
  DROP TYPE "public"."enum__videos_v_version_orientation";
  DROP TYPE "public"."enum__videos_v_version_thumbnail_type";
  DROP TYPE "public"."enum__videos_v_version_status";
  DROP TYPE "public"."enum__videos_v_published_locale";
  DROP TYPE "public"."enum_templates_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum_templates_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum_templates_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_templates_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_cta_show_title";
  DROP TYPE "public"."enum_templates_blocks_cta_background_type";
  DROP TYPE "public"."enum_templates_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_featured_image_caption";
  DROP TYPE "public"."enum_templates_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_just_text_background_type";
  DROP TYPE "public"."enum_templates_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum_templates_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum_templates_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum_templates_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_just_text_text_animation";
  DROP TYPE "public"."enum_templates_blocks_just_title_heading_level";
  DROP TYPE "public"."enum_templates_blocks_just_title_font_family";
  DROP TYPE "public"."enum_templates_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum_templates_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum_templates_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_social_share_show_title";
  DROP TYPE "public"."enum_templates_blocks_take_over_media";
  DROP TYPE "public"."enum_templates_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum_templates_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum_templates_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_templates_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_templates_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_templates_content_type";
  DROP TYPE "public"."enum_templates_status";
  DROP TYPE "public"."enum__templates_v_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum__templates_v_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__templates_v_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_cta_show_title";
  DROP TYPE "public"."enum__templates_v_blocks_cta_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_featured_image_caption";
  DROP TYPE "public"."enum__templates_v_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_just_text_text_animation";
  DROP TYPE "public"."enum__templates_v_blocks_just_title_heading_level";
  DROP TYPE "public"."enum__templates_v_blocks_just_title_font_family";
  DROP TYPE "public"."enum__templates_v_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum__templates_v_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum__templates_v_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_social_share_show_title";
  DROP TYPE "public"."enum__templates_v_blocks_take_over_media";
  DROP TYPE "public"."enum__templates_v_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum__templates_v_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum__templates_v_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__templates_v_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__templates_v_version_content_type";
  DROP TYPE "public"."enum__templates_v_version_status";
  DROP TYPE "public"."enum__templates_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum_pages_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_cta_show_title";
  DROP TYPE "public"."enum_pages_blocks_cta_background_type";
  DROP TYPE "public"."enum_pages_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_featured_image_caption";
  DROP TYPE "public"."enum_pages_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_featured_video_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_featured_video_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_just_text_background_type";
  DROP TYPE "public"."enum_pages_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum_pages_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum_pages_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_just_text_text_animation";
  DROP TYPE "public"."enum_pages_blocks_just_title_heading_level";
  DROP TYPE "public"."enum_pages_blocks_just_title_font_family";
  DROP TYPE "public"."enum_pages_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum_pages_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_social_share_show_title";
  DROP TYPE "public"."enum_pages_blocks_take_over_media";
  DROP TYPE "public"."enum_pages_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum_pages_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum_pages_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum_pages_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_animated_quote_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_animated_quote_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_animated_quote_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_cards_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_card_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_cta_show_title";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_cta_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_featured_image_caption";
  DROP TYPE "public"."enum__pages_v_blocks_featured_image_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_featured_image_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_featured_video_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_featured_video_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_vertical_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_multi_lines_of_text";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_just_text_text_animation";
  DROP TYPE "public"."enum__pages_v_blocks_just_title_heading_level";
  DROP TYPE "public"."enum__pages_v_blocks_just_title_font_family";
  DROP TYPE "public"."enum__pages_v_blocks_just_title_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_show_sub_text";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_pause_experience_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_paragraph_text_text_size";
  DROP TYPE "public"."enum__pages_v_blocks_paragraph_text_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_social_share_show_title";
  DROP TYPE "public"."enum__pages_v_blocks_take_over_media";
  DROP TYPE "public"."enum__pages_v_blocks_text_carousel_slides_show_title";
  DROP TYPE "public"."enum__pages_v_blocks_text_carousel_slides_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_text_carousel_horizontal_scroll_path";
  DROP TYPE "public"."enum__pages_v_blocks_text_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_text_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_carousel_desktop_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_carousel_mobile_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_socials_links_platform";`)
}
