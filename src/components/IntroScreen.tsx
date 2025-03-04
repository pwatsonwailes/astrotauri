import React, { useState, useEffect } from 'react';
import { Play, X, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import coverImage from '../assets/imgs/cover.jpg';

export const IntroScreen: React.FC = () => {
  const { setScreen, loadGameState, hasExistingSave, resetGame } = useGameStore();
  const { playSound } = useSoundSystem();
  const [hasSave, setHasSave] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Check if there's a saved game when the component mounts
    const checkForSave = async () => {
      const saveExists = await hasExistingSave();
      setHasSave(saveExists);
    };
    
    checkForSave();

    // Preload the cover image
    const img = new Image();
    img.src = coverImage;
    img.onload = () => {
      setImageLoaded(true);
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    img.onerror = () => {
      console.error('Failed to load cover image');
      setIsLoading(false);
    };
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

  if (isLoading || !imageLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-end min-h-screen text-white p-4 relative transition-opacity duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="space-x-8 introButtons flex items-center">
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