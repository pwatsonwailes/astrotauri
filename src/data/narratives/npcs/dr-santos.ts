import { CharacterNarrative } from '../../../types/narrative';

export const drSantosNarratives: Record<string, CharacterNarrative> = {
  'medical-checkup': {
    id: 'medical-checkup',
    characterId: 'dr-santos',
    requirements: [
      { type: 'story', chapterId: 0, nodeId: 'wake_up' }
    ],
    nodes: [
      {
        type: 'paragraph',
        text: "Dr. Santos looks up from her datapad as you approach. \"How are you feeling? Those neural implants still giving you any trouble?\"",
        media: {
          character: {
            cast: 'primary',
            name: 'Dr. Santos',
            src: 'maya',
            position: 'main'
          }
        }
      },
      {
        type: 'choice',
        id: 'checkup_response',
        text: "You consider how to respond.",
        options: [
          { text: "I'm still getting headaches." },
          { text: "The implants feel fine, but I'm worried about the memory loss." },
          { text: "Everything seems to be working properly." }
        ]
      },
      // Add more nodes for the rest of the conversation...
    ]
  },
  'discuss-condition': {
    id: 'discuss-condition',
    characterId: 'dr-santos',
    requirements: [
      { type: 'story', chapterId: 0, nodeId: 'wake_up' },
      { type: 'relationship', value: 20 }
    ],
    nodes: [
      // Add narrative nodes...
    ]
  }
};