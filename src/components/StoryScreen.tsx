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
  const [isInitialized, setIsInitialized] = useState(false);
  const [sceneState, setSceneState] = useState<SceneState>({
    image: 'familyLife',
    presentCharacters: [],
    speakingCharacter: undefined,
    currentKnot: undefined,
  });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const { selectedCharacter, setScreen, currentStory, setCurrentStory, addCompletedConversation } = useGameStore();
  const { getNextStory, getStoryByPath } = useStorySystem();
  const { playSound } = useSoundSystem();

  // Scroll to top when story changes or knot changes
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = 0;      
    }
  }, [sceneState.currentKnot]);

  // Scroll to bottom when new content is added within the same story
  useEffect(() => {
    if (textContainerRef.current && visibleParagraphs.length > 1) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [visibleParagraphs]);

  useEffect(() => {
    const initStory = () => {
      try {
        console.log("Initializing story with content:", storyContent.substring(0, 100) + "...");
        const newStory = new Compiler(storyContent).Compile();
        
        // Log the story structure to help with debugging
        console.log("Story structure:", newStory);
        
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
        
        // Get the knots from the story
        // The namedContent is a Map-like object where each entry is a key-value pair
        // We need to extract the keys from this structure
        const knotNames: string[] = [];
        
        // Access the mainContentContainer's namedContent
        if (newStory._mainContentContainer && newStory._mainContentContainer.namedContent) {
          // Iterate through the namedContent entries
          // Get the keys from the namedContent
          for (let [key, value] of newStory._mainContentContainer.namedContent.entries()) {
            if (key !== "global decl") {  // Skip global declarations
              knotNames.push(key);
            }
          }
          
          console.log("Found knots:", knotNames);
          
          // Start at the first knot if available
          if (knotNames.length > 0) {
            const firstKnot = knotNames[0];
            console.log("Starting at first knot:", firstKnot);
            
            // Check if the knot exists and is valid
            if (newStory.KnotContainerWithName(firstKnot)) {
              newStory.ChoosePathString(firstKnot);
            }
          }
        } else {
          console.warn("Could not find namedContent in story");
        }
        
        setStory(newStory);
        setError('');
        setIsInitialized(true);
      } catch (err) {
        console.error('Story compilation error:', err);
        setError('Failed to load the story. Please try again.');
      }
    };

    // Reset everything when loading a new story
    setCurrentParagraphs([]);
    setVisibleParagraphs([]);
    setChoices([]);
    setIsInitialized(false);
    setSceneState({
      image: 'familyLife',
      presentCharacters: [],
      speakingCharacter: undefined,
      currentKnot: undefined,
    });
    
    if (storyContent) {
      setTimeout(() => {
        initStory();
      }, 100); // Small delay to ensure clean initialization
    }
  }, [storyContent, selectedCharacter]);

  useEffect(() => {
    if (!story)
      return
    
    if (!story.canContinue) {
      setCurrentParagraphs(['The end of your journey...']);
      setVisibleParagraphs(['The end of your journey...']);
      setChoices([]);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const paragraphs: string[] = [];
    
    // Log the current state to help with debugging
    console.log("Story state:", story.state?.currentPathString);
    
    // Continue the story and collect paragraphs
    while (story.canContinue) {
      try {
        const text = story.Continue().trim();
        
        // Only add non-empty text to paragraphs
        if (text) {
          paragraphs.push(text);
        }
      } catch (err) {
        console.error("Error continuing story:", err);
        break;
      }
    }

    // Only update paragraphs if we have content
    if (paragraphs.length > 0) {
      console.log("Got paragraphs:", paragraphs);
      setCurrentParagraphs(paragraphs);
      setVisibleParagraphs([paragraphs[0]]);
      setIsNewContent(true);
    } else {
      console.log("No paragraphs found in story continuation");
      // If we have no paragraphs but have choices, show them
      if (currentStory.currentChoices.length > 0) {
        setCurrentParagraphs([" "]);  // Add a placeholder paragraph
        setVisibleParagraphs([" "]);
      }
    }

    const currentChoices = currentStory.currentChoices;
    console.log("Current choices:", currentChoices);

    if (currentChoices)
      setChoices(currentChoices.map(choice => choice.text));
  }, [ story ])
  
  // Function to check if the story has a divert
  const checkForDivert = (currentStory: Story): string | null => {
    // Check if we're at a divert point
    if (currentStory.state && currentStory.state.currentPathString) {
      const path = currentStory.state.currentPathString;
      if (path.includes('->')) {
        // Extract the target from the path
        const match = path.match(/->\s*([A-Za-z0-9_]+)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    
    // Check for tags that might indicate a divert
    const tags = currentStory.currentTags;
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        if (tag.startsWith('DIVERT:')) {
          return tag.substring(7).trim();
        }
      }
    }
    
    return null;
  };
  
  // Handle a divert by loading the target story
  const handleDivert = (target: string) => {
    playSound('continue');
    console.log("Handling divert to:", target);
    
    // First check if this is an internal knot
    if (story && story.KnotContainerWithName(target)) {
      console.log("Found internal knot:", target);
      // It's an internal knot, so just navigate to it
      story.ChoosePathString(target);
      
      // Reset paragraphs for the new knot
      setCurrentParagraphs([]);
      setVisibleParagraphs([]);
      setChoices([]);
      
      // Continue the story from the new knot
      setStory(story);
      return;
    }
    
    // If not an internal knot, it's an external story
    console.log("Looking for external story:", target);
    
    // Mark current story as completed
    if (currentStory) {
      addCompletedConversation(currentStory);
    }
    
    // Try to find the story by its path/id
    const nextStory = getStoryByPath(target);
    
    if (nextStory) {
      console.log("Found external story:", nextStory.id);
      // Load the diverted story - this will trigger a complete refresh of the view
      setCurrentStory(nextStory.content);
      addCompletedConversation(nextStory.id);
    } else {
      console.log("Could not find story for target:", target);
      // If we can't find the exact target, try to get the next story in sequence
      const fallbackStory = getNextStory(currentStory || '');
      
      if (fallbackStory) {
        console.log("Using fallback story:", fallbackStory.id);
        setCurrentStory(fallbackStory.content);
        addCompletedConversation(fallbackStory.id);
      } else {
        console.log("No fallback story found, returning to ship hub");
        // If all else fails, return to ship hub
        setScreen('ship-hub');
      }
    }
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
      setStory(story);
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

  // Loading state
  if (!isInitialized && !error) {
    return (
      <div className="min-h-screen creamyBg text-black p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading story...</p>
        </div>
      </div>
    );
  }

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
              className="continue text-white w-full flex items-center justify-center px-6 py-4 text-lg"
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