import { Story as InkStory } from 'inkjs/types';

export interface StoryState {
  currentPathString: string | null;
  currentChoices: Array<{
    text: string;
    index: number;
  }>;
  ToJson: () => string;
  LoadJson: (json: string) => void;
}

export interface StoryWrapper {
  story: InkStory;
  canContinue: boolean;
  state: StoryState;
  currentChoices: Array<{
    text: string;
    index: number;
  }>;
  Continue: () => string | null;
  ChooseChoiceIndex: (index: number) => void;
  ObserveVariable: (variableName: string, callback: (variableName: string, newValue: any) => void) => void;
}

export function createStoryWrapper(story: InkStory): StoryWrapper {
  return {
    story,
    get canContinue() {
      return story.canContinue;
    },
    get state() {
      return story.state;
    },
    get currentChoices() {
      return story.currentChoices;
    },
    Continue() {
      return story.Continue();
    },
    ChooseChoiceIndex(index: number) {
      story.ChooseChoiceIndex(index);
    },
    ObserveVariable(variableName: string, callback: (variableName: string, newValue: any) => void) {
      story.ObserveVariable(variableName, callback);
    }
  };
} 