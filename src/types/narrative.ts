import { StoryNode } from './story';

export interface BaseNarrative {
  id: string;
  requirements: NarrativeRequirement[];
  nodes: StoryNode[];
}

export interface CharacterNarrative extends BaseNarrative {
  characterId: string;
}

export interface LocationNarrative extends BaseNarrative {
  locationId: string;
}

export type NarrativeRequirement = 
  | { type: 'story'; chapterId: number; nodeId: string }
  | { type: 'goal'; goalId: string }
  | { type: 'relationship'; value: number }
  | { type: 'faction'; factionId: string; reputation: number };

export interface NarrativeState {
  completedNarratives: string[];
  activeNarratives: string[];
}