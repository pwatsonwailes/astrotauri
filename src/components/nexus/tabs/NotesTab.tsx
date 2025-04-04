import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { useNoteSystem } from '../../../hooks/useNoteSystem';
import { ChevronRight, CheckCircle2, BookOpen, Clock, Star } from 'lucide-react';
import { Note } from '../../../types/notes';
import { StoryDetails } from '../../../types/story';

interface NoteDetailsProps {
  note: Note;
  onClose: () => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note, onClose }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-900">{note.title}</h3>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-slate-600">{note.content}</p>
        </div>

        <div className="flex items-center text-sm text-slate-500">
          <Clock className="w-4 h-4 mr-1" />
          {new Date(note.timestamp).toLocaleDateString()}
        </div>

        {note.metadata?.importance && (
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1" />
            <span className="capitalize">{note.metadata.importance} Priority</span>
          </div>
        )}

        {note.relatedCharacters && note.relatedCharacters.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">Related Characters</h4>
            <div className="flex flex-wrap gap-2">
              {note.relatedCharacters.map(charId => (
                <span 
                  key={charId}
                  className="px-2 py-1 text-sm bg-slate-100 text-slate-700 rounded"
                >
                  {charId}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface StoryDetailsViewProps {
  details: StoryDetails;
  onClose: () => void;
  onContinue?: () => void;
}

const StoryDetailsView: React.FC<StoryDetailsViewProps> = ({ details, onClose, onContinue }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-900">{details.title}</h3>
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-slate-600">{details.description}</p>

        {details.completedOn && (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed on {new Date(details.completedOn).toLocaleDateString()}
          </div>
        )}

        {details.nextStory && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="text-lg font-medium text-slate-800 mb-2">Next Story Available</h4>
            <p className="text-slate-600 mb-4">{details.nextStory.description}</p>
            {onContinue && (
              <button
                onClick={onContinue}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Continue Story
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const NotesTab: React.FC = () => {
  const { setCurrentStory, setScreen, completedConversations } = useGameStore();
  const { getAvailableNotes, updateNoteStatus } = useNoteSystem();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedStoryDetails, setSelectedStoryDetails] = useState<StoryDetails | null>(null);

  const availableNotes = getAvailableNotes();

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSelectedStoryDetails(null);

    // Process note actions if needed
    if (note.status === 'available') {
      updateNoteStatus(note.id, 'active');
      
      // Handle story triggers
      const storyAction = note.actions.find(action => action.type === 'trigger_story');
      if (storyAction) {
        setCurrentStory(storyAction.target);
        setScreen('story');
      }
    }
  };

  const handleStoryClick = (storyId: string) => {
    setSelectedNote(null);
    const isCompleted = completedConversations.includes(storyId);
    
    // Find story details and set them
    // This would need to be implemented based on your story data structure
    const details: StoryDetails = {
      title: "Story Title", // Replace with actual data
      description: "Story Description", // Replace with actual data
      completedOn: isCompleted ? Date.now() : undefined
    };
    
    setSelectedStoryDetails(details);
  };

  const clearSelection = () => {
    setSelectedNote(null);
    setSelectedStoryDetails(null);
  };

  return (
    <div className="flex h-full">
      <div className="w-2/3 pr-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Story Notes</h2>
        
        <div className="space-y-4">
          {availableNotes.map(note => (
            <div
              key={note.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors
                ${note.status === 'active' 
                  ? 'border-orange-200 bg-orange-50 hover:bg-orange-100' 
                  : 'border-slate-200 bg-white hover:bg-slate-50'}`}
              onClick={() => handleNoteClick(note)}
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
                
                {note.actions.some(action => action.type === 'trigger_story') && (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 border-l border-slate-200">
        {selectedNote && (
          <NoteDetails 
            note={selectedNote}
            onClose={clearSelection}
          />
        )}
        
        {selectedStoryDetails && (
          <StoryDetailsView 
            details={selectedStoryDetails}
            onClose={clearSelection}
            onContinue={() => {
              if (selectedStoryDetails.nextStory) {
                setCurrentStory(selectedStoryDetails.nextStory.id);
                setScreen('story');
              }
            }}
          />
        )}
        
        {!selectedNote && !selectedStoryDetails && (
          <div className="p-4 text-center text-slate-500">
            <BookOpen className="w-8 h-8 mx-auto mb-2" />
            <p>Select a note or story to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};