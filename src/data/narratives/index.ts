import { CharacterNarrative, LocationNarrative } from '../../types/narrative';
import { drSantosNarratives } from './npcs/dr-santos';
import { captainChenNarratives } from './npcs/captain-chen';
import { medicalBayNarratives } from './locations/medical-bay';

// Combine all NPC narratives
export const characterNarratives: Record<string, CharacterNarrative> = {
  ...drSantosNarratives,
  ...captainChenNarratives
};

// Combine all location narratives
export const locationNarratives: Record<string, LocationNarrative> = {
  ...medicalBayNarratives
};