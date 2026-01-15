import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

export const revalidateSite: GlobalAfterChangeHook = ({ doc, context }) => {
  if (!context.disableRevalidate) {
    revalidateTag('site', 'max')
  }
  return doc
}
