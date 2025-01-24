import React from 'react';
import { motion } from "motion/react"
import { Skull } from 'lucide-react';

interface GameOverProps {
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    >
      <div className="bg-gray-900 p-8 rounded-lg max-w-md text-center space-y-6">
        <Skull className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Game Over</h2>
        <p className="text-gray-300">
          Your condition has reached zero. Unable to maintain vital functions, your cybernetic systems have failed.
        </p>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );
};