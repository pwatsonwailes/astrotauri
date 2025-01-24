import { Goal } from '../../../types/goals';

export const createDelomirGoals = (): Goal[] => [
  {
    id: 'delomir-neural-upgrade',
    title: 'Neural Enhancement Project',
    description: 'Install cutting-edge neural enhancements.',
    factionId: 'delomir',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 10 },
    ],
    rewards: {
      energy: 1,
      reputation: 15
    },
    timeLimit: 4,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 4
    }
  },
  {
    id: 'delomir-beta-testing',
    title: 'Beta Testing Program',
    description: 'Test experimental Delomir upgrades.',
    factionId: 'delomir',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 15 }
    ],
    rewards: {
      credits: 200,
      reputation: 10
    },
    timeLimit: 2,
    status: 'available',
    progress: {
      creditsInvested: 0,
      energyInvested: 0,
      turnsRemaining: 2
    }
  },
  {
    id: 'delomir-prototype',
    title: 'Prototype Installation',
    description: 'Install experimental Delomir prototype.',
    factionId: 'delomir',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 20 },
    ],
    rewards: {
      condition: 30,
      reputation: 20
    },
    timeLimit: 4,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 4
    }
  }
];