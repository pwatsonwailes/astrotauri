import { create } from 'zustand';
import { GameState } from '../types/game';
import { GAME_CONSTANTS } from '../constants/game';
import { saveGame, loadGame, hasSavedGame } from '../utils/saveSystem';

export const useGameStore = create<GameState & {
  setScreen: (screen: GameState['currentScreen']) => void;
  setCharacter: (character: GameState['selectedCharacter']) => void;
  setSceneCharacters: (sceneCharacters: GameState['sceneCharacters']) => void;
  setStoryState: (state: any) => void;
  setCurrentStory: (story: string | null) => void;
  addCompletedConversation: (crewId: string) => void;
  saveGameState: () => void;
  loadGameState: () => Promise<boolean>;
  hasExistingSave: () => Promise<boolean>;
  resetGame: () => void;
}>((set, get) => ({
  currentScreen: 'intro',
  selectedCharacter: null,
  sceneCharacters: [],
  storyState: null,
  currentStory: null,
  completedConversations: [],
  storyChoices: [], // Initialize the storyChoices array
  
  setScreen: (screen) => {
    set({ currentScreen: screen });
    // Auto-save when changing screens
    if (screen !== 'intro') {
      get().saveGameState();
    }
  },
  
  setSceneCharacters: (sceneCharacters) => {
    set({ sceneCharacters });
    get().saveGameState();
  },
  
  setCharacter: (selectedCharacter) => {
    set({ selectedCharacter });
    get().saveGameState();
  },
  
  setStoryState: (storyState) => {
    set({ storyState });
    get().saveGameState();
  },
  
  setCurrentStory: (currentStory) => {
    set({ currentStory });
    get().saveGameState();
  },
  
  addCompletedConversation: (crewId) => {
    set((state) => ({
      completedConversations: [...state.completedConversations, crewId]
    }));
    get().saveGameState();
  },
  
  saveGameState: () => {
    const state = get();
    const saveData = {
      selectedCharacter: state.selectedCharacter,
      completedConversations: state.completedConversations,
      sceneCharacters: state.sceneCharacters,
      currentScreen: state.currentScreen,
      currentStory: state.currentStory,
      storyState: state.storyState,
      storyChoices: state.storyChoices
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
        sceneCharacters: savedData.sceneCharacters,
        currentStory: savedData.currentStory,
        storyState: savedData.storyState,
        storyChoices: savedData.storyChoices || [], // Provide a default empty array if not present
        currentScreen: savedData.currentScreen || 'story' // Restore the screen the player was on when they saved
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
    set({
      currentScreen: 'intro',
      selectedCharacter: null,
      storyState: null,
      currentStory: null,
      sceneCharacters: [],
      completedConversations: [],
      storyChoices: []
    });
  }
}));