import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CharacterNarrative, LocationNarrative } from '../types/narrative';
import { checkNarrativeRequirements } from '../utils/narrative/checkAvailability';
import { useGameStore } from './useGameStore';
import { useStoryStore } from './useStoryStore';
import { characterNarratives, locationNarratives } from '../data/narratives';

interface NarrativeState {
  completedNarratives: string[];
  activeNarratives: string[];
  isLoading: boolean;
  startNarrative: (narrativeId: string) => boolean;
  completeNarrative: (narrativeId: string) => void;
  resetNarrativeState: () => void;
}

export const useNarrativeStore = create<NarrativeState>()(
  devtools(
    persist(
      (set, get) => ({
        completedNarratives: [],
        activeNarratives: [],
        isLoading: false,

        startNarrative: (narrativeId: string): boolean => {
          const gameState = useGameStore.getState();
          const storyState = useStoryStore.getState();
          const { completedNarratives, activeNarratives } = get();

          // Check if narrative is already completed or active
          if (completedNarratives.includes(narrativeId) ||
              activeNarratives.includes(narrativeId)) {
            return false;
          }

          // Find the narrative in either character or location narratives
          const narrative = findNarrative(narrativeId);
          if (!narrative) return false;

          // Check if requirements are met
          if (!checkNarrativeRequirements(narrative.requirements, gameState, storyState)) {
            return false;
          }

          // Start the narrative
          useStoryStore.getState().loadNarrativeNodes(narrative.nodes);
          
          set(state => ({
            activeNarratives: [...state.activeNarratives, narrativeId]
          }));

          return true;
        },

        completeNarrative: (narrativeId: string) => {
          set(state => ({
            completedNarratives: [...state.completedNarratives, narrativeId],
            activeNarratives: state.activeNarratives.filter(id => id !== narrativeId)
          }));
        },

        resetNarrativeState: () => {
          set({
            completedNarratives: [],
            activeNarratives: [],
            isLoading: false
          });
        }
      }),
      {
        name: 'narrative-storage'
      }
    )
  )
);

// Helper function to find a narrative by ID
const findNarrative = (narrativeId: string): CharacterNarrative | LocationNarrative | null => {
  // First check character narratives
  if (characterNarratives[narrativeId]) {
    return characterNarratives[narrativeId];
  }
  
  // Then check location narratives
  if (locationNarratives[narrativeId]) {
    return locationNarratives[narrativeId];
  }
  
  return null;
};