import type { Locales } from '../i18n/i18n-util'

export interface GameSettings {
  textSize: 'normal' | 'large';
  language: Locales;
}

export const DEFAULT_SETTINGS: GameSettings = {
  textSize: 'normal',
  language: 'en'
}