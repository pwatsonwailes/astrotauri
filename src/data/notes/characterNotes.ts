import { NoteCollection } from '../../types/notes';

export const characterNotes: NoteCollection = {
  id: 'character_notes',
  title: 'Character Notes',
  description: 'Information about characters and your interactions with them',
  category: 'character',
  isSequential: false,
  notes: [
    {
      id: 'meet_rhea',
      category: 'character',
      title: 'Meeting Rhea',
      content: 'Your first discussion with the ship\'s engineer about the strange energy readings.',
      status: 'locked',
      timestamp: Date.now(),
      requirements: [
        {
          type: 'story',
          id: 'prospector',
          condition: 'active'
        }
      ],
      actions: [
        {
          type: 'unlock_note',
          target: 'rhea_background'
        }
      ],
      relatedCharacters: ['rhea'],
      metadata: {
        importance: 'medium',
        sequence: 1
      }
    },
    {
      id: 'meet_jax',
      category: 'character',
      title: 'Meeting Jax',
      content: 'Your first training session with the security officer.',
      status: 'locked',
      timestamp: Date.now(),
      requirements: [
        {
          type: 'story',
          id: 'prospector',
          condition: 'active'
        }
      ],
      actions: [
        {
          type: 'unlock_note',
          target: 'jax_background'
        }
      ],
      relatedCharacters: ['jax'],
      metadata: {
        importance: 'medium',
        sequence: 2
      }
    },
    {
      id: 'meet_kade',
      category: 'character',
      title: 'Meeting Kade',
      content: 'Your first discussion with the pilot.',
      status: 'locked',
      timestamp: Date.now(),
      requirements: [
        {
          type: 'story',
          id: 'prospector',
          condition: 'active'
        }
      ],
      actions: [
        {
          type: 'unlock_note',
          target: 'kade_background'
        }
      ],
      relatedCharacters: ['kade'],
      metadata: {
        importance: 'medium',
        sequence: 3
      }
    }
  ]
};