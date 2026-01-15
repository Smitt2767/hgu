'use client'

import { Social } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Social['links']>[number]>()

  const label = data?.data?.platform ? data?.data?.platform : `Link: ${data.rowNumber}`

  return <div>{label}</div>
}
