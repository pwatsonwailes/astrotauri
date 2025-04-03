import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ChevronRight } from 'lucide-react';
import { stories } from '../../../data/stories';

export const NotesTab: React.FC = () => {
  const { notes, unlockNote, setCurrentStory, setScreen } = useGameStore();

  const handleNoteClick = (noteId: string, nextNoteId?: string) => {
    // Handle story launch for specific notes
    if (noteId === 'prologue-mission') {
      setCurrentStory(stories.Prospector);
      setScreen('story');
      return;
    }

    // Handle unlocking next note
    if (nextNoteId) {
      unlockNote(nextNoteId);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Story Notes</h2>
      
      <div className="divide-y divide-gray-200">
        {notes.map(note => (
          <div
            key={note.id}
            className={`py-4 ${note.isLocked ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-900">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {new Date(note.timestamp).toLocaleDateString()}
                </p>
              </div>
              
              {!note.isLocked && (note.nextNoteId || note.id === 'prologue-mission') && (
                <button
                  onClick={() => handleNoteClick(note.id, note.nextNoteId)}
                  className="p-2 rounded-full hover:bg-slate-100"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              )}
            </div>
            
            {!note.isLocked && (
              <p className="mt-2 text-slate-600">{note.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};