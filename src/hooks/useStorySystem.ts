import { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { stories } from '../data/stories';
import { Story } from '../types/story';

export const useStorySystem = () => {
  const {
    currentTurn,
    completedConversations,
    manufacturingQueue,
    inventory,
    activeQuests
  } = useGameStore();

  const availableStories = useMemo(() => {
    return stories.filter(story => {
      // Don't show stories that have already been completed
      if (completedConversations.includes(story.id)) {
        return false;
      }

      const req = story.requirements;

      switch (req.type) {
        case 'initial':
          // Initial stories are always available if not completed
          return true;

        case 'conversation': {
          // Check if the prerequisite story is completed and enough turns have passed
          const prereqCompleted = completedConversations.includes(req.storyId);
          if (!prereqCompleted) return false;

          // Calculate turns since completion
          const completionTurn = completedConversations.indexOf(req.storyId) + 1;
          const turnsSinceCompletion = currentTurn - completionTurn;
          
          return turnsSinceCompletion >= req.turnsAfter;
        }

        case 'manufacturing': {
          // Count completed items of the required type
          const completedCount = inventory.filter(
            item => item.type === req.itemType
          ).length;
          const queueCount = manufacturingQueue.filter(
            item => item.type === req.itemType
          ).length;
          return (completedCount + queueCount) >= req.count;
        }

        case 'quest': {
          // Check if the specified quest has the required status
          const quest = activeQuests.find(q => q.id === req.questId);
          return quest?.status === req.status;
        }

        default:
          return false;
      }
    });
  }, [
    currentTurn,
    completedConversations,
    manufacturingQueue,
    inventory,
    activeQuests
  ]);

  const getCrewStories = (crewId: string): Story[] => {
    return availableStories.filter(story => story.crewId === crewId);
  };

  const isStoryAvailable = (storyId: string): boolean => {
    const story = stories.find(s => s.id === storyId);
    if (!story) return false;
    return availableStories.some(s => s.id === storyId);
  };

  const getNextStory = (currentStoryContent: string): Story | null => {
    // Find the current story in the stories array
    const currentStory = stories.find(s => s.content === currentStoryContent);
    if (!currentStory) return null;
    
    // Find the index of the current story
    const currentIndex = stories.findIndex(s => s.id === currentStory.id);
    if (currentIndex === -1) return null;
    
    // Look for the next story in sequence
    for (let i = currentIndex + 1; i < stories.length; i++) {
      const nextStory = stories[i];
      
      // Check if this story is a direct continuation
      if (nextStory.requirements.type === 'conversation' && 
          nextStory.requirements.storyId === currentStory.id &&
          nextStory.requirements.turnsAfter === 0) {
        return nextStory;
      }
    }
    
    return null;
  };
  
  const getStoryByPath = (path: string): Story | null => {
    // First try to find a story with matching ID
    const storyById = stories.find(s => s.id.toLowerCase() === path.toLowerCase());
    if (storyById) return storyById;
    
    // Then try to find a story with matching knot name
    const storyByKnot = stories.find(s => {
      const filename = s.id.split('_')[0]; // Extract base name from id
      return filename.toLowerCase() === path.toLowerCase();
    });
    if (storyByKnot) return storyByKnot;
    
    // Then try to find a story with matching filename (without extension)
    const storyByFilename = stories.find(s => {
      // Extract filename from content path if possible
      const contentPath = s.content.split('/').pop();
      if (contentPath) {
        const filename = contentPath.split('.')[0].toLowerCase();
        return filename === path.toLowerCase();
      }
      return false;
    });
    
    return storyByFilename || null;
  };

  return {
    getCrewStories,
    isStoryAvailable,
    getNextStory,
    getStoryByPath
  };
};