import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { QuestInteraction as QuestInteractionType } from '../types/quest';

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
      {completionNotice && (
        <div
          className={`p-4 rounded-lg mb-4 transition-all duration-500 ${
            completionNotice.status === 'completed'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {completionNotice.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
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
            className="bg-slate-50 rounded-lg p-4 space-y-4 border border-slate-200 mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(quest.status)}
                <h3 className="font-medium text-slate-800">{quest.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quest.type === 'technical' ? 'bg-blue-100 text-blue-800' :
                  quest.type === 'diplomatic' ? 'bg-green-100 text-green-800' :
                  quest.type === 'combat' ? 'bg-red-100 text-red-800' :
                  quest.type === 'strategic' ? 'bg-purple-100 text-purple-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {quest.type}
                </span>
                <span className="text-sm text-slate-600">
                  Turn {quest.currentTurn}/{quest.duration}
                </span>
              </div>
            </div>
            
            {currentDialogue && (
              <div className="bg-slate-100 rounded p-3 text-sm text-slate-700">
                {currentDialogue}
              </div>
            )}
            
            {currentInteraction && !hasInteractionChoice && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">{currentInteraction.prompt}</p>
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
                            ? 'bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-200'
                            : 'bg-slate-100 cursor-not-allowed text-slate-500 border border-slate-200'
                        }`}
                        disabled={!canUse}
                      >
                        <p className="font-medium mb-1 text-slate-800">{option.text}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {option.type === 'resource' && option.cost && (
                            <span className="text-red-700 px-2 py-1 bg-red-50 rounded-full text-xs">
                              Cost: {option.cost} credits
                            </span>
                          )}
                          {option.type === 'time' && option.extraTurn && (
                            <span className="text-amber-700 px-2 py-1 bg-amber-50 rounded-full text-xs">
                              +{option.extraTurn} turn
                            </span>
                          )}
                          {option.type === 'item' && option.requiredItem && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              canUse ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                              Requires: {option.requiredItem}
                            </span>
                          )}
                          <span className="text-blue-700 px-2 py-1 bg-blue-50 rounded-full text-xs">
                            Bonus: +{adjustedBonus}
                          </span>
                          {selectedCharacter && (
                            option.type === 'aggressive' && selectedCharacter.alignment === 'ruthless' ||
                            option.type === 'diplomatic' && selectedCharacter.alignment === 'noble' ||
                            option.type === 'cautious' && selectedCharacter.alignment === 'stoic'
                          ) && (
                            <span className="text-purple-700 px-2 py-1 bg-purple-50 rounded-full text-xs">
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
              <div className="bg-slate-100 rounded p-3">
                <p className="text-sm text-slate-600">
                  Choice made: {currentInteraction.options[interactionChoices[quest.id]].text}
                </p>
              </div>
            )}
            
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${quest.progress}%` }}
              />
            </div>
          </div>
        );
      })}

      {visibleQuests.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50 text-slate-400" />
          <p>No active quests</p>
          <p className="text-sm mt-2">Visit the Bridge to start a new mission</p>
        </div>
      )}
    </div>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Clock className="w-5 h-5 text-blue-600" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return <AlertTriangle className="w-5 h-5 text-amber-600" />;
  }
};