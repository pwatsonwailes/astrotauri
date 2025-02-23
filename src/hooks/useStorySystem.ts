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

  const getNextStory = (currentStoryId: string): Story | null => {
    const currentStoryIndex = stories.findIndex(s => s.id === currentStoryId);
    if (currentStoryIndex === -1) return null;

    // Look for the next story in sequence that's available
    for (let i = currentStoryIndex + 1; i < stories.length; i++) {
      const nextStory = stories[i];
      if (isStoryAvailable(nextStory.id)) {
        return nextStory;
      }
    }

    return null;
  };

  return {
    getCrewStories,
    isStoryAvailable,
    getNextStory
  };
};