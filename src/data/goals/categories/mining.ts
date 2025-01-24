import { Goal } from '../../../types/goals';

export const createMiningGoals = (): Goal[] => [
  {
    id: `basic-mining`,
    title: 'Basic Mining Operation',
    description: 'Mine a small asteroid for resources.',
    type: 'parentGoal',
    requirements: [
      { type: 'credits', amount: 250 },
      { type: 'energy', amount: 6 }
    ],
    rewards: {
      credits: 400,
      reputation: 5
    },
    timeLimit: 0, // Can be activated anytime
    turnsToComplete: 5, // Takes 5 turns to complete once started
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 5,
      completionTimer: 0
    }
  },
  {
    id: `risky-mining`,
    title: 'High-Risk Mining',
    description: 'Mine a dangerous asteroid for high rewards.',
    type: 'parentGoal',
    requirements: [
      { type: 'credits', amount: 1000 },
      { type: 'energy', amount: 12 },
    ],
    rewards: {
      credits: 2000,
      reputation: 15
    },
    timeLimit: 0,
    turnsToComplete: 8, // Takes 8 turns to complete once started
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 4,
      completionTimer: 0
    }
  }
];