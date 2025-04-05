import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { Note, NoteStatus } from '../types/notes';
import { findNoteById, checkNoteRequirements, processNoteActions } from '../data/notes';
import { noteCollections } from '../data/notes';

export const useNoteSystem = () => {
  const gameState = useGameStore();

  const updateNoteStatus = useCallback((noteId: string, status: NoteStatus) => {
    gameState.updateNoteStatus(noteId, status);
    
    const note = findNoteById(noteId);
    if (note && status === 'completed') {
      processNoteActions(note, gameState);
    }
  }, [gameState]);

  const checkAndUnlockNotes = useCallback(() => {
    noteCollections.forEach(collection => {
      collection.notes.forEach(note => {
        if (gameState.noteStatuses[note.id] === 'locked' && checkNoteRequirements(note, gameState)) {
          gameState.updateNoteStatus(note.id, 'available');
        }
      });
    });
  }, [gameState]);

  const getAvailableNotes = useCallback(() => {
    return noteCollections
      .flatMap(collection => collection.notes)
      .filter(note => {
        const status = gameState.noteStatuses[note.id];
        return status !== 'locked' && status !== 'archived';
      })
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
  }, [gameState.noteStatuses]);

  return {
    updateNoteStatus,
    checkAndUnlockNotes,
    getAvailableNotes
  };
};