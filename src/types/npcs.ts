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
}

export interface NPCScheduleEntry {
  time: number;
  locationId: string;
}

export interface NPCLocation {
  currentLocationId: string;
  schedule?: NPCScheduleEntry[];
}