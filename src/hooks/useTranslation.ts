import { useCallback, useEffect } from 'react'
import { useSettingsStore } from '../stores/useSettingsStore'
import { loadedLocales, locales, type Locales } from '../i18n/i18n-util'

const i18n = {
  locale: 'en' as Locales,
  t: loadedLocales.en,
  setLocale(newLocale: Locales) {
    if (loadedLocales[newLocale]) {
      this.locale = newLocale
      this.t = loadedLocales[newLocale]
    }
  }
}

export const useTranslation = () => {
  const { language, updateSettings } = useSettingsStore()

  // Initialize language from settings or detect from browser on mount
  useEffect(() => {
    const initLanguage = async () => {
      if (!language) {
        i18n.setLocale("en")
      } else if (i18n.locale !== language) {
        i18n.setLocale(language)
      }
    }
    
    initLanguage()
  }, [language, updateSettings])

  const changeLanguage = useCallback(async (newLanguage: Locales) => {
    i18n.setLocale(newLanguage)
    await updateSettings({ language: newLanguage })
  }, [updateSettings])

  return {
    t: i18n.t,
    language: i18n.locale,
    changeLanguage,
    availableLanguages: locales
  }
}