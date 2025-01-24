import { Goal } from './goals';
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
}

// Update LocationGoal to extend the base Goal type
export interface LocationGoal extends Goal {
  unlocksNPC?: LocationNPC;
}

export interface SubLocation {
  id: string;
  name: string;
  description: string;
  npcs: LocationNPC[];
  goals: LocationGoal[];
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
  goals: LocationGoal[];
  travelRequirements?: {
    [destinationId: string]: TravelRequirement;
  };
  availableDestinations?: string[]; // IDs of locations that can be traveled to
}