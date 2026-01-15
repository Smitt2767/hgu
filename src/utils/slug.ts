export const SLUG_TO_PATH_MAP: Record<string, string> = {
  home: '',
}

export const getSiteSlug = (slug: string): string => {
  return SLUG_TO_PATH_MAP[slug] ?? slug
}

export const getDBSlug = (slug: string): string => {
  return Object.entries(SLUG_TO_PATH_MAP).find(([_, value]) => value === slug)?.[0] ?? slug
}
