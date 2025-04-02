import React, { useState, useCallback } from 'react';
import { Story } from 'inkjs/types';
import { useGameStore } from '../store/gameStore';
import { useStorySystem } from '../hooks/useStorySystem';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { useNexusSystem } from '../hooks/useNexusSystem';
import { SceneImage } from './SceneImage';
import { SceneState } from '../types/story';
import { StoryContent } from './story/StoryContent';
import { StoryControls } from './story/StoryControls';
import { StoryEngine } from './story/StoryEngine';
import { StoryLoader } from './story/StoryLoader';

interface StoryScreenProps {
  storyContent: string;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({ storyContent }) => {
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

  const { 
    setScreen, 
    setCurrentStory,
    addCompletedConversation,
    saveGameState
  } = useGameStore();
  const { handleNodeCompletion } = useNexusSystem();
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
    
    const enhancedStory = story as Story & { continueStory?: () => void };
    if (enhancedStory.continueStory) {
      enhancedStory.continueStory();
    }
  }, [story, playSound]);

  // Handle choice selection
  const handleChoice = useCallback((index: number) => {
    if (!story) return;
    playSound('choice');
    
    const enhancedStory = story as Story & { makeChoice?: (index: number) => void };
    if (enhancedStory.makeChoice) {
      enhancedStory.makeChoice(index);
    }
    
    saveGameState();
  }, [story, playSound, saveGameState]);

  // Handle story completion
  const handleStoryCompletion = useCallback(() => {
    playSound('complete');
    
    if (storyContent) {
      // Mark the story as completed in conversations
      addCompletedConversation(storyContent);
      
      // Get the node ID from the story content
      let nodeId = '';
      if (storyContent.includes('Prologue')) {
        nodeId = 'prologue';
      } else if (storyContent.includes('salvage-mission')) {
        nodeId = 'salvage-mission';
      }
      
      // Handle node completion if we have a valid node ID
      if (nodeId) {
        handleNodeCompletion(nodeId);
      }
      
      // Return to the nexus board
      setScreen('nexus');
    }
    
    saveGameState();
  }, [storyContent, playSound, addCompletedConversation, handleNodeCompletion, setScreen, saveGameState]);

  return (
    <>
      <StoryLoader 
        isLoading={isLoading} 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
      
      {!isLoading && !error && (
        <div className="min-h-screen creamyBg text-black flex">
          <div className="w-2/3 h-screen relative p-4">
            <SceneImage scene={sceneState} />
          </div>
          
          <div className="w-1/3 h-screen flex flex-col p-4">
            <StoryContent paragraphs={paragraphs} />

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