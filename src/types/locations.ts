import { UnlockCondition } from './characters';

export interface LocationNPC {
  id: string;
  name: string;
  title: string;
  description: string;
  relationship: number;
  unlockCondition?: UnlockCondition;
  isUnlocked?: boolean;
  image?: string;
  narrativeRequirements?: {
    type: 'story' | 'narrative' | 'turns';
    chapterId?: number;
    nodeId?: string;
    narrativeId?: string;
    turnsAfter?: number;
  }[];
}

export interface SubLocation {
  id: string;
  name: string;
  description: string;
  npcs: LocationNPC[];
  isLocked?: boolean;
  unlockRequirement?: {
    type: string;
    value: number;
  };
}

export interface TravelRequirement {
  credits: number;
  turns: number;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  type: 'station' | 'ship' | 'area';
  subLocations: SubLocation[];
  npcs: LocationNPC[];
  travelRequirements?: {
    [destinationId: string]: TravelRequirement;
  };
  availableDestinations?: string[]; // IDs of locations that can be traveled to
}