import { StoryNode } from './story';

export interface CharacterNarrative {
  id: string;
  characterId: string;
  requirements: NarrativeRequirement[];
  nodes: StoryNode[];
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