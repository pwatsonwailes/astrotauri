import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameSettings, DEFAULT_SETTINGS } from '../types/settings';
import { StorageService } from '../services/storage';

interface SettingsStore extends GameSettings {
  updateSettings: (newSettings: Partial<GameSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: async (newSettings) => {
        const updatedSettings = { 
          ...DEFAULT_SETTINGS, 
          ...newSettings 
        };
        
        // Save to storage
        await StorageService.saveSettings(updatedSettings);
        
        // Update state
        set(updatedSettings);
      }
    }),
    {
      name: 'settings-storage',
      getStorage: () => ({
        getItem: async (name) => {
          const data = await StorageService.loadSettings();
          return data ? JSON.stringify(data) : null;
        },
        setItem: async (name, value) => {
          const data = JSON.parse(value);
          await StorageService.saveSettings(data);
        },
        removeItem: async (name) => {
          await StorageService.saveSettings(null);
        }
      })
    }
  )
);