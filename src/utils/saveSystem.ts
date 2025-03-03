import { Store } from '@tauri-apps/plugin-store';

// Create a store instance for Tauri
let store: Store | null = null;

// Initialize store if in Tauri environment
async function initStore() {
  if (store) return store;
  
  try {
    // Use a simple try-catch approach instead of relying on isClient
    store = new Store('.settings.dat');
    return store;
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
    // Always use localStorage fallback for now since Tauri store is causing issues
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
    // Always use localStorage fallback for now
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
    // Always use localStorage fallback for now
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
    // Always use localStorage fallback for now
    await localStorageFallback.delete('astromine_gameState');
    console.log('Save data deleted successfully from localStorage');
    return true;
  } catch (error) {
    console.error('Failed to delete save data:', error);
    return false;
  }
}