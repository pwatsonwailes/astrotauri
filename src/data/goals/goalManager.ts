import { Goal } from '../../types/goals';
import { createMiningGoals } from './categories/mining';
import { createTradeGoals } from './categories/trade';
import { createMetageneGoals } from './factions/metagene';
import { createQuantumGoals } from './factions/quantum';
import { createStellarCorpGoals } from './factions/stellarcorp';
import { createDelomirGoals } from './factions/delomir';

export const getFactionGoals = (factionId: string): Goal[] => {
  switch (factionId) {
    case 'metagene':
      return createMetageneGoals();
    case 'quantum':
      return createQuantumGoals();
    case 'stellarcorp':
      return createStellarCorpGoals();
    case 'delomir':
      return createDelomirGoals();
    default:
      return [];
  }
};

export const getCategoryGoals = (category: string, factionId: string): Goal[] => {
  switch (category) {
    case 'mining':
      return createMiningGoals(factionId);
    case 'trade':
      return createTradeGoals(factionId);
    default:
      return [];
  }
};