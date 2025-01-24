import { useEffect } from 'react';
import { Game } from './components/Game';
import { useGameStore } from './stores/useGameStore';
import { useStoryStore } from './stores/useStoryStore';

export function App() {
  const initializeGame = useGameStore(state => state.initialize);
  const initializeStory = useStoryStore(state => state.initialize);

  useEffect(() => {
    initializeGame();
    initializeStory();
  }, [initializeGame, initializeStory]);

  return <Game />;
}