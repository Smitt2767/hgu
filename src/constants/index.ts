export const DEFAULT_SLUG = 'default'

export const mobileAndDesktopRatioStyleVariants = {
  desktopAspectRatio: {
    '9:16': 'md:aspect-9/16',
    '16:9': 'md:aspect-video',
    '4:3': 'md:aspect-4/3',
    '4:5': 'md:aspect-4/5',
  },
  mobileAspectRatio: {
    '9:16': 'aspect-9/16',
    '16:9': 'aspect-video',
    '4:5': 'aspect-4/5',
    '4:3': 'aspect-4/3',
  },
} as const
