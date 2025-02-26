import React, { useEffect, useState, useRef } from 'react';
import { Story, Compiler } from 'inkjs/types';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { ArrowRight, Home } from 'lucide-react';
import { SceneImage } from './SceneImage';
import { SceneState } from '../types/story';

interface StoryScreenProps {
  storyContent: string;
  onComplete?: () => void;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({ storyContent, onComplete }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [currentParagraphs, setCurrentParagraphs] = useState<string[]>([]);
  const [visibleParagraphs, setVisibleParagraphs] = useState<string[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isNewContent, setIsNewContent] = useState(true);
  const [sceneState, setSceneState] = useState<SceneState>({
    image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=1200&h=800&fit=crop',
    presentCharacters: [],
    speakingCharacter: undefined,
  });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const { selectedCharacter, setScreen, currentStory, setCurrentStory, addCompletedConversation } = useGameStore();
  const { getNextStory } = useStorySystem();
  const { playSound } = useSoundSystem();

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [visibleParagraphs]);

  useEffect(() => {
    const initStory = () => {
      try {
        const newStory = new Compiler(storyContent).Compile();
        
        newStory.variablesState["character_class"] = selectedCharacter?.id || "";
        
        newStory.ObserveVariable('scene_image', (varName: string, newValue: string) => {
          setSceneState(prev => ({ ...prev, image: newValue }));
        });
        
        newStory.ObserveVariable('present_characters', (varName: string, newValue: any) => {
          const characters = newValue.toString().split(", ");
          setSceneState(prev => ({ ...prev, presentCharacters: characters }));
        });
        
        newStory.ObserveVariable('speaking_character', (varName: string, newValue: string) => {
          setSceneState(prev => ({ ...prev, speakingCharacter: newValue }));
        });
        
        setStory(newStory);
        setError('');
        continueStory(newStory);
      } catch (err) {
        console.error('Story compilation error:', err);
        setError('Failed to load the story. Please try again.');
      }
    };

    initStory();
  }, [storyContent, selectedCharacter]);

  const continueStory = (currentStory: Story) => {
    if (!currentStory.canContinue && currentStory.currentChoices.length === 0) {
      setCurrentParagraphs(['The end of your journey...']);
      setVisibleParagraphs(['The end of your journey...']);
      setChoices([]);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const paragraphs: string[] = [];
    while (currentStory !== null && currentStory.canContinue) {
      const text = currentStory.Continue()!.trim();
      if (text) {
        paragraphs.push(text);
      }
    }

    setCurrentParagraphs(paragraphs);
    setVisibleParagraphs([paragraphs[0]]);
    setIsNewContent(true);

    const currentChoices = currentStory.currentChoices;
    setChoices(currentChoices.map(choice => choice.text));
  };

  const showNextParagraph = () => {
    if (visibleParagraphs.length < currentParagraphs.length) {
      playSound('continue');
      setIsNewContent(true);
      setVisibleParagraphs(prev => 
        [...prev, currentParagraphs[visibleParagraphs.length]]
      );
    }
  };

  const makeChoice = (index: number) => {
    if (story) {
      playSound('choice');
      story.ChooseChoiceIndex(index);
      continueStory(story);
    }
  };

  const handleStoryCompletion = () => {
    playSound('complete');
    
    if (currentStory) {
      addCompletedConversation(currentStory);
      
      // Get the next story in sequence if one exists
      const nextStory = getNextStory(currentStory);
      
      if (nextStory) {
        // If there's a next story, load it immediately
        setCurrentStory(nextStory.content);
        addCompletedConversation(nextStory.id);
      } else {
        // If no next story, return to ship hub
        setScreen('ship-hub');
      }
    } else {
      setScreen('ship-hub');
    }
  };

  // Reset isNewContent after animation
  useEffect(() => {
    if (isNewContent) {
      const timer = setTimeout(() => {
        setIsNewContent(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isNewContent]);

  const showContinueButton = visibleParagraphs.length < currentParagraphs.length;
  const showChoices = visibleParagraphs.length === currentParagraphs.length && choices.length > 0;
  const showReturnButton = visibleParagraphs.length === currentParagraphs.length && choices.length === 0;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-8 flex items-center justify-center">
        <div className="bg-red-900/50 rounded-lg p-6 max-w-md text-center">
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left side - Image (2/3 width) */}
      <div className="w-2/3 h-screen relative p-4">
        <SceneImage scene={sceneState} />
      </div>
      
      {/* Right side - Text and Controls (1/3 width) */}
      <div className="w-1/3 h-screen flex flex-col p-6">
        {/* Character info */}
        <div className="flex items-center mb-6">
          <img
            src={selectedCharacter?.avatar}
            alt={selectedCharacter?.name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <h2 className="text-xl font-bold">{selectedCharacter?.name}</h2>
        </div>

        {/* Scrollable text area */}
        <div 
          ref={textContainerRef}
          className="flex-grow overflow-y-auto mb-6 pr-4 custom-scrollbar"
        >
          <div className="space-y-4">
            {visibleParagraphs.map((paragraph, index) => (
              <p 
                key={`${paragraph}-${index}`}
                className={`text-lg transition-opacity duration-500 ease-in-out
                  ${index === visibleParagraphs.length - 1 && isNewContent
                    ? 'opacity-0'
                    : 'opacity-100'
                  }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 storyControls">
          {showContinueButton && (
            <button
              onClick={showNextParagraph}
              className="continue w-full flex items-center justify-center px-6 py-4 text-lg"
            >
              Continue
              <ArrowRight className="ml-2" size={20} />
            </button>
          )}

          {showChoices && (
            <div className="space-y-4">
              {choices.map((choice, index) => (
                <button
                  key={choice}
                  onClick={() => makeChoice(index)}
                  className={`choice w-full text-left px-6 py-4 text-lg ${isNewContent ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}

          {showReturnButton && (
            <button
              onClick={handleStoryCompletion}
              className="continue w-full flex items-center justify-center px-6 py-4 text-lg"
            >
              <Home className="mr-2" size={20} />
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};