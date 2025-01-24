import React, { useState, useEffect } from 'react';
import { motion } from "motion/react"
import { marked } from 'marked';
import { StoryNode } from '../../../types/story';
import { useSettingsStore } from '../../../stores/useSettingsStore';
import { useTranslation } from '../../../hooks/useTranslation';

interface ParagraphNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const ParagraphNode: React.FC<ParagraphNodeProps> = ({ node, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const { textSize } = useSettingsStore();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, node.duration || 200);

    return () => clearTimeout(timer);
  }, [node.duration]);

  // Configure marked to only allow specific HTML tags
  marked.setOptions({
    headerIds: false,
    mangle: false
  });

  // Parse markdown to HTML
  const htmlContent = marked(node.text || '');

  return (
    <div className="relative max-w-2xl w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`prose prose-invert max-w-none ${
          textSize === 'large' ? 'text-lg' : 'text-base'
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="spacedButton mt-8 ml-auto mr-auto px-8 py-4 rounded-lg convex slate hover:rowdy text-white transition-colors"
        >
          {t.common.continue}
        </motion.button>
      )}
    </div>
  );
};