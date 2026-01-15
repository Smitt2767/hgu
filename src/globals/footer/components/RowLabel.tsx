'use client'

import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['navItems']>[number]>()

  const label = data?.data?.label ? data?.data?.label : `Nav Item: ${data.rowNumber}`

  return <div>{label}</div>
}
