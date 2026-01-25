import { Block } from 'payload'
import { Accordion } from '../blocks/Accordion'
import { Alpha } from '../blocks/Alpha'
import { AlphaIframe } from '../blocks/AlphaIframe'
import { AnimatedQuote } from '../blocks/AnimatedQuote'
import { CardCarousel } from '../blocks/CardCarousel'
import { CTA } from '../blocks/CTA'
import { FeaturedImage } from '../blocks/FeaturedImage'
import { Feedback } from '../blocks/Feedback'
import { JustText } from '../blocks/JustText'
import { JustTitle } from '../blocks/JustTitle'
import { ParagraphText } from '../blocks/ParagraphText'
import { PauseExperience } from '../blocks/PauseExperience'
import { SocialShare } from '../blocks/SocialShare'
import { TakeOver } from '../blocks/TakeOver'
import { TextCarousel } from '../blocks/TextCarousel'

/**
 * Blocks available for content templates (Videos, Articles, etc.)
 *
 * Excludes content-specific blocks that reference other collections:
 * - FeaturedVideo, FeaturedArticle (would cause recursion)
 * - VideoCarousel, ArticleCarousel (same reason)
 */
export const templateBlocks: Block[] = [
  Accordion,
  Alpha,
  AlphaIframe,
  AnimatedQuote,
  CardCarousel,
  CTA,
  FeaturedImage,
  Feedback,
  JustText,
  JustTitle,
  ParagraphText,
  PauseExperience,
  SocialShare,
  TakeOver,
  TextCarousel,
]
