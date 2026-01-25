import type { Site } from '@/payload-types'
import type { TextFieldValidation } from 'payload'
import tinycolor from 'tinycolor2'

export const validateColor: TextFieldValidation = (value) => {
  if (!value) return true
  return (
    tinycolor(value).isValid() || 'Invalid color value. Use hex (e.g. #FEDA00) or named colors.'
  )
}

function linearize(value: number): number {
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
}

export function hexToOklch(hex: string): string {
  const color = tinycolor(hex)
  if (!color.isValid()) return hex

  const { r, g, b } = color.toRgb()

  const lr = linearize(r / 255)
  const lg = linearize(g / 255)
  const lb = linearize(b / 255)

  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bOk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const C = Math.sqrt(a * a + bOk * bOk)
  let H = (Math.atan2(bOk, a) * 180) / Math.PI
  if (H < 0) H += 360

  const lRound = Math.round(L * 1000) / 1000
  const cRound = Math.round(C * 1000) / 1000
  const hRound = Math.round(H * 1000) / 1000

  if (cRound === 0) {
    return `oklch(${lRound} 0 0)`
  }

  return `oklch(${lRound} ${cRound} ${hRound})`
}

export function getBrandingCssVars(site: Site | null): string {
  if (!site) return ''

  const mapping: Record<string, string> = {
    // Neutral BG
    '--background': site.neutrals.background,
    // Text White / Neutral White
    '--foreground': site.textColors.white,
    // Neutral Surface
    '--card': site.neutrals.surface,
    '--card-foreground': site.textColors.white,
    '--popover': site.neutrals.surface,
    '--popover-foreground': site.textColors.white,
    // Primary Gold / Text Gold
    '--primary': site.primaryColors.primaryGold,
    '--primary-foreground': site.neutrals.background,
    // Box BG Gray
    '--secondary': site.boxBackground.boxBgGray,
    '--secondary-foreground': site.textColors.white,
    '--muted': site.boxBackground.boxBgGray,
    '--muted-foreground': site.textColors.gray,
    '--accent': site.boxBackground.boxBgGray,
    '--accent-foreground': site.textColors.white,
    // Neutral Border
    '--border': site.neutrals.border,
    '--input': site.neutrals.border,
    '--ring': site.primaryColors.primaryGold,
    '--sidebar': site.neutrals.surface,
    '--sidebar-foreground': site.textColors.white,
    '--sidebar-primary': site.primaryColors.primaryGold,
    '--sidebar-primary-foreground': site.neutrals.background,
    '--sidebar-accent': site.boxBackground.boxBgGray,
    '--sidebar-accent-foreground': site.textColors.white,
    '--sidebar-border': site.neutrals.border,
    '--sidebar-ring': site.primaryColors.primaryGold,

    // Text Gray
    '--color-gray-400': site.textColors.gray,
    // Neutral Gray
    '--color-gray-100': site.neutrals.gray,
  }

  const vars = Object.entries(mapping)
    .map(([key, value]) => `${key}: ${hexToOklch(value)};`)
    .join(' ')

  return `.dark { ${vars} }`
}
