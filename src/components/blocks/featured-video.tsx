'use client'

import { GetBlockProps } from '@/types/blocks'
import { useState } from 'react'
import VideoCard from '../video/card'

export default function FeaturedVideo({ caption, video, ...rest }: GetBlockProps<'featuredVideo'>) {
  const [showVideo, setShowVideo] = useState(false)

  if (!video || typeof video !== 'object') return null

  const handleShowVideo = () => {
    setShowVideo(true)
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-foreground text-xl font-semibold text-center">{video.title}</h3>
          <VideoCard {...rest} showVideo={showVideo} video={video} onClick={handleShowVideo} />
          {caption && <p className="text-center text-gray-400 text-sm">{caption}</p>}
        </div>
      </div>
    </div>
  )
}
