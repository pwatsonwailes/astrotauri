import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../../stores/useStoryStore';
import { StoryNode } from '../../types/story';
import { storyChapters } from '../../data/story/chapters';

import { StoryTextPanel } from './StoryTextPanel';
import { GalleryNode } from './nodes/GalleryNode';
import { CharacterPanel } from './nodes/CharacterPanel';

import images from '../../data/images';

import { ViewType } from '../../components/navigation/ViewSelector.tsx';

interface StoryViewProps {
  applyTaskEffects: (effects: Array<{type: string, value: number}>) => void;
  handleViewChange: (view: ViewType) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  applyTaskEffects,
  handleViewChange
}) => {
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);

  // Story state
  const {
    currentChapterIndex,
    currentNodeIndex,
    currentImage,
    activeCharacters,
    makeChoice,
    advanceNode,
    completeChapter
  } = useStoryStore();

  useEffect(() => {
    const node = getCurrentNode();
    setCurrentNode(node);
  }, [currentChapterIndex, currentNodeIndex]);

  const getCurrentNode = (): StoryNode | null => {
    const chapter = storyChapters[currentChapterIndex];
    if (!chapter) return null;
    return chapter.nodes[currentNodeIndex] || null;
  };

  if (!currentNode) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl"></div>
      </div>
    );
  }

  // For gallery nodes, render full screen
  if (currentNode.type === 'gallery') {
    return (
      <div className="fixed inset-0 bg-black">
        <GalleryNode node={currentNode} onComplete={advanceNode} />
      </div>
    );
  }

  const hasMainPosition = activeCharacters.some(item => item.position === "main");
  const avatarCharacters = activeCharacters.filter(item => item.position === "avatar");

  // For all other nodes, render split view
  return (
    <div className="fixed inset-0 creamyBgPattern flex story">
      {/* Left Panel - Background and Characters */}
      <div className="w-2/3 relative">
        <AnimatePresence mode="wait">
          {currentImage && !hasMainPosition && (
            <motion.div
              key={`bg-${currentImage.src}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-lg promontory overflow-hidden"
            >
              <img 
                className="max-h-full" 
                src={images[currentImage.src]} 
                alt="Scene background"
              />
              {currentImage.title && currentImage.title.color && <span className="imageTitle font-bold" style={{ color: currentImage.title.color }}>{currentImage.title.text}</span>}
              {currentImage.title && !currentImage.title.color && <span className="imageTitle font-bold">{currentImage.title.text}</span>}
            </motion.div>
          )}
        </AnimatePresence>
      
        {hasMainPosition && <CharacterPanel characters={activeCharacters} />}

        {/* Avatar Card */}
        <div className="absolute top-6 right-4 space-y-4">
          <AnimatePresence>
            {avatarCharacters.map((character, index) => (
              <motion.div
                key={`${character.name}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }} // Stagger the animations
                className="rounded-lg creamyBg avatar"
              >
                <div>
                  <img src={images[character.src]} alt={character.name} />
                  <span>{character.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Story Text and Interactions */}
      <div className="w-1/3 textpanel flex flex-col z-10">
        <StoryTextPanel
          currentNode={currentNode}
          nodeIndex={currentNodeIndex}
          onChoice={makeChoice}
          onNext={advanceNode}
          handleViewChange={handleViewChange}
          onComplete={completeChapter}
          onTaskComplete={({ effects }) => {
            if (effects) {
              applyTaskEffects(effects);
            }
            advanceNode();
          }}
        />
      </div>
    </div>
  );
};
