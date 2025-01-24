import { useEffect } from 'react';
import { useGameStore } from '../stores/useGameStore';

export const useGameOver = () => {
  const condition = useGameStore(state => state.condition);
  const resetGame = useGameStore(state => state.resetGame);

  useEffect(() => {
    if (condition === 0) {
      resetGame();
    }
  }, [condition, resetGame]);

  return {
    isGameOver: condition === 0,
    handleRestart: resetGame
  };
};