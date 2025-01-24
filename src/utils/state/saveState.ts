import { useGameStore } from '../../stores/useGameStore';
import { useStoryStore } from '../../stores/useStoryStore';
import { useEventStore } from '../../stores/useEventStore';
import { useMarketStore } from '../../stores/useMarketStore';
import { useNarrativeStore } from '../../stores/useNarrativeStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { StorageService } from '../../services/storage';

// Helper to remove non-serializable data
const sanitizeState = (state: any): any => {
  // If null/undefined, return as is
  if (state == null) return state;

  // Handle arrays
  if (Array.isArray(state)) {
    return state.map(item => sanitizeState(item));
  }

  // Handle objects
  if (typeof state === 'object') {
    const cleanState: any = {};
    for (const [key, value] of Object.entries(state)) {
      // Skip functions and symbols
      if (typeof value === 'function' || typeof value === 'symbol') continue;
      // Skip keys starting with underscore (often used for internal state)
      if (key.startsWith('_')) continue;
      // Recursively sanitize nested objects
      cleanState[key] = sanitizeState(value);
    }
    return cleanState;
  }

  // Return primitive values as is
  return state;
};

export const saveAllState = async () => {
  try {
    // Get current state from all stores
    const gameState = sanitizeState(useGameStore.getState());
    const storyState = sanitizeState(useStoryStore.getState());
    const eventState = sanitizeState(useEventStore.getState());
    const marketState = sanitizeState(useMarketStore.getState());
    const narrativeState = sanitizeState(useNarrativeStore.getState());
    const settingsState = sanitizeState(useSettingsStore.getState());

    // Save all states
    await Promise.all([
      StorageService.saveGameState(gameState),
      StorageService.saveStoryState(storyState),
      StorageService.saveEventState(eventState),
      StorageService.saveMarketState(marketState),
      StorageService.saveNarrativeState(narrativeState),
      StorageService.saveSettings(settingsState)
    ]);
  } catch (error) {
    console.error('Failed to save state:', error);
  }
};