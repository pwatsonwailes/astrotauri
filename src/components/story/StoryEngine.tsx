import { useCallback, useEffect, useRef, useState } from 'react';
import { Story, Compiler } from 'inkjs/types';
import { useGameStore } from '../../store/gameStore';
import { SceneState } from '../../types/story';

interface StoryEngineProps {
  storyContent: string;
  onStoryReady: (story: Story) => void;
  onParagraphsUpdate: (paragraphs: string[]) => void;
  onChoicesUpdate: (choices: { text: string; index: number }[]) => void;
  onSceneUpdate: (scene: SceneState) => void;
  onKnotUpdate: (knot: string | null) => void;
  onError: (error: string) => void;
}

export const StoryEngine: React.FC<StoryEngineProps> = ({
  storyContent,
  onStoryReady,
  onParagraphsUpdate,
  onChoicesUpdate,
  onSceneUpdate,
  onKnotUpdate,
  onError
}) => {
  const [story, setStory] = useState<Story | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentKnotState, setCurrentKnotState] = useState<string | null>(null);
  const processedTextsRef = useRef(new Set<string>());
  const { selectedCharacter, storyState, setStoryState } = useGameStore();

  // Initialize the story
  useEffect(() => {
    if (!storyContent || isInitialized) return;
    
    try {
      // Reset state if we don't have saved state
      if (!storyState || storyState.storyContent !== storyContent) {
        onParagraphsUpdate([]);
        onChoicesUpdate([]);
        processedTextsRef.current.clear();
        onKnotUpdate(null);
        setCurrentKnotState(null);
        
        // Compile the story
        const newStory = new Compiler(storyContent).Compile();
        
        // Set character class if available
        if (selectedCharacter?.id) {
          newStory.variablesState["character_class"] = selectedCharacter.id;
        }
        
        // Set up variable observers
        newStory.ObserveVariable('scene_image', (_: string, newValue: string) => {
          onSceneUpdate(prev => ({ ...prev, image: newValue }));
        });
        
        newStory.ObserveVariable('present_characters', (_: string, newValue: any) => {
          const characters = newValue.toString().split(", ");
          onSceneUpdate(prev => ({ ...prev, presentCharacters: characters }));
        });
        
        newStory.ObserveVariable('speaking_character', (_: string, newValue: string) => {
          onSceneUpdate(prev => ({ ...prev, speakingCharacter: newValue }));
        });
        
        // Get the initial content
        if (newStory.canContinue) {
          const initialText = newStory.Continue().trim();
          
          // Get the current path in the story
          const path = newStory.state.currentPathString;
          // Extract the knot name (everything before the first dot or the whole string)
          const knotName = path ? path.split('.')[0] : 'default';
          
          // Set initial knot state
          onKnotUpdate(knotName);
          setCurrentKnotState(knotName);
          onSceneUpdate(prev => ({ ...prev, currentKnot: knotName }));
          
          if (initialText) {
            onParagraphsUpdate([initialText]);
            processedTextsRef.current.add(initialText);
          }
        }
        
        setStory(newStory);
        onStoryReady(newStory);
        
        // Update choices if any
        if (newStory.currentChoices.length > 0) {
          onChoicesUpdate(newStory.currentChoices.map(choice => ({
            text: choice.text,
            index: choice.index
          })));
        }
      } else {
        // Restore from saved state
        const newStory = new Compiler(storyContent).Compile();
        
        // Set character class if available
        if (selectedCharacter?.id) {
          newStory.variablesState["character_class"] = selectedCharacter.id;
        }
        
        // Set up variable observers
        newStory.ObserveVariable('scene_image', (_: string, newValue: string) => {
          onSceneUpdate(prev => ({ ...prev, image: newValue }));
        });
        
        newStory.ObserveVariable('present_characters', (_: string, newValue: any) => {
          const characters = newValue.toString().split(", ");
          onSceneUpdate(prev => ({ ...prev, presentCharacters: characters }));
        });
        
        newStory.ObserveVariable('speaking_character', (_: string, newValue: string) => {
          onSceneUpdate(prev => ({ ...prev, speakingCharacter: newValue }));
        });
        
        // Restore story state
        if (storyState.storyJson) {
          newStory.state.LoadJson(storyState.storyJson);
        }
        
        // Restore other state
        onParagraphsUpdate(storyState.paragraphs || []);
        onChoicesUpdate(storyState.choices || []);
        onSceneUpdate(storyState.sceneState || {
          image: 'familyLife',
          presentCharacters: [],
          speakingCharacter: undefined,
          currentKnot: undefined,
        });
        onKnotUpdate(storyState.currentKnot || null);
        setCurrentKnotState(storyState.currentKnot || null);
        
        // Restore processed texts
        if (storyState.processedTexts) {
          processedTextsRef.current.clear();
          storyState.processedTexts.forEach((text: string) => processedTextsRef.current.add(text));
        }
        
        setStory(newStory);
        onStoryReady(newStory);
      }
      
      setIsInitialized(true);
    } catch (err) {
      console.error('Story compilation error:', err);
      onError('Failed to load the story. Please try again.');
    }
  }, [
    storyContent, 
    selectedCharacter, 
    storyState, 
    isInitialized,
    onParagraphsUpdate,
    onChoicesUpdate,
    onSceneUpdate,
    onKnotUpdate,
    onStoryReady,
    onError
  ]);

  // Save story state when component unmounts
  useEffect(() => {
    return () => {
      if (story) {
        try {
          const storyJson = story.state.ToJson();
          const processedTextsArray = Array.from(processedTextsRef.current);
          
          // Use direct function call to avoid React state updates during unmount
          const gameStore = useGameStore.getState();
          gameStore.setStoryState({
            storyContent,
            storyJson,
            paragraphs: gameStore.storyState?.paragraphs || [],
            choices: gameStore.storyState?.choices || [],
            sceneState: gameStore.storyState?.sceneState || {
              image: 'familyLife',
              presentCharacters: [],
              speakingCharacter: undefined,
              currentKnot: undefined,
            },
            currentKnot: gameStore.storyState?.currentKnot || null,
            processedTexts: processedTextsArray
          });
          
          // Call saveGameState directly to ensure the state is saved
          gameStore.saveGameState();
        } catch (error) {
          console.error("Error saving story state on unmount:", error);
        }
      }
    };
  }, [story, storyContent, setStoryState]);

  // Check if the next continuation will change the knot
  const willKnotChange = useCallback((currentStory: Story, currentKnot: string | null): boolean => {
    if (!currentStory || !currentStory.canContinue) return false;
    
    // Save current state
    const savedState = currentStory.state.ToJson();
    
    // Peek ahead by continuing and checking the path
    currentStory.Continue();
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
  }, []);

  // Continue the story
  const continueStory = useCallback(() => {
    if (!story || !story.canContinue) return;
    
    // Check if continuing will change the knot
    const knotWillChange = willKnotChange(story, currentKnotState);
    
    if (knotWillChange) {
      // Get the text before we lose it
      const text = story.Continue().trim();
      
      // Get the new knot name
      const path = story.state.currentPathString;
      const newKnotName = path ? path.split('.')[0] : 'default';
      
      // Update knot state
      onKnotUpdate(newKnotName);
      setCurrentKnotState(newKnotName);
      onSceneUpdate(prev => ({ ...prev, currentKnot: newKnotName }));
      
      // Clear previous paragraphs and start fresh with this text
      onParagraphsUpdate([text]);
      processedTextsRef.current.clear();
      processedTextsRef.current.add(text);
    } else {
      // Normal continuation within the same knot
      const text = story.Continue().trim();
      
      if (text && !processedTextsRef.current.has(text)) {
        processedTextsRef.current.add(text);
        onParagraphsUpdate(prev => [...prev, text]);
      }
    }
    
    // Update choices
    if (story.currentChoices.length > 0) {
      onChoicesUpdate(story.currentChoices.map(choice => ({
        text: choice.text,
        index: choice.index
      })));
    } else {
      onChoicesUpdate([]);
    }
    
    // Request a save after state updates have settled
    saveCurrentState();
  }, [
    story, 
    currentKnotState, 
    willKnotChange, 
    onKnotUpdate, 
    onSceneUpdate, 
    onParagraphsUpdate, 
    onChoicesUpdate
  ]);

  // Save current story state
  const saveCurrentState = useCallback(() => {
    if (!story) return;
    
    try {
      const storyJson = story.state.ToJson();
      const processedTextsArray = Array.from(processedTextsRef.current);
      
      setStoryState({
        storyContent,
        storyJson,
        paragraphs: [],  // These will be filled by the parent component
        choices: [],     // These will be filled by the parent component
        sceneState: {    // This will be filled by the parent component
          image: 'familyLife',
          presentCharacters: [],
          speakingCharacter: undefined,
          currentKnot: undefined,
        },
        currentKnot: null, // This will be filled by the parent component
        processedTexts: processedTextsArray
      });
    } catch (error) {
      console.error("Error saving story state:", error);
    }
  }, [story, storyContent, setStoryState]);

  // Make choice
  const makeChoice = useCallback((index: number) => {
    if (!story) return;
    
    // Clear choices
    onChoicesUpdate([]);
    
    // Choose the selected choice
    story.ChooseChoiceIndex(index);
    
    // Continue the story with awareness of knot changes
    continueStory();
  }, [story, continueStory, onChoicesUpdate]);

  // Expose methods to parent component
  useEffect(() => {
    if (story) {
      // Add the continue method to the story object
      const enhancedStory = story as Story & { continueStory?: () => void, makeChoice?: (index: number) => void };
      enhancedStory.continueStory = continueStory;
      enhancedStory.makeChoice = makeChoice;
      
      // The parent component can now access these methods
      onStoryReady(enhancedStory);
    }
  }, [story, continueStory, makeChoice, onStoryReady]);

  return null; // This is a logic-only component, no UI
};