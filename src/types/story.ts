import { Task } from './tasks';

export type StoryNodeType = 'gallery' | 'paragraph' | 'choice' | 'button' | 'task';
export type StoryVariableType = 'string' | 'number' | 'boolean';

export interface StoryVariable {
  id: string;
  type: StoryVariableType;
  value: string | number | boolean;
}

export interface StoryVariableUpdate {
  id: string;
  value: string | number | boolean;
}

export interface StoryRequirement {
  type: 'choice' | 'variable' | 'loop';
  choiceId?: string;
  optionId?: number;
  variableId?: string;
  variableValue?: string | number | boolean;
  loopCount?: number;
  maxLoops?: number;
}

export interface StoryMedia {
  images?: {
    src: string;
    caption?: string;
    displayDuration?: number;
    transitionDuration?: number;
  }[];
  image?: {
    src: string;
  };
  music?: {
    track: string;
    volume: number;
  };
  character?: {
    cast: string;
    name: string;
    src: string;
    position?: string;
    action: 'add' | 'remove';
  };
}

export interface DialogueOption {
  text: string;
  variables?: StoryVariableUpdate[];
  loopBack?: boolean;
  exitLoop?: boolean;
}

export interface StoryNode {
  type: StoryNodeType;
  text?: string;
  duration?: number;
  media?: StoryMedia;
  options?: DialogueOption[];
  mode?: 'cards';
  id?: string;
  requirements?: StoryRequirement[];
  task?: Task;
  variables?: StoryVariableUpdate[];
  loopId?: string;
  isLoopStart?: boolean;
  isLoopEnd?: boolean;
  maxLoops?: number;
  npcUpdates?: {
    npcId: string;
    locationId: string;
    message?: string;
  }[];
}

export interface StoryChapter {
  id: number;
  title: string;
  nodes: StoryNode[];
  nodeIndex?: number;
}

export interface StoryImage {
  src: string;
  alt?: string;
}

export interface StoryMusic {
  track: string;
  volume?: number;
}

export interface LoopState {
  loopId: string;
  count: number;
  maxLoops: number;
  startNodeIndex: number;
}

export interface StoryState {
  currentChapterIndex: number;
  currentNodeIndex: number;
  choices: Record<string, number>;
  variables: Record<string, StoryVariable>;
  isPlaying: boolean;
  currentImage?: StoryImage;
  currentMusic?: StoryMusic;
  activeCharacters: Array<{
    name: string;
    src: string;
  }>;
  activeLoops: LoopState[];
  temporaryNodes?: StoryNode[];
  completedNarratives: string[];
  activeNarratives: string[];
}