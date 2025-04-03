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
    addNote,
    unlockNote,
    notes,
    saveGameState
  } = useGameStore();
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
      
      // Add choice to notes
      addNote({
        id: `choice-${Date.now()}`,
        title: 'Your Decision',
        content: choices[index].text,
        timestamp: Date.now(),
        isLocked: false,
        type: 'choice'
      });
    }
    
    saveGameState();
  }, [story, choices, playSound, addNote, saveGameState]);

  // Handle story completion
  const handleStoryCompletion = useCallback(() => {
    playSound('complete');
    
    if (storyContent) {
      // Mark the story as completed
      addCompletedConversation(storyContent);
      
      // Handle specific story completions
      if (storyContent.includes('Prologue')) {
        // Check if the mission note already exists
        const missionNoteExists = notes.some(note => note.id === 'prologue-mission');
        
        if (!missionNoteExists) {
          // Add the mission note after prologue
          addNote({
            id: 'prologue-mission',
            title: 'Mission from Aharon',
            content: 'Aharon has a special mission for the crew of the Prospector...',
            timestamp: Date.now(),
            isLocked: false,
            type: 'narrative',
            nextNoteId: 'mission-start'
          });
          
          // Unlock the mission note
          unlockNote('prologue-mission');
        }
      }
      
      // Return to the nexus board
      setScreen('nexus');
    }
    
    saveGameState();
  }, [storyContent, playSound, addCompletedConversation, addNote, unlockNote, notes, setScreen, saveGameState]);

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