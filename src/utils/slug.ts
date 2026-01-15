export const SLUG_TO_PATH_MAP = {
  home: '/',
}

export const slugToPath = (slug: string): string => {
  if (slug in SLUG_TO_PATH_MAP) {
    return SLUG_TO_PATH_MAP[slug as keyof typeof SLUG_TO_PATH_MAP]
  }
  return `/${slug}`
}
