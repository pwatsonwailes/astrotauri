import { Quest } from './quest';
import { SceneState } from './story';

export type Resources = {
  credits: number;
  materials: number;
  tech: number;
  influence: number;
};

export type Location = 'bridge' | 'quarters' | 'comms' | 'engineering';

export type Background = 'smuggler' | 'trader' | 'engineer' | 'pilot' | 'protection';

export type Alignment = 'stoic' | 'noble' | 'ruthless';

export type CharacterStats = {
  technicalExpertise: number;
  diplomacy: number;
  riskTolerance: number;
  leadership: number;
  strategicIntelligence: number;
};

export type Character = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  background: Background;
  alignment: Alignment;
  stats: CharacterStats;
};

export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  type: string;
  quantity: number;
};

export type ManufacturingItem = {
  id: string;
  name: string;
  description: string;
  type: string;
  turnsRemaining: number;
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
  sceneState: SceneState;
  currentKnot: string | null;
  processedTexts: string[];
};

export type GameState = {
  currentScreen: 'intro' | 'character-select' | 'story' | 'tutorial' | 'ship-hub';
  selectedCharacter: Character | null;
  storyState: StoryStateData | null;
  currentStory: string | null;
  resources: Resources;
  activeQuests: Quest[];
  inventory: InventoryItem[];
  manufacturingQueue: ManufacturingItem[];
  currentTurn: number;
  completedConversations: string[];
  storyChoices: StoryChoice[];
};