import { Goal } from '../../../types/goals';

export const createQuantumGoals = (): Goal[] => [
  {
    id: 'quantum-mining',
    title: 'Quantum Mining Operation',
    description: 'Use quantum algorithms for optimal resource extraction.',
    factionId: 'quantum',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 12 }
    ],
    rewards: {
      credits: 400,
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
    id: 'quantum-ai-trading',
    title: 'AI Trading System',
    description: 'Let quantum AI handle your market trades.',
    factionId: 'quantum',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 10 },
    ],
    rewards: {
      credits: 500,
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
    id: 'quantum-core',
    title: 'Quantum Core Installation',
    description: 'Install a quantum processing core in your neural system.',
    factionId: 'quantum',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 20 },
    ],
    rewards: {
      energy: 2,
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