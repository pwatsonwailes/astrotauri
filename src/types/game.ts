import { Note, NoteStatus } from './notes';
import { StoryDetails } from './story';
import { StoryWrapper } from './ink';

export type Background = 'smuggler' | 'trader' | 'engineer' | 'pilot' | 'protection';

export type Alignment = 'stoic' | 'noble' | 'ruthless';

export type CharacterStats = {
  technicalExpertise: number;
  diplomacy: number;
  riskTolerance: number;
  leadership: number;
  strategicIntelligence: number;
};

export type PlayerCharacter = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  background: Background;
  alignment: Alignment;
  stats: CharacterStats;
};

export type StoryChoice = {
  storyId: string;
  knotName: string | null;
  choiceText: string;
  timestamp: number;
};

export type StoryStateData = {
  storyContent: string;
  storyJson: string;
  paragraphs: string[];
  choices: { text: string; index: number }[];
  currentKnot: string | null;
  processedTexts: string[];
};

export type GameState = {
  currentScreen: 'intro' | 'character-select' | 'story' | 'dossier';
  selectedCharacter: PlayerCharacter | null;
  storyState: StoryWrapper | null;
  currentStory: string | null;
  completedConversations: string[];
  playerChoices: string[];
  noteStatuses: Record<string, NoteStatus>;
  selectedStoryDetails: StoryDetails | null;
  characters: any[];
  topics: any[];
  conclusions: any[];
};