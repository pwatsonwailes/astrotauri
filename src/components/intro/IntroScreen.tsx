import React, { useState } from 'react';
import { CharacterSelect } from '../character/CharacterSelect';
import { CharacterArchetype } from '../../types/character';
import { Settings } from 'lucide-react';
import { SettingsPanel } from '../menu/SettingsPanel';
import { useTranslation } from '../../hooks/useTranslation';

import { GameState } from '../../types/game';
import { StoryState } from '../../types/story';

import images from '../../data/images';

interface IntroScreenProps {
  onStartGame: (loadGame: boolean, character?: CharacterArchetype) => void;
  gameState: GameState;
  storyState: StoryState;
  closeMenu: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ 
  onStartGame, 
  gameState, 
  storyState,
  closeMenu 
}) => {
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const gameInProgress = gameState || storyState;
  const { t } = useTranslation();

  const handleGameStart = (loadGame: boolean) => {
    if (loadGame) {
      onStartGame(true);
      closeMenu();
    } else {
      setShowCharacterSelect(true);
    }
  };

  const handleCharacterSelect = (character: CharacterArchetype) => {
    onStartGame(false, character);
  };

  if (showSettings) {
    return (
      <div className="min-h-screen creamyBg flex items-center justify-center">
        <SettingsPanel onClose={() => setShowSettings(false)} />
      </div>
    );
  }

  if (showCharacterSelect) {
    return <CharacterSelect handleCharacterSelect={handleCharacterSelect} />;
  }

  return (
    <div className="min-h-screen creamyBg text-white intro">
      <img src={images.cover} height="720" width="auto" className='introBG' />

      <button 
        onClick={() => setShowSettings(true)}
        className='settings rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors'
        aria-label={t.menu.settings}
      >
        {t.menu.settings}
      </button>
      
      {gameInProgress && (
        <button 
          className='load rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors' 
          onClick={() => handleGameStart(true)}
        >
          {t.menu.load_game}
        </button>
      )}
      
      <button 
        className='new rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors' 
        onClick={() => handleGameStart(false)}
      >
        {t.menu.new_game}
      </button>
    </div>
  );
};