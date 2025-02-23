import React from 'react';
import { Play, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const IntroScreen: React.FC = () => {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <h1 className="text-6xl font-bold mb-8">The Chronicles</h1>
      <div className="space-y-4">
        <button
          onClick={() => setScreen('character-select')}
          className="flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          <Play className="mr-2" size={24} />
          New Game
        </button>
        <button
          onClick={() => window.close()}
          className="flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="mr-2" size={24} />
          Quit
        </button>
      </div>
    </div>
  );
};