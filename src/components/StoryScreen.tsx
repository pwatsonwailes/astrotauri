import React, { useState, useCallback } from 'react';
import { Story } from 'inkjs/types';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { SceneImage } from './SceneImage';
import { SceneState } from '../types/story';
import { StoryContent } from './story/StoryContent';
import { StoryControls } from './story/StoryControls';
import { StoryEngine } from './story/StoryEngine';
import { StoryLoader } from './story/StoryLoader';

interface StoryScreenProps {
  storyContent: string;
  onComplete?: () => void;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({ storyContent, onComplete }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [choices, setChoices] = useState<{ text: string; index: number }[]>([]);
  const [sceneCharacters, setSceneCharacters] = useState<string[]>([]);
  const [sceneState, setSceneState] = useState<SceneState>({
    image: 'familyLife',
    presentCharacters: [],
    speakingCharacter: undefined,
    currentKnot: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const { 
    setScreen, 
    setCurrentStory, 
    addCompletedConversation,
    saveGameState
  } = useGameStore();

  const { getNextStory } = useStorySystem();
  const { playSound } = useSoundSystem();

  // Handle story ready
  const handleStoryReady = useCallback((newStory: Story) => {
    setStory(newStory);
    setIsLoading(false);
  }, []);

  // Continue the story
  const handleContinue = useCallback(() => {
    if (!story) return;
    playSound('continue');
    
    // Call the continue method on the enhanced story object
    const enhancedStory = story as Story & { continueStory?: () => void };
    if (enhancedStory.continueStory) {
      enhancedStory.continueStory();
    }
  }, [story, playSound]);

  // Handle choice selection
  const handleChoice = useCallback((index: number) => {
    if (!story) return;
    playSound('choice');
    
    // Call the makeChoice method on the enhanced story object
    const enhancedStory = story as Story & { makeChoice?: (index: number) => void };
    if (enhancedStory.makeChoice) {
      enhancedStory.makeChoice(index);
    }
    
    // Save the game state after making a choice
    saveGameState();
  }, [story, playSound, saveGameState]);

  // Handle story completion
  const handleStoryCompletion = useCallback(() => {
    playSound('complete');
    
    if (storyContent) {
      const currentStoryId = story.state.currentPathString?.split('.')[0];
      if (currentStoryId) {
        addCompletedConversation(currentStoryId);
      }
      
      // Get the next story in sequence if one exists
      const nextStory = getNextStory(storyContent);
      
      if (nextStory) {
        // If there's a next story, load it immediately
        setCurrentStory(nextStory.content);
      }
    } else {
      setScreen('dossier');
    }

    const handleSceneCharactersUpdate = (characters: string[]) => {
      setSceneCharacters(characters);
      setSceneState(prevState => ({ ...prevState, presentCharacters: characters }));
      console.log("StoryScreen: Scene characters updated:", characters);
    };
    
    if (onComplete) {
      onComplete();
    }
    
    // Save game state after completing the story
    saveGameState();
  }, [
    storyContent, 
    playSound, 
    addCompletedConversation, 
    getNextStory, 
    setCurrentStory, 
    setScreen, 
    onComplete, 
    saveGameState
  ]);

  return (
    <>
      <StoryLoader 
        isLoading={isLoading} 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
      
      {!isLoading && !error && (
        <div className="min-h-screen creamyBg text-black flex">
          {/* Left side - Image (2/3 width) */}
          <div className="w-2/3 h-screen relative p-4">
            <SceneImage scene={sceneState} />
          </div>
          
          {/* Right side - Text and Controls (1/3 width) */}
          <div className="w-1/3 h-screen flex flex-col p-4">
            {/* Scrollable text area */}
            <StoryContent paragraphs={paragraphs} />

            {/* Controls */}
            <StoryControls 
              story={story}
              choices={choices}
              onContinue={handleContinue}
              onChoice={handleChoice}
              onComplete={handleStoryCompletion}
            />
          </div>
        </div>
      )}
      
      {/* Story Engine - Logic only component */}
      <StoryEngine 
        storyContent={storyContent}
        onStoryReady={handleStoryReady}
        onParagraphsUpdate={setParagraphs}
        onChoicesUpdate={setChoices}
        onSceneUpdate={setSceneState}
        onError={setError}
      />
    </>
  );
};