import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { useStoryStore } from '../stores/useStoryStore';
import { useEventStore } from '../stores/useEventStore';

import { ResourceBar } from './ResourceBar';
import { EventLog } from './EventLog';
import { FactionsView } from './views/FactionsView';
import { MarketView } from './views/MarketView';
import { StoryView } from './story/StoryView';
import { CharacterCreation } from './character/CharacterCreation';
import { ViewSelector } from './navigation/ViewSelector';
import { IntroScreen } from './intro/IntroScreen';
import { TutorialOverlay } from './tutorial/TutorialOverlay';
import { TutorialHighlight } from './tutorial/TutorialHighlight';
import { GoalsView } from './goals/GoalsView';
import { SkillsView } from './skills/SkillsView';
import { EndTurnButton } from './common/EndTurnButton';
import { LocationsView } from './views/LocationsView';
import { EscapeMenu } from './menu/EscapeMenu';
import { GameOver } from './GameOver';

import { storyChapters } from '../data/story/chapters';

import { useGameOver } from '../hooks/useGameOver';
import { useTutorial } from '../hooks/useTutorial';
import { useAudio } from '../hooks/useAudio';
import { useEscapeMenu } from '../hooks/useEscapeMenu';

import { CharacterArchetype } from '../types/character';

import { calculateMaxEnergy } from '../utils/energy';

export function Game() {
  const [gameStarted, setGameStarted] = useState(false);

  // Game state
  const {
    currentView,
    credits,
    condition,
    stress,
    energyPoints,
    reputation,
    isLoading: isGameLoading,
    updateView,
    endTurn,
    updateResources,
    resetGame
  } = useGameStore();

  // Story state
  const {
    currentChapterIndex,
    currentNodeIndex,
    currentMusic,
    isPlaying,
    isLoading: isStoryLoading,
  } = useStoryStore();

  // Events
  const { displayEvents } = useEventStore();

  const { tutorialState, getCurrentStep, completeStep, skipTutorial } = useTutorial();
  const { isMenuOpen, closeMenu } = useEscapeMenu();
  const { setTrack, setVolume } = useAudio();

  // Check if game is over (condition = 0)
  const { isGameOver } = useGameOver();

  useEffect(() => {
    setTrack('titles');
    setVolume(50);
  }, []);

  useEffect(() => {
    if (currentMusic?.track) {
      setTrack(currentMusic.track);
      setVolume(currentMusic.volume);
    }
  }, [ currentMusic ]);

  useEffect(() => {
    if (gameStarted && isPlaying) {
      const chapter = storyChapters[currentChapterIndex];
      const node = chapter?.nodes[currentNodeIndex];

      if (node?.media?.music) {
        setTrack(node.media.music.track);
        setVolume(node.media.music.volume);
      }
    }
  }, [currentChapterIndex, currentNodeIndex, isPlaying, gameStarted]);

  const handleTaskEffects = useCallback((effects) => {
    effects.forEach(effect => {
      updateResources({
        [effect.type]: effect.value
      });
    });
  }, [updateResources]);

  const handleIntroButton = (loadGame: boolean, character?: CharacterArchetype) => {
    if (loadGame) {
      setGameStarted(true);
    } else {
      resetGame(character);
      setGameStarted(true);

      if (currentView !== 'story') {
        updateView('story');
      }
    }
  };

  const handleRestart = () => {
    resetGame();
    setGameStarted(false);
    updateView('characterCreation');
  };

  // Loading state
  if (isGameLoading || isStoryLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Intro screen
  if (!gameStarted) {
    return (
      <IntroScreen
        onStartGame={handleIntroButton}
        gameState={useGameStore.getState()}
        storyState={useStoryStore.getState()}
        closeMenu={closeMenu}
      />
    );
  }

  if (isGameOver) {
    return <GameOver onRestart={handleRestart} />;
  }

  if (isMenuOpen) {
    return (
      <EscapeMenu
        isOpen={isMenuOpen}
        setGameStarted={setGameStarted}
        onClose={closeMenu}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'characterCreation':
        return <CharacterCreation setCurrentView={updateView} />;
      case 'story':
        return (
          <StoryView
            applyTaskEffects={handleTaskEffects}
            handleViewChange={updateView}
          />
        );
      case 'goals':
        return (
          <GoalsView />
        );
      case 'market':
        return <MarketView />;
      case 'locations':
        return (
          <LocationsView />
        );
      case 'factions':
        return (
          <FactionsView />
        );
      case 'skills':
        return <SkillsView />;
      default:
        return null;
    }
  };

  return (
    <div className="adjustedHeight creamyBg">
      <div className="mx-4">
        {currentView !== 'characterCreation' && currentView !== 'story' && (
          <div className="flex justify-between navbar">
            <ResourceBar
              credits={credits}
              condition={condition}
              stress={stress}
              energyPoints={energyPoints}
              maxEnergy={calculateMaxEnergy(condition)}
              reputation={reputation}
            />

            <EndTurnButton onEndTurn={endTurn} />

            <ViewSelector
              currentView={currentView}
              onViewChange={updateView}
            />
          </div>
        )}

        {renderCurrentView()}
      </div>
      
      {displayEvents.length > 0 && (
        <EventLog displayEvents={displayEvents} />
      )}
      
      {currentView !== 'characterCreation' && currentView !== 'story' && tutorialState.isActive && getCurrentStep() && (
        <>
          <TutorialOverlay
            step={getCurrentStep()!}
            onComplete={completeStep}
            onSkip={skipTutorial}
          />
          {getCurrentStep()?.highlight && (
            <TutorialHighlight selector={getCurrentStep()!.highlight!} />
          )}
        </>
      )}
    </div>
  );
}