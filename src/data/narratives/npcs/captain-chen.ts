import { CharacterNarrative } from '../../../types/narrative';

export const captainChenNarratives: Record<string, CharacterNarrative> = {
  'discuss-journey': {
    id: 'discuss-journey',
    characterId: 'captain-chen',
    requirements: [
      { type: 'story', chapterId: 0, nodeId: 'wake_up' }
    ],
    nodes: [
      {
        type: 'paragraph',
        text: "Captain Chen stands at the viewport, watching the stars drift by. She turns as you approach, her expression thoughtful.",
        media: {
          character: {
            cast: 'primary',
            name: 'Captain Chen',
            src: 'lin',
            position: 'main'
          }
        }
      },
      // Add more nodes...
    ]
  },
  'ship-status': {
    id: 'ship-status',
    characterId: 'captain-chen',
    requirements: [
      { type: 'story', chapterId: 0, nodeId: 'wake_up' },
      { type: 'relationship', value: 15 }
    ],
    nodes: [
      // Add narrative nodes...
    ]
  }
};