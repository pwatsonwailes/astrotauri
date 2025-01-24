// Browser storage fallback implementation
const browserStorage = {
  async get(key: string): Promise<any> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  async set(key: string, data: any): Promise<boolean> {
    try {
      if (data === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
      return true;
    } catch {
      return false;
    }
  },

  async has(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }
};

// Use electron storage if available, otherwise fallback to browser storage
const storage = typeof window !== 'undefined' && window.electron?.storage 
  ? window.electron.storage 
  : browserStorage;

export class StorageService {
  private static async saveState(key: string, state: any): Promise<void> {
    if (state === null) {
      await storage.set(key, null);
      return;
    }

    await storage.set(key, {
      timestamp: Date.now(),
      state
    });
  }

  private static async loadState(key: string): Promise<any> {
    try {
      const data = await storage.get(key);
      return data?.state || null;
    } catch {
      return null;
    }
  }

  static async saveGameState(state: any): Promise<void> {
    return this.saveState('game-state', state);
  }

  static async loadGameState(): Promise<any> {
    return this.loadState('game-state');
  }

  static async saveStoryState(state: any): Promise<void> {
    return this.saveState('story-state', state);
  }

  static async loadStoryState(): Promise<any> {
    return this.loadState('story-state');
  }

  static async saveEventState(state: any): Promise<void> {
    return this.saveState('events-state', state);
  }

  static async loadEventState(): Promise<any> {
    return this.loadState('events-state');
  }

  static async saveMarketState(state: any): Promise<void> {
    return this.saveState('market-state', state);
  }

  static async loadMarketState(): Promise<any> {
    return this.loadState('market-state');
  }

  static async saveNarrativeState(state: any): Promise<void> {
    return this.saveState('narrative-state', state);
  }

  static async loadNarrativeState(): Promise<any> {
    return this.loadState('narrative-state');
  }

  static async saveTutorialState(state: any): Promise<void> {
    return this.saveState('tutorial-state', state);
  }

  static async loadTutorialState(): Promise<any> {
    return this.loadState('tutorial-state');
  }

  static async saveSettings(settings: any): Promise<void> {
    return this.saveState('settings', settings);
  }

  static async loadSettings(): Promise<any> {
    return this.loadState('settings');
  }

  static async hasSavedGame(): Promise<boolean> {
    return storage.has('game-state');
  }

  static async hasSavedStory(): Promise<boolean> {
    return storage.has('story-state');
  }

  static async hasSavedTutorial(): Promise<boolean> {
    return storage.has('tutorial-state');
  }
}