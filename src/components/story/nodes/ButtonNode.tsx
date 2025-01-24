import React from 'react';
import { motion } from "motion/react"
import { StoryNode } from '../../../types/story';
import { useTranslation } from '../../../hooks/useTranslation';

interface ButtonNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const ButtonNode: React.FC<ButtonNodeProps> = ({ node, onComplete }) => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onComplete}
        className="spacedButton px-8 py-3 convex slate hover:rowdy rounded-lg text-white text-lg font-semibold transition-colors"
      >
        {node.text || t.common.continue}
      </motion.button>
    </div>
  );
};