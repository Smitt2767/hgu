export const DEFAULT_SLUG = 'default'

export const mobileAndDesktopRatioStyleVariants = {
  desktopAspectRatio: {
    '16:9': 'md:aspect-video',
    '4:3': 'md:aspect-4/3',
  },
  mobileAspectRatio: {
    '9:16': 'aspect-9/16',
    '4:5': 'aspect-4/5',
  },
} as const
