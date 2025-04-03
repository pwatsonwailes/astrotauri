import { NoteCollection } from '../../types/notes';
import { mainStoryNotes } from './mainStory';
import { characterNotes } from './characterNotes';

export const noteCollections: NoteCollection[] = [
  mainStoryNotes,
  characterNotes
];

// Helper function to find a note by ID across all collections
export function findNoteById(noteId: string) {
  for (const collection of noteCollections) {
    const note = collection.notes.find(n => n.id === noteId);
    if (note) return note;
  }
  return null;
}

// Helper function to get all notes for a category
export function getNotesByCategory(category: string) {
  return noteCollections
    .filter(collection => collection.category === category)
    .flatMap(collection => collection.notes);
}

// Helper function to check if a note's requirements are met
export function checkNoteRequirements(note: Note, gameState: GameState): boolean {
  return note.requirements.every(req => {
    switch (req.type) {
      case 'story':
        return gameState.completedConversations.includes(req.id);
      case 'note':
        const targetNote = findNoteById(req.id);
        return targetNote && targetNote.status === req.condition;
      case 'choice':
        return gameState.playerChoices.includes(req.id);
      default:
        return false;
    }
  });
}

// Helper function to process note actions
export function processNoteActions(note: Note, gameState: GameState) {
  note.actions.forEach(action => {
    switch (action.type) {
      case 'unlock_note':
        const targetNote = findNoteById(action.target);
        if (targetNote) targetNote.status = 'available';
        break;
      case 'trigger_story':
        gameState.setCurrentStory(action.target);
        gameState.setScreen('story');
        break;
      case 'update_status':
        const noteToUpdate = findNoteById(action.target);
        if (noteToUpdate) noteToUpdate.status = action.data;
        break;
    }
  });
}