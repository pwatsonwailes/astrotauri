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
  onError: (error: string) => void;
}

export const StoryEngine: React.FC<StoryEngineProps> = ({
  storyContent,
  onStoryReady,
  onParagraphsUpdate,
  onChoicesUpdate,
  onSceneUpdate,
  onError
}) => {
  const [story, setStory] = useState<Story | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentKnot, setCurrentKnot] = useState<string | undefined>(undefined);
  const processedTextsRef = useRef(new Set<string>());
  const paragraphsRef = useRef<string[]>([]);
  const { selectedCharacter, storyState, setStoryState } = useGameStore();
  const sceneStateRef = useRef<SceneState>({
    image: 'familyLife',
    presentCharacters: [],
    speakingCharacter: undefined,
    currentKnot: undefined,
  });

  // Initialize the story
  useEffect(() => {
    if (!storyContent || isInitialized) return;
    
    try {
      // Check if story content is valid
      if (typeof storyContent !== 'string' || storyContent.trim() === '') {
        console.error('Invalid story content:', storyContent);
        onError('Invalid story content. Please try again.');
        return;
      }
      
      // Reset state if we don't have saved state
      if (!storyState || storyState.storyContent !== storyContent) {
        onParagraphsUpdate([]);
        onChoicesUpdate([]);
        processedTextsRef.current.clear();
        paragraphsRef.current = [];
        setCurrentKnot(undefined);
        
        // Compile the story
        const newStory = new Compiler(storyContent).Compile();
        if (!newStory) {
          onError('Failed to compile story.');
          return;
        }
        
        // Set up variable observers
        newStory.ObserveVariable('scene_image', (_: string, newValue: string) => {
          const newState = { ...sceneStateRef.current, image: newValue };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        newStory.ObserveVariable('present_characters', (_: string, newValue: any) => {
          const characters = newValue.toString().split(", ");
          const newState = { ...sceneStateRef.current, presentCharacters: characters };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        newStory.ObserveVariable('speaking_character', (_: string, newValue: string) => {
          const newState = { ...sceneStateRef.current, speakingCharacter: newValue };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        // Get the initial content
        if (newStory?.canContinue && newStory?.state) {
          const initialText = newStory.Continue().trim();
          
          // Get the current path in the story
          const path = newStory.state.currentPathString;
          // Extract the knot name (everything before the first dot or the whole string)
          const knotName = path ? path.split('.')[0] : undefined;
          
          // Set initial knot state
          setCurrentKnot(knotName);
          const newState = { ...sceneStateRef.current, currentKnot: knotName };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
          
          if (initialText) {
            paragraphsRef.current = [initialText];
            onParagraphsUpdate(paragraphsRef.current);
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
        if (!newStory) {
          onError('Failed to compile story.');
          return;
        }
        
        // Set up variable observers
        newStory.ObserveVariable('scene_image', (_: string, newValue: string) => {
          const newState = { ...sceneStateRef.current, image: newValue };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        newStory.ObserveVariable('present_characters', (_: string, newValue: any) => {
          const characters = newValue.toString().split(", ");
          const newState = { ...sceneStateRef.current, presentCharacters: characters };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        newStory.ObserveVariable('speaking_character', (_: string, newValue: string) => {
          const newState = { ...sceneStateRef.current, speakingCharacter: newValue };
          sceneStateRef.current = newState;
          onSceneUpdate(newState);
        });
        
        // Restore story state
        if (storyState.storyJson) {
          newStory.state.LoadJson(storyState.storyJson);
        }
        
        // Restore other state
        paragraphsRef.current = storyState.paragraphs || [];
        onParagraphsUpdate(paragraphsRef.current);
        onChoicesUpdate(storyState.choices || []);
        const initialSceneState = {
          image: 'familyLife',
          presentCharacters: [],
          speakingCharacter: undefined,
          currentKnot: undefined,
        };
        sceneStateRef.current = initialSceneState;
        onSceneUpdate(initialSceneState);
        setCurrentKnot(storyState.currentKnot || undefined);
        
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
          
          setStoryState({
            storyContent,
            storyJson,
            paragraphs: paragraphsRef.current,
            choices: [],
            currentKnot: currentKnot || null,
            processedTexts: processedTextsArray
          });
        } catch (error) {
          console.error("Error saving story state on unmount:", error);
        }
      }
    };
  }, [story, storyContent, currentKnot, setStoryState]);

  // Check if the next continuation will change the knot
  const willKnotChange = useCallback((currentStory: Story, currentKnot: string | undefined): boolean => {
    if (!currentStory || !currentStory.canContinue) return false;
    
    // Save current state
    const savedState = currentStory.state.ToJson();
    
    // Peek ahead by continuing and checking the path
    if (currentStory?.state) {
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
    }
    return false;
  }, []);

  // Continue the story
  const continueStory = useCallback(() => {
    if (!story || !story.canContinue) return;
    
    // Check if continuing will change the knot
    const knotWillChange = willKnotChange(story, currentKnot);
    
    if (knotWillChange) {
      // Get the text before we lose it
      const text = story.Continue().trim();
      
      // Get the new knot name
      const path = story.state?.currentPathString;
      const newKnotName = path ? path.split('.')[0] : undefined;
      
      // Update knot state
      setCurrentKnot(newKnotName);
      const newState = { ...sceneStateRef.current, currentKnot: newKnotName };
      sceneStateRef.current = newState;
      onSceneUpdate(newState);
      
      // Clear previous paragraphs and start fresh with this text
      paragraphsRef.current = [text];
      onParagraphsUpdate(paragraphsRef.current);
      processedTextsRef.current.clear();
      processedTextsRef.current.add(text);
    } else {
      // Normal continuation within the same knot
      const text = story.Continue().trim();
      
      if (text && !processedTextsRef.current.has(text)) {
        processedTextsRef.current.add(text);
        paragraphsRef.current = [...paragraphsRef.current, text];
        onParagraphsUpdate(paragraphsRef.current);
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
  }, [story, currentKnot, willKnotChange, onParagraphsUpdate, onChoicesUpdate, onSceneUpdate]);

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

  // Add methods to the story object
  useEffect(() => {
    if (story) {
      (story as any).continueStory = continueStory;
      (story as any).makeChoice = makeChoice;
    }
  }, [story, continueStory, makeChoice]);

  return null;
};