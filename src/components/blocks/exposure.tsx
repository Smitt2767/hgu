'use client'

import { beacon } from '@/flags/beacon'
import { useEffect, useRef } from 'react'

const ENDPOINT = '/api/flags/exposure'

type ExposureBeaconProps = {
  /** The signed segment this page was rendered under. */
  code: string
  /** Flag keys whose module was present in the layout. */
  keys: string[]
  locale: string
}

/**
 * Reports the experiment variants this page view actually showed.
 *
 * A Client Component because it is the only thing on a precomputed page that runs once
 * per visitor. The HTML is a prebuilt file, so every Server Component in it ran at
 * build time — an exposure there would be counted once per prebuilt page and never
 * again, while conversions kept arriving from real people.
 *
 * Renders nothing, and deliberately sits outside every block so a variant that hides
 * its module still reports. Those visitors were assigned too; for them the absence *is*
 * the treatment, and dropping that arm would skew the comparison far more than keeping
 * it.
 *
 * Client-side tracking does lose the ad-blocked and the JS-disabled. That costs
 * statistical power rather than accuracy: which arm a visitor landed in has no bearing
 * on whether their browser blocks beacons, so the sample shrinks without tilting. The
 * alternative — counting at build time — is not a smaller sample but a wrong one.
 */
export default function ExposureBeacon({ code, keys, locale }: ExposureBeaconProps) {
  const sent = useRef(false)
  // Joined so the effect's dependency is a value rather than a fresh array identity on
  // every render.
  const list = keys.join(',')

  useEffect(() => {
    // React remounts effects in development, and a page view is one exposure.
    if (sent.current) return
    sent.current = true

    beacon(ENDPOINT, { code, keys: list.split(','), locale })
  }, [code, list, locale])

  return null
}
