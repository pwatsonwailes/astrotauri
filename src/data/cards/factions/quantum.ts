import { Card } from '../../../types/cards';

export const quantumCards: Card[] = [
  {
    id: 'quantum-mining',
    name: 'Quantum Mining',
    type: 'action',
    rarity: 'rare',
    description: 'Use quantum algorithms for optimal resource extraction.',
    flavor: 'Mining in all possible universes simultaneously.',
    cost: { energy: 3 },
    effects: [
      { type: 'credits', value: 400 },
      { type: 'reputation', value: 15, factionId: 'quantum' }
    ]
  },
  {
    id: 'ai-trading',
    name: 'AI Trading',
    type: 'action',
    rarity: 'uncommon',
    description: 'Let quantum AI handle your market trades.',
    flavor: 'The market never sleeps, neither does the AI.',
    cost: { energy: 2, credits: 200 },
    effects: [
      { type: 'credits', value: 500 },
      { type: 'reputation', value: 10, factionId: 'quantum' },
      { type: 'stress', value: 1 }
    ]
  },
  {
    id: 'quantum-prediction',
    name: 'Quantum Prediction',
    type: 'action',
    rarity: 'rare',
    description: 'Use quantum computing to predict market trends.',
    flavor: 'The future is quantum.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 300 },
      { type: 'reputation', value: 10, factionId: 'quantum' }
    ]
  },
  {
    id: 'quantum-encryption',
    name: 'Quantum Encryption',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install quantum-grade security protocols.',
    flavor: 'Unbreakable, by the laws of physics.',
    cost: { energy: 2, credits: 300 },
    effects: [
      { type: 'condition', value: 15 },
      { type: 'reputation', value: 15, factionId: 'quantum' }
    ]
  },
  {
    id: 'quantum-core',
    name: 'Quantum Core',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install a quantum processing core in your neural system.',
    flavor: 'Think in superposition.',
    cost: { energy: 3, credits: 600 },
    effects: [
      { type: 'parentGoal', value: 2 },
      { type: 'reputation', value: 20, factionId: 'quantum' },
      { type: 'stress', value: 2 }
    ]
  }
];