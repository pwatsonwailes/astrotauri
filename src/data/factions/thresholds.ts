import { ReputationThreshold } from '../../types/factions';

export const reputationThresholds: ReputationThreshold[] = [
  { level: 'hostile', min: -100, max: -51 },
  { level: 'unfriendly', min: -50, max: -1 },
  { level: 'neutral', min: 0, max: 49 },
  { level: 'friendly', min: 50, max: 99 },
  { level: 'allied', min: 100, max: 100 }
];