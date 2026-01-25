'use client'

import { Video } from '@/payload-types'
import { cva } from 'class-variance-authority'

const containerStyles = cva(
  'block group relative w-full [&_img]:object-cover [&_img]:object-center',
  {
    variants: {
      orientation: {
        horizontal: 'aspect-video',
        vertical: 'aspect-9/16 max-w-md mx-auto',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

type VideoDetailsProps = {
  video: Video
}

export default function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto"></div>
    </section>
  )
}
