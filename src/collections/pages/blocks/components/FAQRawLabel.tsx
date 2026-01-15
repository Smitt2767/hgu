'use client'

import { FAQ } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<FAQ['data']>[number]>()

  const label = data?.data?.question ? data?.data?.question : `Question: ${data.rowNumber}`

  return <div>{label}</div>
}
