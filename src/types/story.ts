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

export type SceneState = {
  image: string;
  presentCharacters: string[];
  speakingCharacter?: string;
  currentKnot?: string;
};