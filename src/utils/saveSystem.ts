import { Store } from '@tauri-apps/plugin-store';

// Create a store instance for Tauri
let store: Store | null = null;

// Initialize store if in Tauri environment
async function initStore() {
  if (store) return store;
  
  try {
    // Check if we're in a Tauri environment
    const isTauri = 'window' in globalThis && 
                   'tauri' in window && 
                   typeof window.tauri === 'object';
    
    if (isTauri) {
      store = new Store('.settings.dat');
      return store;
    } else {
      console.warn('Not in Tauri environment, using localStorage fallback');
    }
  } catch (error) {
    console.warn('Tauri store not available, using localStorage fallback', error);
  }
  
  return null;
}

// Browser localStorage fallback implementation
const localStorageFallback = {
  async save(key: string, data: any): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      throw error; // Re-throw to allow caller to handle
    }
  },
  
  async load(key: string): Promise<any> {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      throw error; // Re-throw to allow caller to handle
    }
  },
  
  async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to delete from localStorage:', error);
      throw error; // Re-throw to allow caller to handle
    }
  },
  
  async has(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }
};

/**
 * Saves the game state
 */
export async function saveGame(gameState: any): Promise<void> {
  try {
    // Try to use Tauri store first
    const tauriStore = await initStore();
    if (tauriStore) {
      await tauriStore.set('astromine_gameState', gameState);
      await tauriStore.save();
      console.log('Game saved successfully to Tauri store');
      return;
    }
    
    // Fallback to localStorage
    await localStorageFallback.save('astromine_gameState', gameState);
    console.log('Game saved successfully to localStorage');
  } catch (error) {
    console.error('Failed to save game:', error);
    // Don't throw the error to prevent app crashes
  }
}

/**
 * Loads the game state
 */
export async function loadGame(): Promise<any | null> {
  try {
    // Try to use Tauri store first
    const tauriStore = await initStore();
    if (tauriStore) {
      const gameState = await tauriStore.get('astromine_gameState');
      console.log('Game loaded successfully from Tauri store');
      
      if (!gameState) {
        console.log('No save data found in Tauri store');
        return null;
      }
      
      return gameState;
    }
    
    // Fallback to localStorage
    const gameState = await localStorageFallback.load('astromine_gameState');
    console.log('Game loaded successfully from localStorage');
    
    if (!gameState) {
      console.log('No save data found');
      return null;
    }
    
    return gameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

/**
 * Checks if a saved game exists
 */
export async function hasSavedGame(): Promise<boolean> {
  try {
    // Try to use Tauri store first
    const tauriStore = await initStore();
    if (tauriStore) {
      const exists = await tauriStore.has('astromine_gameState');
      return exists;
    }
    
    // Fallback to localStorage
    return await localStorageFallback.has('astromine_gameState');
  } catch (error) {
    console.error('Failed to check for saved game:', error);
    return false;
  }
}

/**
 * Deletes the saved game data
 */
export async function deleteSavedGame(): Promise<boolean> {
  try {
    // Try to use Tauri store first
    const tauriStore = await initStore();
    if (tauriStore) {
      await tauriStore.delete('astromine_gameState');
      await tauriStore.save();
      console.log('Save data deleted successfully from Tauri store');
      return true;
    }
    
    // Fallback to localStorage
    await localStorageFallback.delete('astromine_gameState');
    console.log('Save data deleted successfully from localStorage');
    return true;
  } catch (error) {
    console.error('Failed to delete save data:', error);
    return false;
  }
}