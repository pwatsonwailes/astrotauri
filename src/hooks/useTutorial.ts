import { useState, useCallback, useEffect } from 'react';
import { TutorialState, TutorialStep, TUTORIAL_STEPS } from '../types/tutorial';
import { StorageService } from '../services/storage';

export const useTutorial = () => {
  const [tutorialState, setTutorialState] = useState<TutorialState>({
    isActive: true,
    currentStepIndex: 0,
    completedSteps: new Set()
  });

  // Load tutorial state on mount
  useEffect(() => {
    const loadTutorialState = async () => {
      const savedState = await StorageService.loadTutorialState();
      if (savedState) {
        // Convert completedSteps back to a Set since it was serialized as an array
        setTutorialState({
          ...savedState,
          completedSteps: new Set(savedState.completedSteps)
        });
      }
    };
    loadTutorialState();
  }, []);

  const getCurrentStep = useCallback((): TutorialStep | null => {
    if (!tutorialState.isActive || tutorialState.currentStepIndex >= TUTORIAL_STEPS.length) {
      return null;
    }
    return TUTORIAL_STEPS[tutorialState.currentStepIndex];
  }, [tutorialState.isActive, tutorialState.currentStepIndex]);

  const completeStep = useCallback((stepId: string) => {
    setTutorialState(prev => {
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(stepId);

      const newState = {
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
        completedSteps: newCompleted,
        isActive: prev.currentStepIndex + 1 < TUTORIAL_STEPS.length
      };

      // Save tutorial state when completing a step
      StorageService.saveTutorialState({
        ...newState,
        completedSteps: Array.from(newCompleted) // Convert Set to array for storage
      });

      return newState;
    });
  }, []);

  const skipTutorial = useCallback(() => {
    const newState = {
      ...tutorialState,
      isActive: false,
      completedSteps: new Set(TUTORIAL_STEPS.map(step => step.id))
    };

    // Save tutorial state when skipping
    StorageService.saveTutorialState({
      ...newState,
      completedSteps: Array.from(newState.completedSteps)
    });

    setTutorialState(newState);
  }, [tutorialState]);

  return {
    tutorialState,
    getCurrentStep,
    completeStep,
    skipTutorial
  };
};