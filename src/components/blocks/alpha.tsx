'use client'

import { GetBlockProps } from '@/types/blocks'
import Image from 'next/image'
import { useState } from 'react'
import { TextLinkButton } from '../ui/text-link-button'

export default function Alpha({
  title,
  buttonText,
  iframeHeader,
  iframeURL,
  showPoweredBy,
}: GetBlockProps<'alpha'>) {
  const [showIframe, setShowIframe] = useState(false)

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {title && (
          <h3 className="text-lg md:text-xl font-bold text-white text-center mb-6 max-w-md mx-auto leading-relaxed">
            {title}
          </h3>
        )}

        <div className="flex justify-center mb-4">
          <TextLinkButton onClick={() => setShowIframe(!showIframe)}>{buttonText}</TextLinkButton>
        </div>

        {showPoweredBy && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full">
              <Image
                priority
                alt="Alpha"
                src="/images/alpha-logo.png"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-[10px] font-heading font-medium text-black uppercase tracking-wider">
                powered by alpha
              </span>
            </div>
          </div>
        )}

        {showIframe && (
          <div className="mt-8 animate-in slide-in-from-top-4 duration-300">
            {iframeHeader && (
              <p className="text-base md:text-lg text-white/80 text-center mb-4 max-w-lg mx-auto leading-relaxed">
                {iframeHeader}
              </p>
            )}
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
        )}
      </div>
    </div>
  )
}
