import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CharacterNarrative } from '../types/narrative';
import { checkNarrativeRequirements } from '../utils/narrative/checkAvailability';
import { useGameStore } from './useGameStore';
import { useStoryStore } from './useStoryStore';

interface NarrativeState {
  completedNarratives: string[];
  activeNarratives: string[];
  isLoading: boolean;
  startNarrative: (narrative: CharacterNarrative) => boolean;
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

        startNarrative: (narrative: CharacterNarrative): boolean => {
          const gameState = useGameStore.getState();
          const storyState = useStoryStore.getState();
          const { completedNarratives, activeNarratives } = get();

          // Check if narrative is already completed or active
          if (completedNarratives.includes(narrative.id) ||
              activeNarratives.includes(narrative.id)) {
            return false;
          }

          // Check if requirements are met
          if (!checkNarrativeRequirements(narrative.requirements, gameState, storyState)) {
            return false;
          }

          set(state => ({
            activeNarratives: [...state.activeNarratives, narrative.id]
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