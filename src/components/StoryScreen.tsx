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
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [choices, setChoices] = useState<{ text: string; index: number }[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [sceneState, setSceneState] = useState<SceneState>({
    image: 'familyLife',
    presentCharacters: [],
    speakingCharacter: undefined,
    currentKnot: undefined,
  });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const { selectedCharacter, setScreen, setCurrentStory, addCompletedConversation } = useGameStore();
  const { getNextStory } = useStorySystem();
  const { playSound } = useSoundSystem();

  // Initialize the story
  useEffect(() => {
    if (!storyContent) return;
    
    try {
      setIsLoading(true);
      console.log("Initializing story...");
      
      // Compile the story
      const newStory = new Compiler(storyContent).Compile();
      
      // Set character class if available
      if (selectedCharacter?.id) {
        newStory.variablesState["character_class"] = selectedCharacter.id;
      }
      
      // Set up variable observers
      newStory.ObserveVariable('scene_image', (_: string, newValue: string) => {
        setSceneState(prev => ({ ...prev, image: newValue }));
      });
      
      newStory.ObserveVariable('present_characters', (_: string, newValue: any) => {
        const characters = newValue.toString().split(", ");
        setSceneState(prev => ({ ...prev, presentCharacters: characters }));
      });
      
      newStory.ObserveVariable('speaking_character', (_: string, newValue: string) => {
        setSceneState(prev => ({ ...prev, speakingCharacter: newValue }));
      });
      
      setStory(newStory);
      setError('');
      setIsLoading(false);
      
      // Start the story
      continueStory(newStory);
    } catch (err) {
      console.error('Story compilation error:', err);
      setError('Failed to load the story. Please try again.');
      setIsLoading(false);
    }
  }, [storyContent, selectedCharacter]);

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (textContainerRef.current && paragraphs.length > 0) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [paragraphs]);

  // Continue the story and generate text
  const continueStory = (currentStory: Story | null = story) => {
    if (!currentStory) return;
    
    const newParagraphs: string[] = [];
    
    // Continue the story and collect paragraphs
    while (currentStory.canContinue) {
      try {
        const text = currentStory.Continue().trim();
        
        // Only add non-empty text to paragraphs
        if (text) {
          newParagraphs.push(text);
        }
      } catch (err) {
        console.error("Error continuing story:", err);
        break;
      }
    }
    
    // Update paragraphs
    if (newParagraphs.length > 0) {
      setParagraphs(prev => [...prev, ...newParagraphs]);
    }
    
    // Update choices
    if (currentStory.currentChoices.length > 0) {
      setChoices(currentStory.currentChoices.map(choice => ({
        text: choice.text,
        index: choice.index
      })));
    } else {
      setChoices([]);
    }
  };

  // Handle choice selection
  const makeChoice = (index: number) => {
    if (!story) return;
    
    playSound('choice');
    
    // Clear choices
    setChoices([]);
    
    // Choose the selected choice
    story.ChooseChoiceIndex(index);
    
    // Continue the story
    continueStory();
  };

  // Handle story completion
  const handleStoryCompletion = () => {
    playSound('complete');
    
    if (storyContent) {
      addCompletedConversation(storyContent);
      
      // Get the next story in sequence if one exists
      const nextStory = getNextStory(storyContent);
      
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
    
    if (onComplete) {
      onComplete();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen creamyBg text-black p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading story...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen creamyBg text-black p-8 flex items-center justify-center">
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
    <div className="min-h-screen creamyBg text-black flex">
      {/* Left side - Image (2/3 width) */}
      <div className="w-2/3 h-screen relative p-4">
        <SceneImage scene={sceneState} />
      </div>
      
      {/* Right side - Text and Controls (1/3 width) */}
      <div className="w-1/3 h-screen flex flex-col p-4">
        {/* Scrollable text area */}
        <div 
          ref={textContainerRef}
          className="flex-grow overflow-y-auto mb-6 p-4 custom-scrollbar textPanel"
        >
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={`paragraph-${index}`}
                className="text-lg transition-opacity duration-500 ease-in-out opacity-100"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 storyControls">
          {story && story.canContinue && (
            <button
              onClick={() => continueStory()}
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
                  onClick={() => makeChoice(choice.index)}
                  className="choice w-full text-left px-6 py-4 text-lg opacity-100 translate-y-0"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {!story?.canContinue && choices.length === 0 && (
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