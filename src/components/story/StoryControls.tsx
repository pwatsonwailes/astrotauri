import React from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { Story } from 'inkjs/types';

interface StoryControlsProps {
  story: Story | null;
  choices: { text: string; index: number }[];
  onContinue: () => void;
  onChoice: (index: number) => void;
  onComplete: () => void;
}

export const StoryControls: React.FC<StoryControlsProps> = ({
  story,
  choices,
  onContinue,
  onChoice,
  onComplete
}) => {
  return (
    <div className="space-y-4 storyControls">
      {story && story.canContinue && (
        <button
          onClick={onContinue}
          className="continue text-white w-full flex items-center justify-center px-6 py-4 text-lg"
        >
          Continue
          <ArrowRight className="ml-2" size={20} />
        </button>
      )}

      {choices.length > 0 && (
        <div className="space-y-4">
          {choices.map((choice, index) => (
            <button
              key={`choice-${index}`}
              onClick={() => onChoice(choice.index)}
              className="choice w-full text-left px-6 py-4 text-lg opacity-100 translate-y-0"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {!story?.canContinue && choices.length === 0 && (
        <button
          onClick={onComplete}
          className="continue w-full flex items-center justify-center px-6 py-4 text-lg"
        >
          <Home className="mr-2" size={20} />
          Continue
        </button>
      )}
    </div>
  );
};