import { Goal } from '../../../types/goals';

export const createStellarCorpGoals = (): Goal[] => [
  {
    id: 'stellarcorp-deep-mining',
    title: 'Deep Mining Operation',
    description: "Access StellarCorp's deep asteroid mining sites.",
    factionId: 'stellarcorp',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 12 }
    ],
    rewards: {
      credits: 450,
      reputation: 15
    },
    timeLimit: 3,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 3
    }
  },
  {
    id: 'stellarcorp-resource-raid',
    title: 'Resource Raid',
    description: 'Lead a risky mining operation in contested space.',
    factionId: 'stellarcorp',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 12 }
    ],
    rewards: {
      credits: 800,
      reputation: 20
    },
    timeLimit: 4,
    status: 'available',
    progress: {
      energyInvested: 0,
      turnsRemaining: 4
    }
  },
  {
    id: 'stellarcorp-mining-rig',
    title: 'Mining Rig Installation',
    description: 'Install StellarCorp mining equipment interfaces.',
    factionId: 'stellarcorp',
    type: 'parentGoal',
    requirements: [
      { type: 'energy', amount: 20 },
    ],
    rewards: {
      condition: 25,
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