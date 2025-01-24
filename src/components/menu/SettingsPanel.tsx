import React from 'react';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { Type, Languages } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Locales } from '../../i18n/i18n-util';

interface SettingsPanelProps {
  onClose: () => void;
}

const LANGUAGE_NAMES: Record<Locales, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  zh: '简体中文',
  ko: '한국어',
  ja: '日本語'
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { textSize, updateSettings } = useSettingsStore();
  const { t, language, changeLanguage, availableLanguages } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-lg p-6 w-96">
      <h2 className="text-2xl font-bold text-white mb-6">{t.menu.settings}</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-300">
            {t.common.language}
          </label>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value as Locales)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_NAMES[lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-base font-medium text-gray-300">{t.settings.text_size}</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateSettings({ textSize: 'normal' })}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                ${textSize === 'normal'
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-700 hover:bg-amber-500 text-gray-300 hover:text-white'
                }
              `}
            >
              <Type className="w-4 h-4" />
              {t.settings.text_size_normal}
            </button>
            <button
              onClick={() => updateSettings({ textSize: 'large' })}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                ${textSize === 'large'
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-700 hover:bg-amber-500 text-gray-300 hover:text-white'
                }
              `}
            >
              <Type className="w-5 h-5" />
              {t.settings.text_size_large}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-amber-500 text-white"
        >
          {t.common.close}
        </button>
      </div>
    </div>
  );
};