import { GetBlockProps } from '@/types/blocks'

export default function AlphaIFrame({ iframeURL }: GetBlockProps<'alphaIframe'>) {
  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white">
          <iframe
            src={iframeURL}
            title="Alpha Content"
            className="w-full h-[500px] md:h-[600px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; geolocation; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
