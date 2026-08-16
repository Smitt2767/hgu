'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = {
  whenValue?: string | null
  render?: boolean | null
  orphaned?: boolean | null
}

/**
 * Labels a flag row with what it actually does, so the collapsed list reads as the
 * rule it encodes — "false → hidden", "urgency → shown" — rather than "Value 1,
 * Value 2". With every row collapsed by default, this label is the whole summary an
 * editor gets of how the module behaves.
 */
export const FlagRowLabel = () => {
  const { data, rowNumber } = useRowLabel<Row>()

  if (!data?.whenValue) return <div>{`Value ${(rowNumber ?? 0) + 1}`}</div>

  const outcome = data.render === false ? 'hidden' : 'shown'
  const orphaned = data.orphaned ? ' · no longer served' : ''

  return <div>{`${readable(data.whenValue)} → ${outcome}${orphaned}`}</div>
}

/**
 * `whenValue` is stored as JSON so the string "true" and the boolean true stay
 * distinguishable. Strings are unwrapped for display; everything else reads fine as
 * its JSON form.
 */
function readable(whenValue: string): string {
  try {
    const value = JSON.parse(whenValue)
    return typeof value === 'string' ? value : whenValue
  } catch {
    return whenValue
  }
}
