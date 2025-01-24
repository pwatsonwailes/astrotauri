import type { Translation } from './i18n-types'
import { loadedFormatters, loadedLocales, locales } from './i18n-util.sync'

export { loadedFormatters, loadedLocales, locales }
export type { Translation }
export type Locales = typeof locales[number]

export const defaultLocale = 'en' as const

export function isLocale(locale: string): locale is Locales {
  return locales.includes(locale as Locales)
}