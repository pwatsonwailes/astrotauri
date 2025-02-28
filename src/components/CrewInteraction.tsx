import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { Users, MessageSquare } from 'lucide-react';
import { Story } from '../types/story';

type CrewMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

const CREW_MEMBERS: CrewMember[] = [
  {
    id: 'rhea',
    name: 'Rhea',
    role: 'Chief Engineer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
  },
  {
    id: 'jax',
    name: 'Jax',
    role: 'Security Chief',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 'kade',
    name: 'Kade',
    role: 'Navigator',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop'
  }
];

export const CrewInteraction: React.FC = () => {
  const { setScreen, setCurrentStory, addCompletedConversation } = useGameStore();
  const { getCrewStories } = useStorySystem();
  const [selectedCrew, setSelectedCrew] = React.useState<string | null>(null);

  const startCrewStory = (story: Story) => {
    setCurrentStory(story.content);
    setScreen('story');
    addCompletedConversation(story.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="w-5 h-5" />
        <h2 className="text-xl font-bold">Crew Quarters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREW_MEMBERS.map((crew) => {
          const availableStories = getCrewStories(crew.id);
          const hasStories = availableStories.length > 0;
          
          return (
            <div key={crew.id} className="space-y-4">
              <div
                className={`bg-gray-800 rounded-lg p-4 ${
                  hasStories ? 'cursor-pointer hover:bg-gray-700' : ''
                } transition-all`}
                onClick={() => hasStories && setSelectedCrew(
                  selectedCrew === crew.id ? null : crew.id
                )}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={crew.avatar}
                    alt={crew.name}
                    className={`w-12 h-12 rounded-full object-cover ${
                      !hasStories ? 'grayscale' : ''
                    }`}
                  />
                  <div>
                    <h3 className="font-medium">{crew.name}</h3>
                    <p className="text-sm text-gray-400">{crew.role}</p>
                    {hasStories && (
                      <div className="flex items-center mt-1 text-blue-400">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span className="text-xs">
                          {availableStories.length} conversation{availableStories.length !== 1 ? 's' : ''} available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedCrew === crew.id && availableStories.length > 0 && (
                <div className="space-y-2">
                  {availableStories.map(story => (
                    <button
                      key={story.id}
                      onClick={() => startCrewStory(story)}
                      className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors"
                    >
                      <h4 className="font-medium">{story.title}</h4>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};