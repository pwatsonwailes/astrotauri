import { create } from 'zustand';
import { GameState, Resources, InventoryItem, ManufacturingItem } from '../types/game';
import { Quest, QuestStatus } from '../types/quest';
import { GAME_CONSTANTS } from '../constants/game';
import { AVAILABLE_QUESTS } from '../data/quests';

export const useGameStore = create<GameState & {
  setScreen: (screen: GameState['currentScreen']) => void;
  setCharacter: (character: GameState['selectedCharacter']) => void;
  setStoryState: (state: any) => void;
  setCurrentStory: (story: string | null) => void;
  updateResources: (resources: Partial<Resources>) => void;
  addQuest: (quest: Quest) => void;
  updateQuest: (questId: string, updates: Partial<Quest>) => void;
  addInventoryItem: (item: InventoryItem) => void;
  removeInventoryItem: (itemId: string, quantity: number) => void;
  addManufacturingItem: (item: ManufacturingItem) => void;
  advanceTurn: () => void;
  addCompletedConversation: (crewId: string) => void;
  checkForSpecialEvents: () => void;
}>((set, get) => ({
  currentScreen: 'intro',
  selectedCharacter: null,
  storyState: null,
  currentStory: null,
  resources: GAME_CONSTANTS.INITIAL_RESOURCES,
  activeQuests: [],
  inventory: [],
  manufacturingQueue: [],
  currentTurn: 1,
  completedConversations: [],
  
  setScreen: (screen) => set({ currentScreen: screen }),
  setCharacter: (character) => set({ selectedCharacter: character }),
  setStoryState: (state) => set({ storyState: state }),
  setCurrentStory: (story) => set({ currentStory: story }),
  
  updateResources: (resources) => 
    set((state) => ({
      resources: {
        ...state.resources,
        ...Object.entries(resources).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: Math.max(0, (state.resources[key as keyof Resources] || 0) + (value || 0))
        }), {})
      }
    })),
    
  addQuest: (quest) => {
    const state = get();
    // Deduct required resources when starting a quest
    if (quest.requirements) {
      state.updateResources(
        Object.entries(quest.requirements).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: -(value || 0)
        }), {})
      );
    }
    set((state) => ({
      activeQuests: [...state.activeQuests, quest]
    }));
  },
    
  updateQuest: (questId, updates) =>
    set((state) => {
      const updatedQuests = state.activeQuests.map(quest => {
        if (quest.id === questId) {
          const updatedQuest = { ...quest, ...updates };
          
          // If the quest is newly completed, give rewards
          if (updates.status === 'completed' && quest.status !== 'completed') {
            const { updateResources } = get();
            if (quest.rewards.resources) {
              updateResources(quest.rewards.resources);
            }
          }
          
          return updatedQuest;
        }
        return quest;
      });
      
      return { activeQuests: updatedQuests };
    }),
    
  addInventoryItem: (item) =>
    set((state) => {
      const existingItem = state.inventory.find(i => i.id === item.id);
      if (existingItem) {
        return {
          inventory: state.inventory.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        };
      }
      return {
        inventory: [...state.inventory, item]
      };
    }),
    
  removeInventoryItem: (itemId, quantity) =>
    set((state) => ({
      inventory: state.inventory
        .map(item =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
            : item
        )
        .filter(item => item.quantity > 0)
    })),

  addManufacturingItem: (item) =>
    set((state) => ({
      manufacturingQueue: [...state.manufacturingQueue, item]
    })),

  checkForSpecialEvents: () => {
    const state = get();
    const currentTurn = state.currentTurn;
    
    // Add Aharon's derelict ship mission after the first turn
    if (currentTurn === 2) {
      const aharonMission = AVAILABLE_QUESTS.find(q => q.id === 'AHARON_DERELICT');
      const missionExists = state.activeQuests.some(q => q.id === 'AHARON_DERELICT');
      
      if (aharonMission && !missionExists) {
        const newQuest: Quest = {
          ...aharonMission,
          currentTurn: 1,
          status: 'active',
          progress: 0,
          cumulativeScore: 0
        };
        
        set((state) => ({
          activeQuests: [...state.activeQuests, newQuest]
        }));
      }
    }
  },

  advanceTurn: () =>
    set((state) => {
      const newTurn = state.currentTurn + 1;
      
      // Process manufacturing queue
      const { completed, inProgress } = state.manufacturingQueue.reduce(
        (acc, item) => {
          const remainingTurns = item.turnsRemaining - 1;
          if (remainingTurns <= 0) {
            acc.completed.push(item);
          } else {
            acc.inProgress.push({ ...item, turnsRemaining: remainingTurns });
          }
          return acc;
        },
        { completed: [] as ManufacturingItem[], inProgress: [] as ManufacturingItem[] }
      );

      // Add completed items to inventory
      completed.forEach(item => {
        get().addInventoryItem({
          id: item.id,
          name: item.name,
          description: item.description,
          type: item.type,
          quantity: 1
        });
      });

      // Process quests
      const updatedQuests = state.activeQuests.map(quest => {
        if (quest.status === 'active') {
          const newProgress = Math.min(100, (quest.progress || 0) + (100 / quest.duration));
          const isComplete = newProgress >= 100;
          
          const updatedQuest = {
            ...quest,
            currentTurn: quest.currentTurn + 1,
            progress: newProgress,
            status: isComplete ? 'completed' as QuestStatus : 'active' as QuestStatus
          };

          // If quest is complete, give rewards
          if (isComplete && quest.rewards.resources) {
            get().updateResources(quest.rewards.resources);
          }

          return updatedQuest;
        }
        return quest;
      });

      // Check for special events after updating state
      setTimeout(() => get().checkForSpecialEvents(), 0);

      return {
        currentTurn: newTurn,
        manufacturingQueue: inProgress,
        activeQuests: updatedQuests
      };
    }),

  addCompletedConversation: (crewId) =>
    set((state) => ({
      completedConversations: [...state.completedConversations, crewId]
    }))
}));