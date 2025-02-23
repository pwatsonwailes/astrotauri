export type StoryRequirement =
  | { type: 'initial' }
  | { type: 'conversation'; storyId: string; turnsAfter: number }
  | { type: 'manufacturing'; itemType: string; count: number }
  | { type: 'quest'; questId: string; status: 'completed' | 'failed' };

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
};