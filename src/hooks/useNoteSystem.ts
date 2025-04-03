import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { Note, NoteStatus } from '../types/notes';
import { findNoteById, checkNoteRequirements, processNoteActions } from '../data/notes';

export const useNoteSystem = () => {
  const gameState = useGameStore();

  const updateNoteStatus = useCallback((noteId: string, status: NoteStatus) => {
    const note = findNoteById(noteId);
    if (note) {
      note.status = status;
      if (status === 'completed') {
        processNoteActions(note, gameState);
      }
    }
  }, [gameState]);

  const checkAndUnlockNotes = useCallback(() => {
    noteCollections.forEach(collection => {
      collection.notes.forEach(note => {
        if (note.status === 'locked' && checkNoteRequirements(note, gameState)) {
          note.status = 'available';
        }
      });
    });
  }, [gameState]);

  const getAvailableNotes = useCallback(() => {
    return noteCollections
      .flatMap(collection => collection.notes)
      .filter(note => note.status !== 'locked' && note.status !== 'archived')
      .sort((a, b) => {
        // Sort by importance first
        const importanceOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const importanceDiff = 
          (importanceOrder[a.metadata?.importance || 'low'] || 3) -
          (importanceOrder[b.metadata?.importance || 'low'] || 3);
        
        if (importanceDiff !== 0) return importanceDiff;
        
        // Then by sequence if in the same category
        if (a.category === b.category && a.metadata?.sequence && b.metadata?.sequence) {
          return a.metadata.sequence - b.metadata.sequence;
        }
        
        // Finally by timestamp
        return b.timestamp - a.timestamp;
      });
  }, []);

  return {
    updateNoteStatus,
    checkAndUnlockNotes,
    getAvailableNotes
  };
};