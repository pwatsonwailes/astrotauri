import React from 'react';
import { QuestInteraction as QuestInteractionType } from '../types/quest';
import { useQuestSystem } from '../hooks/useQuestSystem';

interface QuestInteractionProps {
  questId: string;
  interaction: QuestInteractionType;
}

export const QuestInteraction: React.FC<QuestInteractionProps> = ({
  questId,
  interaction
}) => {
  const { processInteraction } = useQuestSystem(questId);

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold">{interaction.prompt}</h3>
      
      <div className="space-y-2">
        {interaction.options.map((option, index) => (
          <button
            key={index}
            onClick={() => processInteraction(interaction, index)}
            className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <p className="font-medium">{option.text}</p>
            {option.cost && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(option.cost).map(([key, value]) => (
                  <span
                    key={key}
                    className="px-2 py-1 text-xs bg-red-900/50 text-red-300 rounded"
                  >
                    {key}: -{value}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};