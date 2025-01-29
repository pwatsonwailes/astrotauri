import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoryState, StoryVariable, StoryVariableUpdate, StoryNode } from '../types/story';
import { findNextValidNode } from '../utils/story/nodes';
import { storyChapters } from '../data/story/chapters';
import { StorageService } from '../services/storage';
import { initialStoryVariables } from '../data/story/variables';
import { saveAllState } from '../utils/state/saveState';
import { useEventStore } from './useEventStore';
import { characterNarratives, locationNarratives } from '../data/narratives';

const INITIAL_STATE: StoryState = {
  currentChapterIndex: 0,
  currentNodeIndex: 0,
  choices: {},
  variables: initialStoryVariables.reduce((acc, variable) => {
    acc[variable.id] = variable;
    return acc;
  }, {} as Record<string, StoryVariable>),
  isPlaying: true,
  activeCharacters: [],
  activeLoops: [],
  temporaryNodes: null,
  completedNarratives: [],
  activeNarratives: []
};

interface StoryStore extends StoryState {
  isLoading: boolean;
  initialize: () => Promise<void>;
  makeChoice: (choiceId: string, optionId: number) => void;
  advanceNode: () => void;
  completeChapter: () => void;
  jumpToNode: (chapterId: number, nodeId: string) => void;
  resumeStory: () => void;
  resetStoryState: () => void;
  updateVariable: (update: StoryVariableUpdate) => void;
  updateVariables: (updates: StoryVariableUpdate[]) => void;
  startNarrative: (narrativeId: string) => boolean;
  completeNarrative: (narrativeId: string) => void;
}

export const useStoryStore = create<StoryStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: true,

        initialize: async () => {
          try {
            const savedState = await StorageService.loadStoryState();
            if (savedState) {
              set({ ...savedState, isLoading: false });
            } else {
              set({ ...INITIAL_STATE, isLoading: false });
            }
          } catch (error) {
            set({ ...INITIAL_STATE, isLoading: false });
          }
        },

        makeChoice: (choiceId, optionId) => {
          const state = get();
          const chapter = storyChapters[state.currentChapterIndex];
          if (!chapter) return;

          const nextValid = findNextValidNode(
            chapter.nodes,
            state.currentNodeIndex + 1,
            {
              ...state.choices,
              [choiceId]: optionId
            }
          );

          if (!nextValid) return;

          // Emit silent story progress event if node has an ID
          const node = chapter.nodes[nextValid.index];
          if (node.id) {
            useEventStore.getState().addEvent({
              type: 'story-progress',
              message: `Story progress: ${node.id}`,
              details: {
                chapterId: state.currentChapterIndex,
                nodeId: node.id
              },
              silent: true
            });
          }

          set({
            choices: { ...state.choices, [choiceId]: optionId },
            currentNodeIndex: nextValid.index
          });
          saveAllState();
        },

        advanceNode: () => {
          const state = get();
          const chapter = storyChapters[state.currentChapterIndex];
          if (!chapter) return;

          const nextValid = findNextValidNode(
            chapter.nodes,
            state.currentNodeIndex + 1,
            state.choices
          );

          if (!nextValid) return;

          const node = chapter.nodes[nextValid.index];
          let updates: Partial<StoryState> = {
            currentNodeIndex: nextValid.index
          };

          // Handle NPC location updates
          if (node.npcUpdates) {
            const gameState = useGameStore.getState();
            const updatedLocations = { ...gameState.npcLocations };
            
            node.npcUpdates.forEach(update => {
              updatedLocations[update.npcId] = {
                ...updatedLocations[update.npcId],
                currentLocationId: update.locationId
              };

              // Add event to event log if message provided
              if (update.message) {
                useEventStore.getState().addEvent({
                  type: 'info',
                  message: update.message,
                  timestamp: Date.now()
                });
              }
            });

            useGameStore.setState({ npcLocations: updatedLocations });
          }

          // Emit silent story progress event if node has an ID
          if (node.id) {
            useEventStore.getState().addEvent({
              type: 'story-progress',
              message: `Story progress: ${node.id}`,
              details: {
                chapterId: state.currentChapterIndex,
                nodeId: node.id
              },
              silent: true
            });
          }

          if (node.media) {
            if (node.media.image) {
              let updateImg = {
                src: node.media.image.src
              }

              if (node.media.image.title) {
                updateImg.title = node.media.image.title
              }

              updates.currentImage = updateImg
            }

            
            if (node.media.music) {
              updates.currentMusic = node.media.music
            }

            if (node.media.character) {
              const { character } = node.media;
              if (character.action === 'remove') {
                updates.activeCharacters = state.activeCharacters.filter(
                  c => c.name !== character.name
                );
              } else if (!state.activeCharacters.some(c => c.name === character.name)) {
                updates.activeCharacters = [...state.activeCharacters, character];
              }
            }
          }

          // Apply any variable updates from the node
          if (node.variables) {
            const updatedVariables = { ...state.variables };
            node.variables.forEach(update => {
              if (updatedVariables[update.id]) {
                updatedVariables[update.id] = {
                  ...updatedVariables[update.id],
                  value: update.value
                };
              }
            });
            updates.variables = updatedVariables;
          }

          set(updates);
          saveAllState();
        },

        completeChapter: () => {
          const state = get();
          set({
            currentChapterIndex: state.currentChapterIndex + 1,
            currentNodeIndex: 0,
            isPlaying: state.currentChapterIndex < storyChapters.length - 1
          });
          saveAllState();
        },

        jumpToNode: (chapterId, nodeId) => {
          const chapter = storyChapters[chapterId];
          if (!chapter) return;

          const nodeIndex = chapter.nodes.findIndex(node => node.id === nodeId);
          if (nodeIndex === -1) return;

          set({
            currentChapterIndex: chapterId,
            currentNodeIndex: nodeIndex
          });
          saveAllState();
        },

        resumeStory: () => {
          set({ isPlaying: true });
          saveAllState();
        },

        resetStoryState: () => {
          set(INITIAL_STATE);
        },

        updateVariable: (update) => {
          const state = get();
          if (!state.variables[update.id]) return;

          set({
            variables: {
              ...state.variables,
              [update.id]: {
                ...state.variables[update.id],
                value: update.value
              }
            }
          });
          saveAllState();
        },

        updateVariables: (updates) => {
          const state = get();
          const updatedVariables = { ...state.variables };

          updates.forEach(update => {
            if (updatedVariables[update.id]) {
              updatedVariables[update.id] = {
                ...updatedVariables[update.id],
                value: update.value
              };
            }
          });

          set({ variables: updatedVariables });
          saveAllState();
        },

        startNarrative: (narrativeId: string): boolean => {
          const state = get();
          
          // Check if narrative is already completed or active
          if (state.completedNarratives.includes(narrativeId) ||
              state.activeNarratives.includes(narrativeId)) {
            return false;
          }

          // Find the narrative
          const narrative = characterNarratives[narrativeId] || locationNarratives[narrativeId];
          if (!narrative) return false;

          // Load narrative nodes
          set({
            temporaryNodes: narrative.nodes,
            currentChapterIndex: -1, // Special index for narrative content
            currentNodeIndex: 0,
            isPlaying: true,
            activeNarratives: [...state.activeNarratives, narrativeId]
          });

          return true;
        },

        completeNarrative: (narrativeId: string) => {
          set(state => ({
            completedNarratives: [...state.completedNarratives, narrativeId],
            activeNarratives: state.activeNarratives.filter(id => id !== narrativeId)
          }));
        }
      }),
      {
        name: 'story-storage'
      }
    )
  )
);