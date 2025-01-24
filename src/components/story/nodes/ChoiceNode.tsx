import React from 'react';
import { StoryNode } from '../../../types/story';
import { useSettingsStore } from '../../../stores/useSettingsStore';

interface ChoiceNodeProps {
  node: StoryNode;
  onChoice: (choiceId: string, optionId: number) => void;
}

export const ChoiceNode: React.FC<ChoiceNodeProps> = ({ node, onChoice }) => {
  if (!node.id || !node.options) return null;

  const textSize = useSettingsStore(state => state.textSize);

  return (
    <div className="max-w-2xl w-full">
      <p className={`text-white mb-8 prose ${
        textSize === 'large' ? 'text-lg' : 'text-base'
      }`}>{node.text}</p>

      <ul className="options">
        {node.options.map((option, index) => (
          <li
            key={`option${index}`}
            onClick={() => onChoice(node.id!, index + 1)}
            className={`option ${
              textSize === 'large' ? 'text-lg' : 'text-base'
            }`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};