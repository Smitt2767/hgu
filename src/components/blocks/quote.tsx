import { Quote as QuoteProps } from '@/payload-types'

export default function Quote(props: QuoteProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-b">
      <span>Quote</span>
      <code>{JSON.stringify(props)}</code>
    </div>
  )
}
