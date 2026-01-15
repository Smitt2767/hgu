import { routing } from '@/i18n/routing'
import z from 'zod'

export const getTypedLocale = (locale: string) => {
  return z.enum(routing.locales).safeParse(locale).data
}
