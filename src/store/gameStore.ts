import { create } from 'zustand';
import { GameState } from '../types/game';
import { NexusNode, NexusEdge, Character, GlossaryEntry } from '../types/nexus';
import { saveGame, loadGame, hasSavedGame, clearAllGameData } from '../utils/saveSystem';

export const useGameStore = create<GameState & {
  setScreen: (screen: GameState['currentScreen']) => void;
  setCharacter: (character: GameState['selectedCharacter']) => void;
  setStoryState: (state: any) => void;
  setCurrentStory: (story: string | null) => void;
  addCompletedConversation: (crewId: string) => void;
  saveGameState: () => void;
  loadGameState: () => Promise<boolean>;
  hasExistingSave: () => Promise<boolean>;
  resetGame: () => void;
  
  // Nexus actions
  addNode: (node: NexusNode) => void;
  updateNode: (nodeId: string, updates: Partial<NexusNode['data']>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: NexusEdge) => void;
  removeEdge: (edgeId: string) => void;
  unlockNode: (nodeId: string) => void;
  completeNode: (nodeId: string) => void;
  
  // Character actions
  addCharacter: (character: Character) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  addCharacterEvent: (characterId: string, event: string) => void;
  
  // Glossary actions
  addGlossaryEntry: (entry: GlossaryEntry) => void;
  updateGlossaryEntry: (entryId: string, updates: Partial<GlossaryEntry>) => void;
  unlockGlossaryEntry: (entryId: string) => void;
}>((set, get) => ({
  currentScreen: 'intro',
  selectedCharacter: null,
  storyState: null,
  currentStory: null,
  completedConversations: [],
  storyChoices: [],
  characters: [],
  glossaryEntries: [],
  nexusNodes: [],
  nexusEdges: [],
  
  setScreen: (screen) => {
    set({ currentScreen: screen });
    if (screen !== 'intro') {
      get().saveGameState();
    }
  },
  
  setCharacter: (character) => {
    set({ selectedCharacter: character });
    get().saveGameState();
  },
  
  setStoryState: (state) => {
    set({ storyState: state });
    get().saveGameState();
  },
  
  setCurrentStory: (story) => {
    set({ currentStory: story });
    get().saveGameState();
  },

  addCompletedConversation: (crewId) => {
    set((state) => ({
      completedConversations: [...state.completedConversations, crewId]
    }));
    get().saveGameState();
  },
  
  // Nexus actions
  addNode: (node) => {
    set((state) => ({
      nexusNodes: [...state.nexusNodes, node]
    }));
    get().saveGameState();
  },
  
  updateNode: (nodeId, updates) => {
    set((state) => ({
      nexusNodes: state.nexusNodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    }));
    get().saveGameState();
  },
  
  removeNode: (nodeId) => {
    set((state) => ({
      nexusNodes: state.nexusNodes.filter(node => node.id !== nodeId),
      nexusEdges: state.nexusEdges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      )
    }));
    get().saveGameState();
  },
  
  addEdge: (edge) => {
    set((state) => ({
      nexusEdges: [...state.nexusEdges, edge]
    }));
    get().saveGameState();
  },
  
  removeEdge: (edgeId) => {
    set((state) => ({
      nexusEdges: state.nexusEdges.filter(edge => edge.id !== edgeId)
    }));
    get().saveGameState();
  },
  
  unlockNode: (nodeId) => {
    set((state) => ({
      nexusNodes: state.nexusNodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, isLocked: false } }
          : node
      )
    }));
    get().saveGameState();
  },
  
  completeNode: (nodeId) => {
    set((state) => ({
      nexusNodes: state.nexusNodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, isCompleted: true } }
          : node
      )
    }));
    get().saveGameState();
  },
  
  // Character actions
  addCharacter: (character) => {
    set((state) => ({
      characters: [...state.characters, character]
    }));
    get().saveGameState();
  },
  
  updateCharacter: (characterId, updates) => {
    set((state) => ({
      characters: state.characters.map(char =>
        char.id === characterId ? { ...char, ...updates } : char
      )
    }));
    get().saveGameState();
  },
  
  addCharacterEvent: (characterId, event) => {
    set((state) => ({
      characters: state.characters.map(char =>
        char.id === characterId
          ? {
              ...char,
              history: [
                ...char.history,
                { timestamp: Date.now(), event }
              ]
            }
          : char
      )
    }));
    get().saveGameState();
  },
  
  // Glossary actions
  addGlossaryEntry: (entry) => {
    set((state) => ({
      glossaryEntries: [...state.glossaryEntries, entry]
    }));
    get().saveGameState();
  },
  
  updateGlossaryEntry: (entryId, updates) => {
    set((state) => ({
      glossaryEntries: state.glossaryEntries.map(entry =>
        entry.id === entryId ? { ...entry, ...updates } : entry
      )
    }));
    get().saveGameState();
  },
  
  unlockGlossaryEntry: (entryId) => {
    set((state) => ({
      glossaryEntries: state.glossaryEntries.map(entry =>
        entry.id === entryId ? { ...entry, unlocked: true } : entry
      )
    }));
    get().saveGameState();
  },
  
  saveGameState: () => {
    const state = get();
    const saveData = {
      selectedCharacter: state.selectedCharacter,
      completedConversations: state.completedConversations,
      currentScreen: state.currentScreen,
      currentStory: state.currentStory,
      storyState: state.storyState,
      storyChoices: state.storyChoices,
      characters: state.characters,
      glossaryEntries: state.glossaryEntries,
      nexusNodes: state.nexusNodes,
      nexusEdges: state.nexusEdges
    };
    
    saveGame(saveData);
  },
  
  loadGameState: async () => {
    try {
      const savedData = await loadGame();
      if (!savedData) return false;
      
      set({
        selectedCharacter: savedData.selectedCharacter,
        completedConversations: savedData.completedConversations,
        currentStory: savedData.currentStory,
        storyState: savedData.storyState,
        storyChoices: savedData.storyChoices || [],
        currentScreen: savedData.currentScreen || 'intro',
        characters: savedData.characters || [],
        glossaryEntries: savedData.glossaryEntries || [],
        nexusNodes: savedData.nexusNodes || [],
        nexusEdges: savedData.nexusEdges || []
      });
      
      return true;
    } catch (error) {
      console.error('Failed to load game:', error);
      return false;
    }
  },
  
  hasExistingSave: async () => {
    return await hasSavedGame();
  },
  
  resetGame: () => {
    clearAllGameData();
    set({
      currentScreen: 'intro',
      selectedCharacter: null,
      storyState: null,
      currentStory: null,
      completedConversations: [],
      storyChoices: [],
      characters: [],
      glossaryEntries: [],
      nexusNodes: [],
      nexusEdges: []
    });
  }
}));