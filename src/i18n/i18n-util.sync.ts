import { initFormatters } from './formatters'
import { en } from './en'
import { fr } from './fr'
import { es } from './es'
import { zh } from './zh'
import { ko } from './ko'
import { ja } from './ja'

export const locales = ['en', 'fr', 'es', 'zh', 'ko', 'ja'] as const

export const loadedLocales = {
  en,
  fr,
  es,
  zh,
  ko,
  ja
}

export const loadedFormatters = initFormatters()