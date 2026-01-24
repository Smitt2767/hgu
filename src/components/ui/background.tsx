import { Media } from '@/payload-types'
import Image from 'next/image'

type BackgroundProps = {
  color?: string | null
  image?: number | Media | null
  video?: number | Media | null
  type?: 'none' | 'image' | 'color' | 'video' | null
}

export default function Background({ color, image, video, type }: BackgroundProps) {
  if (!type || type === 'none') return null

  if (type === 'color' && color) {
    return <div className="absolute inset-0 -z-10" style={{ backgroundColor: color }} />
  }

  if (type === 'image' && image && typeof image === 'object' && image.url) {
    return (
      <>
        <Image
          fill
          priority
          sizes="100vw"
          src={image.url}
          alt={image.alt || ''}
          className="absolute inset-0 -z-10 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 -z-9" />
      </>
    )
  }

  if (type === 'video' && video && typeof video === 'object' && video.url) {
    return (
      <>
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          src={video.url}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 -z-9" />
      </>
    )
  }

  return null
}
