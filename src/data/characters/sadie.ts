import { Character } from '../../types/characters';

export const sadie: Character = {
  id: 'sadie',
  name: 'Sadie Thompson',
  title: 'Ex-Vesta Security',
  description: 'A sharp-eyed investigator with a history of solving the Belt\'s most perplexing cases.',
  image: 'sadie',
  unlockCondition: {
    type: 'story',
    chapterId: 0,
    nodeId: 'meet_sadie'
  },
  relationship: 0,
  isUnlocked: false,
  goals: [
    {
      id: 'sadie_investigation',
      title: 'Aid Investigation',
      description: 'Help Sadie investigate the Argentum incident.',
      relationshipRequirement: 20,
      type: 'parentGoal',
      requirements: [{ type: 'energy', amount: 3 }],
      rewards: {
        credits: 300,
        reputation: 15
      },
      timeLimit: 4,
      status: 'hidden',
      progress: {
        energyInvested: 0,
        turnsRemaining: 4
      }
    }
    // Add more character-specific goals...
  ]
};