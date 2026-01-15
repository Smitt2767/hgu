import { HTML as HTMLProps } from '@/payload-types'

export default function HTML(props: HTMLProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-b">
      <span>HTML</span>
      <code>{JSON.stringify(props)}</code>
    </div>
  )
}
