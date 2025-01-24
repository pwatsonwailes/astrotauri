import { Goal } from '../../../types/goals';

export const createNarrativeGoals = (): Goal[] => [
  {
    id: `asdf`,
    title: 'asdf',
    description: 'zcxv',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 5 }
    ],
    rewards: {
      condition: -5,
      reputation: 5
    },
    timeLimit: 3,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 2
    }
  }
];