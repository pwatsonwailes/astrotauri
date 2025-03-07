import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { Book, Users, ChevronLeft } from 'lucide-react';
import { Story } from '../types/story';

export const Interactions: React.FC = () => {
  const { setScreen, setCurrentStory, addCompletedConversation, completedConversations } = useGameStore();
  const { getCrewStories } = useStorySystem();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Get main story elements (excluding Prologue)
  const mainStories = getCrewStories('captain').filter(story => 
    story.id !== 'prologue' && !completedConversations.includes(story.id)
  );

  // Get crew stories
  const crewStories = ['rhea', 'jax', 'kade'].map(crewId => ({
    crewId,
    stories: getCrewStories(crewId)
  })).filter(crew => crew.stories.length > 0);

  const startStory = (story: Story) => {
    setCurrentStory(story.content);
    setScreen('story');
    addCompletedConversation(story.id);
  };

  const getStoryTypeColor = (crewId: string) => {
    switch (crewId) {
      case 'captain':
        return 'bg-purple-100 text-purple-800';
      case 'rhea':
        return 'bg-blue-100 text-blue-800';
      case 'jax':
        return 'bg-red-100 text-red-800';
      case 'kade':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Left Column - Main Stories */}
      <div className="overflow-auto pr-4">
        <div className="flex items-center space-x-2 mb-6">
          <Book className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Story</h2>
        </div>

        <div className="space-y-4">
          {mainStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(selectedStory?.id === story.id ? null : story)}
              className={`bg-white/70 rounded-lg p-4 cursor-pointer transition-all border relative ${
                selectedStory?.id === story.id 
                  ? 'border-orange-300 ring-1 ring-orange-300' 
                  : 'border-slate-200 hover:border-orange-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-800">{story.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStoryTypeColor('captain')}`}>
                  Main Story
                </span>
              </div>
              <p className="text-sm text-slate-600">Continue the main storyline...</p>
            </div>
          ))}

          {mainStories.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Book className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
              <p>No story updates available</p>
              <p className="text-sm mt-2">Complete current objectives to progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Crew Interactions */}
      <div className="overflow-auto pl-4 border-l border-slate-200">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Crew</h2>
        </div>

        <div className="space-y-6">
          {crewStories.map(({ crewId, stories }) => (
            <div key={crewId} className="space-y-2">
              <h3 className="font-medium text-slate-700 capitalize">{crewId}</h3>
              {stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedStory(selectedStory?.id === story.id ? null : story)}
                  className={`bg-white/70 rounded-lg p-4 cursor-pointer transition-all border relative ${
                    selectedStory?.id === story.id 
                      ? 'border-orange-300 ring-1 ring-orange-300' 
                      : 'border-slate-200 hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{story.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStoryTypeColor(crewId)}`}>
                      {crewId}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">New conversation available...</p>
                </div>
              ))}
            </div>
          ))}

          {crewStories.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
              <p>No crew conversations available</p>
              <p className="text-sm mt-2">Check back after completing missions</p>
            </div>
          )}
        </div>

        {selectedStory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">{selectedStory.title}</h2>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              
              <div className="prose prose-slate mb-6">
                <p>Begin this conversation with {selectedStory.crewId}?</p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => startStory(selectedStory)}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
                >
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};