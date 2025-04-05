import { create } from 'zustand';
import { GameState } from '../types/game';
import { Note, NoteStatus } from '../types/notes';
import { StoryDetails } from '../types/story';
import { saveGame, loadGame, hasSavedGame, clearAllGameData } from '../utils/saveSystem';
import { noteCollections } from '../data/notes';

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
  updateNoteStatus: (noteId: string, status: NoteStatus) => void;
  unlockNote: (noteId: string) => void;
  addNote: (note: Note) => void;
  
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
  noteStatuses: {},
  selectedStoryDetails: null,
  characters: [],
  topics: [],
  conclusions: [],
  notes: [], // Add notes array to store state
  
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
  
  updateNoteStatus: (noteId: string, status: NoteStatus) => {
    set((state) => ({
      noteStatuses: {
        ...state.noteStatuses,
        [noteId]: status
      }
    }));
    get().saveGameState();
  },

  unlockNote: (noteId: string) => {
    set((state) => ({
      noteStatuses: {
        ...state.noteStatuses,
        [noteId]: 'available'
      }
    }));
    get().saveGameState();
  },

  addNote: (note: Note) => {
    set((state) => ({
      notes: [...(state.notes || []), note]
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
      noteStatuses: state.noteStatuses,
      playerChoices: state.playerChoices,
      characters: state.characters,
      topics: state.topics,
      conclusions: state.conclusions,
      notes: state.notes
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
        noteStatuses: savedData.noteStatuses || {},
        playerChoices: savedData.playerChoices || [],
        characters: savedData.characters || [],
        topics: savedData.topics || [],
        conclusions: savedData.conclusions || [],
        notes: savedData.notes || []
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
      noteStatuses: {},
      selectedStoryDetails: null,
      characters: [],
      topics: [],
      conclusions: [],
      notes: []
    });
  }
}));