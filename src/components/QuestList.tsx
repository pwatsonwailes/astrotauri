import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Clock, AlertTriangle, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { QuestInteraction as QuestInteractionType } from '../types/game';
import { alignmentModifiers } from '../data/characters';

export const QuestList: React.FC = () => {
  const { activeQuests, resources, inventory, updateResources, updateQuest, selectedCharacter } = useGameStore();
  const [completionNotice, setCompletionNotice] = React.useState<{
    questName: string;
    status: 'completed' | 'failed';
    narrative: string;
  } | null>(null);

  const [interactionChoices, setInteractionChoices] = React.useState<Record<string, number>>({});

  // Filter out completed quests after a delay
  React.useEffect(() => {
    const completedQuest = activeQuests.find(
      quest => (quest.status === 'completed' || quest.status === 'failed') && 
      !completionNotice
    );

    if (completedQuest) {
      setCompletionNotice({
        questName: completedQuest.name,
        status: completedQuest.status as 'completed' | 'failed',
        narrative: completedQuest.narrativeOutcomes[
          completedQuest.status === 'completed' ? 'success' : 'failure'
        ]
      });

      // Clear the notification after 5 seconds
      const timer = setTimeout(() => {
        setCompletionNotice(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeQuests, completionNotice]);

  const canUseOption = (option: QuestInteractionType['options'][0]) => {
    if (option.type === 'resource') {
      return resources.credits >= (option.cost || 0);
    } else if (option.type === 'item') {
      return inventory.some(item => item.id === option.requiredItem);
    }
    return true;
  };

  const getOptionBonus = (option: QuestInteractionType['options'][0], questType: string) => {
    if (!selectedCharacter) return option.bonus;
    
    let bonus = option.bonus;
    const { alignment, stats } = selectedCharacter;
    
    // Apply alignment-specific bonuses
    if (option.type === 'aggressive' && alignment === 'ruthless') {
      bonus *= 1.3;
    } else if (option.type === 'diplomatic' && alignment === 'noble') {
      bonus *= 1.3;
    } else if (option.type === 'cautious' && alignment === 'stoic') {
      bonus *= 1.2;
    }
    
    // Apply stat bonuses based on quest type
    if (questType === 'technical' && option.type === 'resource') {
      bonus += (stats.technicalExpertise - 5) * 0.1;
    } else if (questType === 'diplomatic' && option.type === 'diplomatic') {
      bonus += (stats.diplomacy - 5) * 0.1;
    } else if (questType === 'combat' && option.type === 'aggressive') {
      bonus += (stats.riskTolerance - 5) * 0.1;
    }
    
    return parseFloat(bonus.toFixed(1));
  };

  const handleInteractionChoice = (
    questId: string,
    interaction: QuestInteractionType,
    optionIndex: number
  ) => {
    const option = interaction.options[optionIndex];
    const quest = activeQuests.find(q => q.id === questId);
    
    if (!quest || interactionChoices[questId]) return;

    // Apply costs
    if (option.type === 'resource' && option.cost) {
      updateResources({ credits: -option.cost });
    }

    // Calculate bonus with character stats and alignment
    const adjustedBonus = getOptionBonus(option, quest.type);

    // Update quest progress and mark interaction as used
    const updates: Partial<typeof quest> = {
      cumulativeScore: quest.cumulativeScore + adjustedBonus
    };

    // Add extra turn if specified
    if (option.type === 'time' && option.extraTurn) {
      updates.duration = quest.duration + option.extraTurn;
    }

    updateQuest(questId, updates);
    setInteractionChoices(prev => ({ ...prev, [questId]: optionIndex }));
  };

  const getQuestDialogue = (quest: typeof activeQuests[0]) => {
    const dialogue = quest.turnDialogues[quest.currentTurn];
    if (!dialogue) return null;

    const score = quest.cumulativeScore;
    if (score > 1) return dialogue.positive;
    if (score < -1) return dialogue.negative;
    return dialogue.neutral;
  };

  // Only show active quests
  const visibleQuests = activeQuests.filter(quest => quest.status === 'active');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Active Quests</h2>

      {completionNotice && (
        <div
          className={`p-4 rounded-lg mb-4 transition-all duration-500 ${
            completionNotice.status === 'completed'
              ? 'bg-green-900/50 text-green-300'
              : 'bg-red-900/50 text-red-300'
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {completionNotice.status === 'completed' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-medium">
              {completionNotice.status === 'completed' ? 'Completed: ' : 'Failed: '}
              {completionNotice.questName}
            </span>
          </div>
          <p className="text-sm">{completionNotice.narrative}</p>
        </div>
      )}

      {visibleQuests.map(quest => {
        const currentDialogue = getQuestDialogue(quest);
        const currentInteraction = quest.turnInteractions[quest.currentTurn];
        const hasInteractionChoice = interactionChoices[quest.id] !== undefined;

        return (
          <div
            key={quest.id}
            className="bg-gray-700/50 rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(quest.status)}
                <h3 className="font-medium">{quest.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  quest.type === 'technical' ? 'bg-blue-900/50 text-blue-300' :
                  quest.type === 'diplomatic' ? 'bg-green-900/50 text-green-300' :
                  quest.type === 'combat' ? 'bg-red-900/50 text-red-300' :
                  quest.type === 'strategic' ? 'bg-purple-900/50 text-purple-300' :
                  'bg-gray-900/50 text-gray-300'
                }`}>
                  {quest.type}
                </span>
                <span className="text-sm text-gray-300">
                  Turn {quest.currentTurn}/{quest.duration}
                </span>
              </div>
            </div>
            
            {currentDialogue && (
              <div className="bg-gray-800/50 rounded p-3 text-sm">
                {currentDialogue}
              </div>
            )}
            
            {currentInteraction && !hasInteractionChoice && (
              <div className="space-y-3">
                <p className="text-sm font-medium">{currentInteraction.prompt}</p>
                <div className="space-y-2">
                  {currentInteraction.options.map((option, index) => {
                    const canUse = canUseOption(option);
                    const adjustedBonus = getOptionBonus(option, quest.type);
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => canUse && handleInteractionChoice(
                          quest.id,
                          currentInteraction,
                          index
                        )}
                        className={`w-full text-left p-3 rounded ${
                          canUse
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-gray-800/50 cursor-not-allowed'
                        }`}
                        disabled={!canUse}
                      >
                        <p className="font-medium mb-1">{option.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {option.type === 'resource' && option.cost && (
                            <span className="text-red-300 px-2 py-1 bg-red-900/30 rounded">
                              Cost: {option.cost} credits
                            </span>
                          )}
                          {option.type === 'time' && option.extraTurn && (
                            <span className="text-yellow-300 px-2 py-1 bg-yellow-900/30 rounded">
                              +{option.extraTurn} turn
                            </span>
                          )}
                          {option.type === 'item' && option.requiredItem && (
                            <span className={`px-2 py-1 rounded ${
                              canUse ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                            }`}>
                              Requires: {option.requiredItem}
                            </span>
                          )}
                          <span className="text-blue-300 px-2 py-1 bg-blue-900/30 rounded">
                            Bonus: +{adjustedBonus}
                          </span>
                          {selectedCharacter && (
                            option.type === 'aggressive' && selectedCharacter.alignment === 'ruthless' ||
                            option.type === 'diplomatic' && selectedCharacter.alignment === 'noble' ||
                            option.type === 'cautious' && selectedCharacter.alignment === 'stoic'
                          ) && (
                            <span className="text-purple-300 px-2 py-1 bg-purple-900/30 rounded">
                              Alignment bonus
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentInteraction && hasInteractionChoice && (
              <div className="bg-gray-800/50 rounded p-3">
                <p className="text-sm text-gray-400">
                  Choice made: {currentInteraction.options[interactionChoices[quest.id]].description}
                </p>
              </div>
            )}
            
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${quest.progress}%` }}
              />
            </div>
          </div>
        );
      })}

      {visibleQuests.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No active quests</p>
        </div>
      )}
    </div>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Clock className="w-5 h-5 text-blue-400" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-400" />;
    default:
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
  }
};