import { FAQ as FAQProps } from '@/payload-types'

export default function FAQ(props: FAQProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-b">
      <span>FAQ</span>
      <code>{JSON.stringify(props)}</code>
    </div>
  )
}
