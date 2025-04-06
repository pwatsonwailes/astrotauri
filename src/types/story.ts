export type StoryRequirement =
  | { type: 'initial' }
  | { type: 'conversation'; storyId: string; turnsAfter: number };

export type Story = {
  id: string;
  crewId: string;
  title: string;
  content: string;
  requirements: StoryRequirement;
};

export type StoryDetails = {
  id: string;
  title: string;
  description: string;
  image: string;
  requirements: StoryRequirement;
};

export interface SceneState {
  image?: string;
  presentCharacters: string[];
  speakingCharacter?: string;
  currentKnot?: string;
  music?: string;
}