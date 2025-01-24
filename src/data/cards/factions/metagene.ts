import { Card } from '../../../types/cards';

export const metageneCards: Card[] = [
  {
    id: 'corporate-deal',
    name: 'Corporate Deal',
    type: 'action',
    rarity: 'uncommon',
    description: 'Leverage Metagene connections for a profitable trade.',
    flavor: 'In corporate space, everything has a price tag.',
    cost: { energy: 2, credits: 100 },
    effects: [
      { type: 'credits', value: 300 },
      { type: 'reputation', value: 10, factionId: 'metagene' }
    ]
  },
  {
    id: 'hostile-takeover',
    name: 'Hostile Takeover',
    type: 'action',
    rarity: 'rare',
    description: 'Assist Metagene in acquiring a smaller company.',
    flavor: 'Business is war by other means.',
    cost: { energy: 3 },
    effects: [
      { type: 'credits', value: 500 },
      { type: 'reputation', value: 15, factionId: 'metagene' },
      { type: 'reputation', value: -20, factionId: 'delomir' }
    ]
  },
  {
    id: 'corporate-espionage',
    name: 'Corporate Espionage',
    type: 'action',
    rarity: 'rare',
    description: 'Steal valuable data for Metagene.',
    flavor: 'Information is the most valuable currency.',
    cost: { energy: 2 },
    effects: [
      { type: 'credits', value: 400 },
      { type: 'reputation', value: 20, factionId: 'metagene' },
      { type: 'stress', value: 2 }
    ]
  },
  {
    id: 'market-manipulation',
    name: 'Market Manipulation',
    type: 'action',
    rarity: 'uncommon',
    description: 'Use insider information to play the market.',
    flavor: 'The invisible hand belongs to Metagene.',
    cost: { energy: 2, credits: 200 },
    effects: [
      { type: 'credits', value: 400 },
      { type: 'reputation', value: 5, factionId: 'metagene' }
    ]
  },
  {
    id: 'corporate-protection',
    name: 'Corporate Protection',
    type: 'bodyMod',
    rarity: 'rare',
    description: 'Install Metagene security protocols.',
    flavor: 'Safety guaranteed, terms and conditions apply.',
    cost: { energy: 1, credits: 300 },
    effects: [
      { type: 'condition', value: 20 },
      { type: 'reputation', value: 10, factionId: 'metagene' }
    ]
  },
  {
    id: 'corporate-merger',
    name: 'Corporate Merger',
    type: 'operation',
    rarity: 'rare',
    description: 'Orchestrate a complex corporate merger over multiple turns.',
    flavor: 'The bigger they are, the more credits they have.',
    cost: {
      energy: 4,
      credits: 400,
      turns: 4,
      perTurn: {
        energy: 1,
        credits: 100
      }
    },
    effects: [
      { type: 'credits', value: 2500 },
      { type: 'reputation', value: 25, factionId: 'metagene' },
      { type: 'reputation', value: -15, factionId: 'delomir' }
    ]
  },
  {
    id: 'market-domination',
    name: 'Market Domination',
    type: 'operation',
    rarity: 'rare',
    description: 'Execute a long-term strategy to dominate market sectors.',
    flavor: 'First we take Manhattan, then we take Berlin.',
    cost: {
      energy: 3,
      credits: 600,
      turns: 5,
      perTurn: {
        credits: 150
      }
    },
    effects: [
      { type: 'credits', value: 3000 },
      { type: 'reputation', value: 35, factionId: 'metagene' }
    ]
  }
];