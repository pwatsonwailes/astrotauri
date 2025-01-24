import { Goal } from '../../../types/goals';

export const createTradeGoals = (factionId: string): Goal[] => [
  {
    id: `${factionId}-small-trade`,
    title: 'Small Trade Run',
    description: 'Conduct a small trading operation.',
    factionId,
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 4 }
    ],
    rewards: {
      credits: 150,
      reputation: 5
    },
    timeLimit: 2,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 2
    }
  },
  {
    id: `${factionId}-market-opportunity`,
    title: 'Market Opportunity',
    description: 'Take advantage of a temporary market opportunity.',
    factionId,
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 4 },
    ],
    rewards: {
      credits: 250,
      reputation: 10
    },
    timeLimit: 3,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 3
    }
  }
];