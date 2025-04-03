import { create } from 'zustand';
import { GameState } from '../types/game';
import { Note, NoteStatus } from '../types/notes';
import { StoryDetails } from '../types/story';
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
  
  // Note actions
  addNote: (note: Note) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  updateNoteStatus: (noteId: string, status: NoteStatus) => void;
  
  // Player choice actions
  addPlayerChoice: (choiceId: string) => void;
  hasPlayerChoice: (choiceId: string) => boolean;
}>((set, get) => ({
  currentScreen: 'intro',
  selectedCharacter: null,
  storyState: null,
  currentStory: null,
  completedConversations: [],
  playerChoices: [],
  notes: [],
  selectedStoryDetails: null,
  
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

  setSelectedStoryDetails: (details) => {
    set({ selectedStoryDetails: details });
  },

  addCompletedConversation: (crewId) => {
    set((state) => ({
      completedConversations: [...state.completedConversations, crewId]
    }));
    get().saveGameState();
  },
  
  // Note actions
  addNote: (note) => {
    set((state) => ({
      notes: [...state.notes, note]
    }));
    get().saveGameState();
  },
  
  updateNote: (noteId, updates) => {
    set((state) => ({
      notes: state.notes.map(note =>
        note.id === noteId ? { ...note, ...updates } : note
      )
    }));
    get().saveGameState();
  },
  
  updateNoteStatus: (noteId, status) => {
    set((state) => ({
      notes: state.notes.map(note =>
        note.id === noteId ? { ...note, status } : note
      )
    }));
    get().saveGameState();
  },
  
  // Player choice actions
  addPlayerChoice: (choiceId) => {
    set((state) => ({
      playerChoices: [...state.playerChoices, choiceId]
    }));
    get().saveGameState();
  },
  
  hasPlayerChoice: (choiceId) => {
    return get().playerChoices.includes(choiceId);
  },
  
  saveGameState: () => {
    const state = get();
    const saveData = {
      selectedCharacter: state.selectedCharacter,
      completedConversations: state.completedConversations,
      currentScreen: state.currentScreen,
      currentStory: state.currentStory,
      storyState: state.storyState,
      notes: state.notes,
      playerChoices: state.playerChoices
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
        currentScreen: savedData.currentScreen || 'intro',
        notes: savedData.notes || [],
        playerChoices: savedData.playerChoices || []
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
      playerChoices: [],
      notes: [],
      selectedStoryDetails: null
    });
  }
}));