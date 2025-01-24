import { Goal } from './goals';

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  unlockCondition: UnlockCondition;
  relationship: number; // -100 to 100
  goals: CharacterGoal[];
  isUnlocked: boolean;
}

export interface CharacterGoal extends Goal {
  relationshipRequirement: number;
  narrativeRequirement?: {
    chapterId: number;
    nodeId: string;
  };
}

export type UnlockCondition = 
  | { type: 'story'; chapterId: number; nodeId: string }
  | { type: 'goal'; goalId: string }
  | { type: 'faction'; factionId: string; reputation: number };