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
  const [currentKnot, setCurrentKnot] = useState<string | null>(null);
  const [processedTexts] = useState(new Set<string>());

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
      
      // Reset state
      setParagraphs([]);
      setChoices([]);
      processedTexts.clear();
      setCurrentKnot(null);
      
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
      
      // Get the initial content
      if (newStory.canContinue) {
        const initialText = newStory.Continue().trim();
        
        // Get the current path in the story
        const path = newStory.state.currentPathString;
        // Extract the knot name (everything before the first dot or the whole string)
        const knotName = path ? path.split('.')[0] : 'default';
        
        // Set initial knot state
        setCurrentKnot(knotName);
        setSceneState(prev => ({ ...prev, currentKnot: knotName }));
        
        if (initialText) {
          setParagraphs([initialText]);
          processedTexts.add(initialText);
        }
      }
      
      setStory(newStory);
      setError('');
      setIsLoading(false);
      
      // Update choices if any
      if (newStory.currentChoices.length > 0) {
        setChoices(newStory.currentChoices.map(choice => ({
          text: choice.text,
          index: choice.index
        })));
      }
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

  // Check if the next continuation will change the knot
  const willKnotChange = (currentStory: Story): boolean => {
    if (!currentStory || !currentStory.canContinue) return false;
    
    // Save current state
    const savedState = currentStory.state.ToJson();
    
    // Peek ahead by continuing and checking the path
    const text = currentStory.Continue();
    const path = currentStory.state.currentPathString;
    
    // Handle null path
    if (!path) {
      // Restore state
      currentStory.state.LoadJson(savedState);
      return false;
    }
    
    const newKnotName = path.split('.')[0];
    
    // Restore state
    currentStory.state.LoadJson(savedState);
    
    // Return whether the knot will change
    return newKnotName !== currentKnot;
  };

  // Continue the story
  const continueStory = () => {
    if (!story || !story.canContinue) return;
    
    // Play sound
    playSound('continue');
    
    // Check if continuing will change the knot
    const knotWillChange = willKnotChange(story);
    
    if (knotWillChange) {
      // Get the text before we lose it
      const text = story.Continue().trim();
      
      // Get the new knot name
      const path = story.state.currentPathString;
      const newKnotName = path ? path.split('.')[0] : 'default';
      
      // Update knot state
      setCurrentKnot(newKnotName);
      setSceneState(prev => ({ ...prev, currentKnot: newKnotName }));
      
      // Clear previous paragraphs and start fresh with this text
      setParagraphs([text]);
      processedTexts.clear();
      processedTexts.add(text);
    } else {
      // Normal continuation within the same knot
      const text = story.Continue().trim();
      
      if (text && !processedTexts.has(text)) {
        processedTexts.add(text);
        setParagraphs(prev => [...prev, text]);
      }
    }
    
    // Update choices
    if (story.currentChoices.length > 0) {
      setChoices(story.currentChoices.map(choice => ({
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
    
    // Continue the story with awareness of knot changes
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
              onClick={continueStory}
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