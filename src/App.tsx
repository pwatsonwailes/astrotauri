import React from 'react';
import { useGameStore } from './store/gameStore';
import { IntroScreen } from './components/IntroScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { StoryScreen } from './components/StoryScreen';
import { ShipHub } from './components/ShipHub';
import Prologue from './stories/main/c1/Prologue.ink?raw';

function App() {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const currentStory = useGameStore((state) => state.currentStory);

  return (
    <div className="min-h-screen bg-gray-900">
      {currentScreen === 'intro' && <IntroScreen />}
      {currentScreen === 'character-select' && <CharacterSelect />}
      {currentScreen === 'story' && <StoryScreen storyContent={currentStory || Prologue} />}
      {currentScreen === 'ship-hub' && <ShipHub />}
    </div>
  );
}

export default App;