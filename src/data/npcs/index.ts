import { NPC } from '../../types/npcs';

// Track NPC data
export const NPCs: Record<string, NPC> = {
  'dr-santos': {
    id: 'dr-santos',
    name: 'Dr. Maya Santos',
    title: 'Ship\'s Doctor',
    description: 'A calm and professional physician with steady hands and a reassuring presence.',
    image: 'maya',
    relationship: 0,
    unlockCondition: {
      type: 'story',
      chapterId: 0,
      nodeId: 'wake_up'
    },
    availableNarratives: ['medical-checkup', 'discuss-condition'],
    type: 'fixed'
  },
  'captain-chen': {
    id: 'captain-chen',
    name: 'Captain Lin Chen',
    title: 'Ship Captain',
    description: 'A veteran spacer with decades of experience in the Belt.',
    image: 'lin',
    relationship: 0,
    availableNarratives: ['discuss-journey', 'ship-status'],
    type: 'fixed'
  },
  'sadie': {
    id: 'sadie',
    name: 'Sadie Thompson',
    title: 'Ex-Vesta Security',
    description: 'A sharp-eyed investigator with a history of solving the Belt\'s most perplexing cases.',
    image: 'sadie',
    relationship: 0,
    availableNarratives: ['sadie-investigation'],
    type: 'companion'
  }
};