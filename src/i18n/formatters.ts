import type { FormattersInitializer } from 'typesafe-i18n'
import type { Formatters, Locales } from './i18n-types'

export const initFormatters: FormattersInitializer<Locales, Formatters> = () => {
  const formatters: Formatters = {
    // Add any custom formatters here
  }

  return formatters
}