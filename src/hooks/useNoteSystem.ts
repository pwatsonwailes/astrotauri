import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { Note, NoteStatus, NoteRequirement } from '../types/notes';
import { findNoteById } from '../data/notes';
import { noteCollections, allNotes } from '../data/notes';

export const useNoteSystem = () => {
  const gameState = useGameStore();

  const checkNoteRequirements = useCallback((note: Note): boolean => {
    if (!note.requirements || note.requirements.length === 0) {
      return true;
    }
    
    return note.requirements.every(req => {
      switch (req.type) {
        case 'story':
          console.warn('Story requirement check not fully implemented.');
          return false; 
        case 'note':
          const requiredNoteStatus = gameState.noteStatuses[req.id];
          if (!requiredNoteStatus) return false;
          const condition = req.condition || 'available';
          const statusOrder = { locked: 0, available: 1, active: 2, completed: 3, archived: 4 }; 
          return statusOrder[requiredNoteStatus] >= statusOrder[condition];
        case 'choice':
          return gameState.playerChoices.includes(req.id);
        default:
          console.warn(`Unknown note requirement type: ${(req as any).type}`);
          return false;
      }
    });
  }, [gameState.noteStatuses, gameState.playerChoices]);

  const updateNoteStatus = useCallback((noteId: string, status: NoteStatus) => {
    gameState.updateNoteStatus(noteId, status);
  }, [gameState.updateNoteStatus]);

  const checkAndUnlockNotes = useCallback(() => {
    allNotes.forEach(note => {
      const currentStatus = gameState.noteStatuses[note.id] || 'locked';
      if (currentStatus === 'locked' && checkNoteRequirements(note)) {
        console.log(`Unlocking note: ${note.id} (${note.title})`);
        gameState.updateNoteStatus(note.id, 'available');
      }
    });
  }, [gameState.noteStatuses, gameState.updateNoteStatus, checkNoteRequirements]);

  const getAvailableNotes = useCallback(() => {
    return allNotes
      .filter(note => {
        const status = gameState.noteStatuses[note.id] || 'locked';
        return status !== 'locked' && status !== 'archived';
      })
      .sort((a, b) => {
        const importanceOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const importanceDiff = 
          (importanceOrder[a.metadata?.importance || 'low'] || 3) -
          (importanceOrder[b.metadata?.importance || 'low'] || 3);
        
        if (importanceDiff !== 0) return importanceDiff;
        
        if (a.category === b.category && a.metadata?.sequence && b.metadata?.sequence) {
          return a.metadata.sequence - b.metadata.sequence;
        }
        
        return b.timestamp - a.timestamp;
      });
  }, [gameState.noteStatuses]);

  return {
    updateNoteStatus,
    checkAndUnlockNotes,
    getAvailableNotes,
    checkNoteRequirements,
    hasPlayerChoice: gameState.hasPlayerChoice,
  };
};