import React from 'react';
import { Play, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import coverImage from '../assets/imgs/cover.jpg';

export const IntroScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);
  const { playSound } = useSoundSystem();

  const handleNewGame = () => {
    playSound('newGame');
    setScreen('character-select');
  };

  return (
    <div 
      className="flex flex-row items-end justify-center min-h-screen text-white p-4 relative"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10">
        <div className="space-x-4 introButtons flex flex-row">
          <button onClick={handleNewGame} className='shadow-black shadow-sm hover:shadow-black hover:shadow-lg'>
            <Play className="mr-2" size={24} />
            New Game
          </button>
          <button onClick={() => window.close()} className='shadow-black shadow-sm hover:shadow-black hover:shadow-lg'>
            <X className="mr-2" size={24} />
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};