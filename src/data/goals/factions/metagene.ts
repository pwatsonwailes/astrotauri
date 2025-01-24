import { Goal } from '../../../types/goals';

export const createMetageneGoals = (): Goal[] => [
  {
    id: 'metagene-corporate-deal',
    title: 'Corporate Deal',
    description: 'Leverage Metagene connections for a profitable trade.',
    factionId: 'metagene',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 15 },
    ],
    rewards: {
      credits: 300,
      reputation: 10
    },
    timeLimit: 3,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 3
    }
  },
  {
    id: 'metagene-hostile-takeover',
    title: 'Hostile Takeover',
    description: 'Assist Metagene in acquiring a smaller company.',
    factionId: 'metagene',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 20 }
    ],
    rewards: {
      credits: 500,
      reputation: 15
    },
    timeLimit: 5,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 5
    }
  },
  {
    id: 'metagene-market-domination',
    title: 'Market Domination',
    description: 'Execute a long-term strategy to dominate market sectors.',
    factionId: 'metagene',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 30 },
    ],
    rewards: {
      credits: 3000,
      reputation: 35
    },
    timeLimit: 5,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 5
    }
  }
];