import React, { useState, useEffect } from 'react';
import { Play, X, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import coverImage from '../assets/imgs/cover.jpg';

export const IntroScreen: React.FC = () => {
  const { setScreen, loadGameState, hasExistingSave, resetGame } = useGameStore();
  const { playSound } = useSoundSystem();
  const [hasSave, setHasSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there's a saved game when the component mounts
    const checkForSave = async () => {
      const saveExists = await hasExistingSave();
      setHasSave(saveExists);
    };
    
    checkForSave();
  }, [hasExistingSave]);

  const handleNewGame = () => {
    playSound('newGame');
    resetGame(); // Reset the game state to ensure a fresh start
    setScreen('character-select');
  };

  const handleContinue = async () => {
    if (!hasSave) return;
    
    setIsLoading(true);
    playSound('navigation');
    
    try {
      const success = await loadGameState();
      if (!success) {
        console.error('Failed to load game');
        // Could show an error message to the user here
      }
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-end min-h-screen text-white p-4 relative"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute top-4 right-4 text-3xl font-bold text-white drop-shadow-lg">
        Astromine
      </div>
      
      <div className="relative z-10 mb-16 space-y-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="space-y-4 introButtons flex flex-col items-center">
          <button 
            onClick={handleNewGame} 
            className='shadow-black shadow-sm hover:shadow-black hover:shadow-lg w-64'
          >
            <Play className="mr-2" size={24} />
            New Game
          </button>
          
          <button 
            onClick={handleContinue} 
            className={`shadow-black shadow-sm hover:shadow-black hover:shadow-lg w-64 ${
              !hasSave ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!hasSave}
          >
            <RotateCcw className="mr-2" size={24} />
            Continue
          </button>
          
          <button 
            onClick={() => window.close()} 
            className='shadow-black shadow-sm hover:shadow-black hover:shadow-lg w-64'
          >
            <X className="mr-2" size={24} />
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};