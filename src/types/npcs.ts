import { UnlockCondition } from './characters';

export interface NPC {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  relationship: number;
  unlockCondition?: UnlockCondition;
  isUnlocked?: boolean;
  availableNarratives: string[];
  type: 'companion' | 'fixed'; // Whether NPC can travel with player
}

export interface NPCLocation {
  currentLocationId: string;
  isWithPlayer?: boolean; // For companions - are they currently in player's party
  fixedLocation?: string; // For fixed NPCs - their permanent location
  storyOverride?: { // For story-driven location changes
    chapterId: number;
    nodeId: string;
    locationId: string;
  }[];
  playerChoice?: { // For choice-driven location changes
    choiceId: string;
    optionId: number;
    locationId: string;
  }[];
}

export interface NPCParty {
  activeCompanions: string[]; // IDs of NPCs currently with player
  maxCompanions: number; // Maximum number of companions allowed
}