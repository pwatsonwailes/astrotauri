import React, { useEffect } from 'react';
import { X, Home, Save, Settings, Volume2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';

interface EscapeMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EscapeMenu: React.FC<EscapeMenuProps> = ({ isOpen, onClose }) => {
  const { setScreen, saveGameState } = useGameStore();
  const { playSound } = useSoundSystem();

  // Handle ESC key to close the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleMainMenu = () => {
    playSound('navigation');
    saveGameState();
    setScreen('intro');
    onClose();
  };

  const handleSaveGame = () => {
    playSound('navigation');
    saveGameState();
    // Show a save confirmation message
    alert('Game saved successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Game Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={handleMainMenu}
            className="w-full flex items-center p-4 bg-slate-50 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-200"
          >
            <Home className="w-5 h-5 text-slate-600 mr-3" />
            <span className="font-medium text-slate-800">Return to Main Menu</span>
          </button>
          
          <button 
            className="w-full flex items-center p-4 bg-slate-50 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-200"
          >
            <Settings className="w-5 h-5 text-slate-600 mr-3" />
            <span className="font-medium text-slate-800">Settings</span>
          </button>
          
          <button 
            className="w-full flex items-center p-4 bg-slate-50 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-200"
          >
            <Volume2 className="w-5 h-5 text-slate-600 mr-3" />
            <span className="font-medium text-slate-800">Sound Options</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            Resume Game
          </button>
        </div>
      </div>
    </div>
  );
};