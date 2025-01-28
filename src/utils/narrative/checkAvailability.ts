import { CharacterNarrative, NarrativeRequirement } from '../../types/narrative';
import { GameState } from '../../types/game';
import { StoryState } from '../../types/story';

export const checkNarrativeRequirements = (
  requirements: NarrativeRequirement[],
  gameState: GameState,
  storyState: StoryState
): boolean => {
  return requirements.every(req => {
    switch (req.type) {
      case 'story':
        return storyState.currentChapterIndex > req.chapterId || 
          (storyState.currentChapterIndex === req.chapterId && 
           storyState.choices[req.nodeId]);
      
      case 'goal':
        return gameState.actions.some(
          goal => goal.id === req.goalId && (goal.status === 'completed' || goal.status === 'archived')
        );
      
      case 'relationship':
        return true; // TODO: Implement when relationship system is added
      
      case 'faction':
        const faction = gameState.factions.find(f => f.id === req.factionId);
        return faction ? faction.reputation >= req.reputation : false;
      
      default:
        return false;
    }
  });
};

export const checkNarrativeAvailability = (
  narrative: CharacterNarrative,
  gameState: GameState,
  storyState: StoryState,
  narrativeState: NarrativeState
): boolean => {
  // Check if narrative is already completed or active
  if (narrativeState.completedNarratives.includes(narrative.id) ||
      narrativeState.activeNarratives.includes(narrative.id)) {
    return false;
  }

  return checkNarrativeRequirements(narrative.requirements, gameState, storyState);
};