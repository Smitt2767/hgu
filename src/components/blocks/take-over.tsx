'use client'

import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import { GetBlockProps } from '@/types/blocks'
import { Volume2Icon, VolumeXIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function TakeOver({ media, replayWithAudio, ...rest }: GetBlockProps<'takeOver'>) {
  const image = rest.image as Media | null
  const video = rest.video as Media | null
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }, [])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const handleVolumeChange = () => {
      if (replayWithAudio && !videoEl.muted) {
        videoEl.currentTime = 0
      }
      setMuted(videoEl.muted)
    }

    videoEl.addEventListener('volumechange', handleVolumeChange)
    return () => videoEl.removeEventListener('volumechange', handleVolumeChange)
  }, [replayWithAudio])

  return (
    <div className="w-full py-12">
      <div className={cn('max-w-3xl mx-auto relative aspect-9/16 md:aspect-video')}>
        {media === 'image' && image && (
          <Image
            fill
            priority
            sizes="100vw"
            alt={image.alt}
            src={image.url!}
            className="object-cover object-center -z-10"
          />
        )}
        {media === 'video' && video && (
          <>
            <video
              ref={videoRef}
              loop
              autoPlay
              playsInline
              muted
              preload="auto"
              src={video.url!}
              className="absolute inset-0 h-full w-full object-cover object-center -z-10"
            />
            <button
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full transition-all bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20"
              onClick={toggleMute}
            >
              {muted ? <Volume2Icon /> : <VolumeXIcon />}
              {muted ? <span>Enable Audio</span> : <span>Audio On</span>}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
