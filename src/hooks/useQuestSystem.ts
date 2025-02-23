import { useCallback, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Resources } from '../types/game';
import { Quest, QuestInteraction } from '../types/quest';
import { GAME_CONSTANTS } from '../constants/game';

export const useQuestSystem = (questId: string) => {
  const { activeQuests, updateQuest, updateResources, addInventoryItem } = useGameStore();
  const quest = activeQuests.find(q => q.id === questId);

  const hasRequirements = useCallback((requirements: Partial<Resources>) => {
    const resources = useGameStore.getState().resources;
    return Object.entries(requirements).every(
      ([key, value]) => resources[key as keyof Resources] >= (value || 0)
    );
  }, []);

  const processInteraction = useCallback((interaction: QuestInteraction, choice: number) => {
    if (!quest) return;

    const option = interaction.options[choice];
    if (option.cost && !hasRequirements({ credits: option.cost })) {
      return false;
    }

    if (option.cost) {
      updateResources({ credits: -option.cost });
    }

    updateQuest(quest.id, {
      cumulativeScore: quest.cumulativeScore + option.bonus
    });

    return true;
  }, [quest, hasRequirements, updateQuest, updateResources]);

  const processTurn = useCallback(() => {
    if (!quest) return;

    const { currentTurn, duration, riskLevel } = quest;
    if (currentTurn >= duration) return;

    // Process random events and score updates
    const randomFactor = Math.random() * 2 - 1; // -1 to 1
    const turnScore = randomFactor * (
      riskLevel === 'high' ? 2 :
      riskLevel === 'medium' ? 1.5 : 1
    );

    // Check for interactions
    const interaction = quest.turnInteractions[currentTurn];
    
    updateQuest(quest.id, {
      currentTurn: currentTurn + 1,
      cumulativeScore: quest.cumulativeScore + turnScore,
      progress: ((currentTurn + 1) / duration) * 100,
      ...(interaction ? { currentInteraction: interaction } : {})
    });

    // Check for quest completion
    if (currentTurn + 1 >= duration) {
      const threshold = GAME_CONSTANTS.SCORE_THRESHOLDS[riskLevel];
      const success = quest.cumulativeScore >= threshold.success;
      
      updateQuest(quest.id, {
        status: success ? 'completed' : 'failed'
      });

      if (success && quest.rewards) {
        if (quest.rewards.resources) {
          updateResources(quest.rewards.resources);
        }
        if (quest.rewards.items) {
          quest.rewards.items.forEach(item => addInventoryItem(item));
        }
      }
    }
  }, [quest, updateQuest, updateResources, addInventoryItem]);

  useEffect(() => {
    if (!quest || quest.status !== 'active') return;
    
    const interval = setInterval(processTurn, GAME_CONSTANTS.TURN_DURATION);
    return () => clearInterval(interval);
  }, [quest, processTurn]);

  return {
    quest,
    processInteraction
  };
};