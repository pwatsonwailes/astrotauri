import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TutorialStep } from '../../types/tutorial';

interface TutorialOverlayProps {
  step: TutorialStep;
  onComplete: (stepId: string) => void;
  onSkip: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  step,
  onComplete,
  onSkip
}) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full mx-4 p-6 rounded-lg promontory pointer-events-auto"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-black">{step.title}</h3>
            <button
              onClick={onSkip}
              className="p-1 text-sm text-gray-400 hover:text-black transition-colors"
            >
              Skip all tutorials
            </button>
          </div>

          <p className="text-gray-300 mb-6">{step.description}</p>

          <div className="flex justify-between">
            <button
              onClick={() => onComplete(step.id)}
              className="px-4 py-2 convex rowdy text-white transition-colors"
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};