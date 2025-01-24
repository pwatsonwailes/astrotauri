import { Card } from '../../../types/cards';

export const stellarCorpCards: Card[] = [
  {
    id: 'deep-mining',
    name: 'Deep Mining',
    type: 'action',
    rarity: 'uncommon',
    description: 'Access StellarCorp\'s deep asteroid mining sites.',
    flavor: 'The deeper you dig, the better the pay.',
    cost: { energy: 3 },
    effects: [
      { type: 'credits', value: 450 },
      { type: 'reputation', value: 15, factionId: 'stellarcorp' },
      { type: 'condition', value: -15, chance: 0.4 }
    ]
  },
  {
    id: 'resource-raid',
    name: 'Resource Raid',
    type: 'action',
    rarity: 'rare',
    description: 'Lead a risky mining operation in contested space.',
    flavor: 'High risk, higher reward.',
    cost: { energy: 4 },
    effects: [
      { type: 'credits', value: 800 },
      { type: 'reputation', value: 20, factionId: 'stellarcorp' },
      { type: 'condition', value: -30, chance: 0.5 }
    ]
  },
  {
    id: 'mineral-analysis',
    name: 'Mineral Analysis',
    type: 'action',
    rarity: 'uncommon',
    description: 'Use StellarCorp equipment to analyze mineral samples.',
    flavor: 'Knowledge is profit.',
    cost: { energy: 1 },
    effects: [
      { type: 'credits', value: 200 },
      { type: 'reputation', value: 5, factionId: 'stellarcorp' }
    ]
  },
  {
    id: 'mining-rig',
    name: 'Mining Rig',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install StellarCorp mining equipment interfaces.',
    flavor: 'Become one with the machine.',
    cost: { energy: 2, credits: 400 },
    effects: [
      { type: 'condition', value: 25 },
      { type: 'reputation', value: 10, factionId: 'stellarcorp' }
    ]
  },
  {
    id: 'stellar-contract',
    name: 'Stellar Contract',
    type: 'action',
    rarity: 'rare',
    description: 'Sign an exclusive mining contract with StellarCorp.',
    flavor: 'Your future in the stars.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 300 },
      { type: 'reputation', value: 25, factionId: 'stellarcorp' },
      { type: 'reputation', value: -15, factionId: 'metagene' }
    ]
  }
];