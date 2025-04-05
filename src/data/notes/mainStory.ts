import { NoteCollection } from '../../types/notes';

export const mainStoryNotes: NoteCollection = {
  id: 'main_story',
  title: 'Main Story',
  description: 'Key events and revelations in your journey',
  category: 'main_story',
  isSequential: true,
  notes: [
    {
      id: 'prologue_start',
      category: 'main_story',
      title: 'The Beginning',
      content: 'Your journey begins with memories of a fateful night on Ceres...',
      status: 'available',
      timestamp: Date.now(),
      requirements: [],
      actions: [
        {
          type: 'unlock_note',
          target: 'prologue_mission'
        }
      ],
      metadata: {
        importance: 'critical',
        sequence: 1
      }
    },
    {
      id: 'prologue_mission',
      category: 'main_story',
      title: 'Mission from Aharon',
      content: 'Aharon has a special mission for the crew of the Prospector...',
      status: 'locked',
      timestamp: Date.now(),
      requirements: [
        {
          type: 'note',
          id: 'prologue_start',
          condition: 'completed'
        }
      ],
      actions: [
        {
          type: 'trigger_story',
          target: 'prospector'
        }
      ],
      metadata: {
        importance: 'critical',
        sequence: 2
      }
    }
  ]
};