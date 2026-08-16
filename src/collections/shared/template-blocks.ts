import { Block } from 'payload'
import { Accordion } from '../blocks/Accordion'
import { Alpha } from '../blocks/Alpha'
import { AlphaIframe } from '../blocks/AlphaIframe'
import { AnimatedQuote } from '../blocks/AnimatedQuote'
import { CardCarousel } from '../blocks/CardCarousel'
import { CTA } from '../blocks/CTA'
import { FeaturedImage } from '../blocks/FeaturedImage'
import { JustText } from '../blocks/JustText'
import { JustTitle } from '../blocks/JustTitle'
import { ParagraphText } from '../blocks/ParagraphText'
import { SocialShare } from '../blocks/SocialShare'
import { TakeOver } from '../blocks/TakeOver'
import { TextCarousel } from '../blocks/TextCarousel'

/**
 * Blocks available for content templates (Videos, Articles, etc.)
 *
 * Excludes content-specific blocks that reference other collections:
 * - FeaturedVideo, FeaturedArticle (would cause recursion)
 * - VideoCarousel, ArticleCarousel (same reason)
 *
 * Every block here must have a renderer in `src/components/blocks/index.tsx`.
 * That map is `Partial`, so a block with no entry type-checks, saves, and then
 * renders nothing — the editor sees the module in the admin and an empty space
 * on the page, with no error anywhere to explain it.
 */
export const templateBlocks: Block[] = [
  Accordion,
  Alpha,
  AlphaIframe,
  AnimatedQuote,
  CardCarousel,
  CTA,
  FeaturedImage,
  JustText,
  JustTitle,
  ParagraphText,
  SocialShare,
  TakeOver,
  TextCarousel,
]
