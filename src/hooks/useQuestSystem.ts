import { useCallback, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Resources, Alignment } from '../types/game';
import { Quest, QuestInteraction } from '../types/quest';
import { GAME_CONSTANTS } from '../constants/game';
import { alignmentModifiers } from '../data/characters';

export const useQuestSystem = (questId: string) => {
  const { activeQuests, updateQuest, updateResources, addInventoryItem, selectedCharacter } = useGameStore();
  const quest = activeQuests.find(q => q.id === questId);

  const hasRequirements = useCallback((requirements: Partial<Resources>) => {
    const resources = useGameStore.getState().resources;
    return Object.entries(requirements).every(
      ([key, value]) => resources[key as keyof Resources] >= (value || 0)
    );
  }, []);

  // Calculate stat bonuses based on character stats and alignment
  const calculateStatBonus = useCallback(() => {
    if (!selectedCharacter) return 0;
    
    const { stats, alignment } = selectedCharacter;
    const alignmentMod = alignmentModifiers[alignment as Alignment];
    
    // Base bonus from relevant stats
    let statBonus = 0;
    
    // Technical missions benefit from technical expertise
    if (quest?.type === 'technical') {
      statBonus += (stats.technicalExpertise - 5) * 0.2;
    }
    
    // Diplomatic missions benefit from diplomacy
    else if (quest?.type === 'diplomatic') {
      statBonus += (stats.diplomacy - 5) * 0.2;
      // Apply alignment diplomacy modifier
      statBonus *= alignmentMod.diplomacy;
    }
    
    // Combat/risky missions benefit from risk tolerance
    else if (quest?.type === 'combat' || quest?.riskLevel === 'high') {
      statBonus += (stats.riskTolerance - 5) * 0.2;
      // Apply alignment risk modifier
      statBonus *= alignmentMod.risk;
    }
    
    // All missions benefit from leadership
    statBonus += (stats.leadership - 5) * 0.1;
    
    // Strategic missions benefit from strategic intelligence
    if (quest?.type === 'strategic') {
      statBonus += (stats.strategicIntelligence - 5) * 0.2;
    }
    
    // Apply resilience modifier to smooth out negative events
    if (statBonus < 0) {
      statBonus *= (2 - alignmentMod.resilience);
    }
    
    return statBonus;
  }, [selectedCharacter, quest]);

  const processInteraction = useCallback((interaction: QuestInteraction, choice: number) => {
    if (!quest) return;

    const option = interaction.options[choice];
    if (option.cost && !hasRequirements({ credits: option.cost })) {
      return false;
    }

    if (option.cost) {
      updateResources({ credits: -option.cost });
    }

    // Apply character-specific bonuses to interaction choices
    let bonus = option.bonus;
    
    if (selectedCharacter) {
      const { alignment } = selectedCharacter;
      
      // Ruthless characters get more from aggressive options
      if (alignment === 'ruthless' && option.type === 'aggressive') {
        bonus *= 1.3;
      }
      
      // Noble characters get more from diplomatic options
      else if (alignment === 'noble' && option.type === 'diplomatic') {
        bonus *= 1.3;
      }
      
      // Stoic characters get more from cautious options
      else if (alignment === 'stoic' && option.type === 'cautious') {
        bonus *= 1.2;
      }
    }

    updateQuest(quest.id, {
      cumulativeScore: quest.cumulativeScore + bonus
    });

    return true;
  }, [quest, hasRequirements, updateQuest, updateResources, selectedCharacter]);

  const processTurn = useCallback(() => {
    if (!quest) return;

    const { currentTurn, duration, riskLevel } = quest;
    if (currentTurn >= duration) return;

    // Process random events and score updates
    const randomFactor = Math.random() * 2 - 1; // -1 to 1
    let turnScore = randomFactor * (
      riskLevel === 'high' ? 2 :
      riskLevel === 'medium' ? 1.5 : 1
    );
    
    // Apply character stat bonuses
    turnScore += calculateStatBonus();

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
  }, [quest, updateQuest, updateResources, addInventoryItem, calculateStatBonus]);

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