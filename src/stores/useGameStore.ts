import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GameState } from '../types/game';
import { getInitialState } from '../data/initialState';
import { processCompletedGoals, requirementsMet } from '../engine/goals/completion';
import { processResourceUpdates } from '../engine/resources/resourceManager';
import { generateInitialGoals } from '../data/goals';
import { createMaintenanceGoal, shouldShowMaintenanceGoal } from '../data/goals/categories/maintenance';
import { StorageService } from '../services/storage';
import { useEventStore } from './useEventStore';
import { useMarketStore } from './useMarketStore';
import { useStoryStore } from './useStoryStore';
import { useSettingsStore } from './useSettingsStore';
import { saveAllState } from '../utils/state/saveState';
import { ViewType } from '../components/navigation/ViewSelector.tsx';
import { calculateMaxEnergy } from '../utils/energy.ts';
import { CharacterArchetype } from '../types/character';

interface GameStore extends GameState {
  isLoading: boolean;
  initialize: () => Promise<void>;
  updateView: (view: ViewType | 'characterCreation') => void;
  startTravel: (params: { destinationId: string; shipId: string; cost: number; turns: number }) => void;
  endTurn: () => void;
  updateResources: (changes: { credits?: number; condition?: number; stress?: number }) => void;
  activateGoal: (goalId: string) => void;
  investInGoal: (goalId: string, type: 'credits' | 'energy', amount: number) => void;
  resetGame: (character?: CharacterArchetype) => void;
  updatePlayerDetails: (details) => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getInitialState(),
        isLoading: true,

        initialize: async () => {
          try {
            const savedState = await StorageService.loadGameState();
            if (savedState) {
              set({ ...savedState, isLoading: false });
            } else {
              set({ ...getInitialState(), isLoading: false });
            }
          } catch (error) {
            console.error('Failed to load game state:', error);
            set({ ...getInitialState(), isLoading: false });
          }
        },

        updateView: (view) => set({ currentView: view }),

        updatePlayerDetails: (details) => {
          const state = get();

          set(state => ({
            ...state,
            player: details,
            currentView: 'goals' // Ensure view is updated here as well
          }));
          saveAllState();
        },

        startTravel: ({ destinationId, shipId, cost, turns }) => {
          const state = get();
          set({
            credits: state.credits - cost,
            currentLocation: {
              type: 'ship',
              id: shipId,
              destination: destinationId,
              turnsRemaining: turns
            }
          });
          saveAllState();
        },

        endTurn: () => {
          const state = get();
          let newState = { ...state };

          // Handle travel
          if (state.currentLocation.type === 'ship' && state.currentLocation.turnsRemaining) {
            const turnsRemaining = state.currentLocation.turnsRemaining - 1;
            
            if (turnsRemaining <= 0) {
              newState.currentLocation = {
                type: 'station',
                id: state.currentLocation.destination
              };
            } else {
              newState.currentLocation = {
                ...state.currentLocation,
                turnsRemaining
              };
            }
          }

          // Process goals with expiry progression
          const [stateAfterGoals] = processCompletedGoals(newState, true);
          const stateAfterResources = processResourceUpdates(stateAfterGoals);

          // Handle maintenance goal
          let goals = stateAfterResources.goals;
          const hasMaintenanceGoal = goals.some(goal => goal.id === 'maintenance');
          const needsMaintenanceGoal = shouldShowMaintenanceGoal(stateAfterResources.condition);

          if (needsMaintenanceGoal && !hasMaintenanceGoal) {
            goals = [...goals, createMaintenanceGoal()];
          }

          set({
            ...stateAfterResources,
            turn: state.turn + 1,
            energyPoints: calculateMaxEnergy(stateAfterResources.condition),
            goals
          });

          // Save all state after turn end
          saveAllState();
        },

        updateResources: (changes) => {
          const state = get();
          set({
            credits: state.credits + (changes.credits || 0),
            condition: Math.max(0, Math.min(100, state.condition + (changes.condition || 0))),
            stress: Math.max(0, state.stress + (changes.stress || 0))
          });
          saveAllState();
        },

        activateGoal: (goalId) => {
          const state = get();
          const goal = state.goals.find(g => g.id === goalId);
          if (!goal) return;

          const creditReq = goal.requirements.find(req => req.type === 'credits');
          if (creditReq && state.credits < creditReq.amount) return;

          // Process goals without expiry progression
          const newState = {
            ...state,
            credits: creditReq ? state.credits - creditReq.amount : state.credits,
            goals: state.goals.map(g => {
              if (g.id === goalId) {
                 let gNext = {
                  ...g,
                  status: 'active',
                }

                if (creditReq) {
                  gNext.progress = { ...g.progress, creditsInvested: creditReq.amount }
                }

                return gNext
              }
              else {
                return g
              }
            })
          };

          set(newState);
          saveAllState();
        },

        investInGoal: (goalId, type, amount) => {
          const state = get();
          if (type === 'energy' && state.energyPoints < amount) return;

          const goal = state.goals.find(g => g.id === goalId);
          if (!goal) return;

          const currentInvestment = goal.progress[`${type}Invested`];
          const requirement = goal.requirements.find(r => r.type === type);
          if (!requirement) return;

          const remainingNeeded = requirement.amount - currentInvestment;
          const actualInvestment = Math.min(amount, remainingNeeded);
          if (actualInvestment <= 0) return;

          let newState = { ...state };

          // Process goals without expiry progression
          newState.energyPoints = type === 'energy' ? state.energyPoints - actualInvestment : state.energyPoints;

          newState.goals = newState.goals.map(g => {
            if (g.id === goalId) {
              return {
                  ...g,
                  progress: {
                    ...g.progress,
                    [`${type}Invested`]: currentInvestment + actualInvestment
                  }
                }
              }
              else {
                return g
              }
          });

          newState.goals = newState.goals.map(g => {
            // Check if this was the housing goal
            if (g.id === goalId && goalId.startsWith('initial-housing')) {
              const shouldComplete = requirementsMet(g),
                    markComplete = shouldComplete && g.status !== 'archived'

              console.log('dealing with initial goal')
              if (shouldComplete) {
                console.log('should complete')

                const initialGoals = generateInitialGoals();
                newState.goals = [...newState.goals, ...initialGoals];

                useEventStore.getState().addEvent({
                  type: 'success',
                  message: 'Goal completed: Find Accommodation',
                  details: {
                    goalId: goal.id,
                    isHousingGoal: true,
                    rewards: goal.rewards
                  },
                  persistent: true // Mark this event as one that should persist
                });
              }

              return { ...g, status: markComplete ? 'completed' : g.status }
            }
            else {
              return g
            }
          });

          set(newState);
          saveAllState();
        },

        resetGame: (character) => {
          // Clear storage
          StorageService.saveGameState(null);
          StorageService.saveStoryState(null);
          StorageService.saveEventState(null);
          StorageService.saveMarketState(null);
          StorageService.saveNarrativeState(null);
          StorageService.saveSettings(null);

          // Clear all stores
          set(getInitialState(character));
          useEventStore.getState().resetEvents();
          useMarketStore.getState().initialize();
          useStoryStore.getState().resetStoryState();
          useSettingsStore.getState().updateSettings({ textSize: 'normal' });
        }
      }),
      {
        name: 'game-storage'
      }
    )
  )
);