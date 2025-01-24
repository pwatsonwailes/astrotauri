import { Goal } from '../../types/goals';
import { createMiningGoals } from './categories/mining';
import { createTradeGoals } from './categories/trade';
import { createMetageneGoals } from './factions/metagene';
import { factions } from '../factions/factions';
import { getFactionGoals, getCategoryGoals } from './goalManager';

// Helper to add unique ID to a goal
const addUniqueId = (goal: Goal): Goal => ({
  ...goal,
  id: `${goal.id}-${Math.random().toString(36).substr(2, 9)}`
});

const createHousingGoal = (): Goal => ({
  id: 'initial-housing',
  title: 'Find Accommodation',
  description: 'Secure a basic room to establish yourself on Ceres before you arrive.',
  type: 'parentGoal',
  requirements: [
    { type: 'energy', amount: 3 },
    { type: 'credits', amount: 20 }
  ],
  timeLimit: 0,
  status: 'available',
  progress: {
    energyInvested: 0,
    creditsInvested: 0,
    turnsRemaining: 1,
    completionTimer: 0
  }
});

export const generateStartingGoals = (): Goal[] => {
  // Start with just the housing goal
  return [addUniqueId(createHousingGoal())];
};

// This will be called after the housing goal is completed
export const generateInitialGoals = (): Goal[] => {
  // Get basic mining goal
  const miningGoal = addUniqueId(createMiningGoals()[0]);
  
  // Get Metagene's first goal
  const metageneGoal = addUniqueId(createMetageneGoals()[0]);
  
  // Get small trade goal for a random faction
  const randomFaction = factions[Math.floor(Math.random() * factions.length)];
  const tradeGoal = addUniqueId({
    ...createTradeGoals(randomFaction.id)[0],
    factionId: randomFaction.id
  });

  return [miningGoal, metageneGoal, tradeGoal];
};

// This will be called when new goals become available through story/completion triggers
export const generateNewGoals = (factionId: string, count: number = 1): Goal[] => {
  // Get all possible goals for this faction
  const availableGoals = [
    ...getCategoryGoals('mining', factionId),
    ...getCategoryGoals('trade', factionId),
    ...getFactionGoals(factionId)
  ];

  // Randomly select the requested number of goals
  return availableGoals
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(addUniqueId);
};