import { NPC } from '../../types/npcs';

// Track NPC current locations and schedules
export const NPCLocations: Record<string, {
  currentLocationId: string;
  schedule?: {
    time: number;
    locationId: string;
  }[];
}> = {
  'dr-santos': {
    currentLocationId: 'medical-bay',
    schedule: [
      { time: 0, locationId: 'medical-bay' },
      { time: 8, locationId: 'crew-quarters' },
      { time: 16, locationId: 'medical-bay' }
    ]
  },
  'captain-chen': {
    currentLocationId: 'crew-quarters',
    schedule: [
      { time: 0, locationId: 'crew-quarters' },
      { time: 4, locationId: 'bridge' },
      { time: 12, locationId: 'crew-quarters' }
    ]
  }
  // Add other NPCs here
};

// NPC data separate from locations
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
    availableNarratives: ['medical-checkup', 'discuss-condition']
  },
  'captain-chen': {
    id: 'captain-chen',
    name: 'Captain Lin Chen',
    title: 'Ship Captain',
    description: 'A veteran spacer with decades of experience in the Belt.',
    image: 'lin',
    relationship: 0,
    availableNarratives: ['discuss-journey', 'ship-status']
  }
  // Add other NPCs here
};