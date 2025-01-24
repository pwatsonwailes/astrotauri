import React, { useState } from 'react';
import { X, Home, Settings, LogOut } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';

interface EscapeMenuProps {
  isOpen: boolean;
  setGameStarted: () => void;
  onClose: () => void;
}

export const EscapeMenu: React.FC<EscapeMenuProps> = ({ isOpen, setGameStarted, onClose }) => {
  const [showSettings, setShowSettings] = useState(false);

  if (!isOpen) return null;

  const handleReturnToMenu = () => {
    onClose()
    setGameStarted(false)
  };

  const handleQuit = () => {
    window.close();
  };

  return (
    <div className="fixed inset-0 creamyBg flex items-center justify-center">
      {showSettings ? (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      ) : (
        <div className="promontory rounded-lg p-6 w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-amber-600"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-black mt-0 mb-6">Menu</h2>

          <div className="space-y-4">
            <button
              onClick={handleReturnToMenu}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg convex slate hover:rowdy text-white"
            >
              <Home className="w-5 h-5" />
              Return to Main Menu
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg convex slate hover:rowdy text-white"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>

            <button
              onClick={handleQuit}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg convex lake hover:rowdy text-white"
            >
              <LogOut className="w-5 h-5" />
              Quit Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};