import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react"
import { useGameStore } from '../stores/useGameStore';
import { useStoryStore } from '../stores/useStoryStore';
import { useEventStore } from '../stores/useEventStore';
import { useAudio } from '../hooks/useAudio';
import { useEscapeMenu } from '../hooks/useEscapeMenu';
import { useGameOver } from '../hooks/useGameOver';

// Components
import { IntroScreen } from './intro/IntroScreen';
import { GameOver } from './GameOver';
import { EscapeMenu } from './menu/EscapeMenu';
import { MainGameUI } from './MainGameUI';
import { LoadingScreen } from './LoadingScreen';

export function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const { setTrack, setVolume } = useAudio();
  const { isMenuOpen, closeMenu } = useEscapeMenu();
  const { isGameOver, handleRestart } = useGameOver();

  // Game state
  const { 
    isLoading: isGameLoading,
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

  // Initialize audio
  useEffect(() => {
    setTrack('titles');
    setVolume(50);

    useGameStore.getState();
    useStoryStore.getState();
    useEventStore.getState();
  }, []);

  // Handle music changes
  useEffect(() => {
    if (!gameStarted) {
      setTrack('titles');
      setVolume(50);
    }
    else if (currentMusic?.track) {
      setTrack(currentMusic.track);
      setVolume(currentMusic.volume);
    }
  }, [currentMusic, gameStarted]);

  // Handle story music
  useEffect(() => {
    if (gameStarted && isPlaying && currentMusic?.track) {
      setTrack(currentMusic.track);
      setVolume(currentMusic.volume);
    }
  }, [currentChapterIndex, currentNodeIndex, isPlaying, gameStarted]);

  const handleIntroButton = (loadGame: boolean, character?: CharacterArchetype) => {
    if (loadGame) {
      setGameStarted(true);
    } else {
      resetGame(character);
      setGameStarted(true);
    }
  };

  const renderContent = () => {
    // Loading state
    if (isGameLoading || isStoryLoading) {
      return <LoadingScreen />;
    }

    // Intro screen
    if (!gameStarted) {
      return (
        <IntroScreen
          onStartGame={handleIntroButton}
          closeMenu={closeMenu}
        />
      );
    }

    // Game over state
    if (isGameOver) {
      return <GameOver onRestart={handleRestart} />;
    }

    // Menu state
    if (isMenuOpen) {
      return (
        <EscapeMenu
          isOpen={isMenuOpen}
          setGameStarted={setGameStarted}
          onClose={closeMenu}
        />
      );
    }

    // Main game UI
    return <MainGameUI />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${gameStarted}-${isGameOver}-${isMenuOpen}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}