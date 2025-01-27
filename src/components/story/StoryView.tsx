import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '../../stores/useStoryStore';
import { useNarrativeStore } from '../../stores/useNarrativeStore';
import { StoryNode } from '../../types/story';
import { storyChapters } from '../../data/story/chapters';

import { MoteOverlay } from '../animations/MoteOverlay';
import { ImageStack } from '../animations/ImageStack';

import { StoryTextPanel } from './StoryTextPanel';
import { GalleryNode } from './nodes/GalleryNode';
import { CharacterPanel } from './nodes/CharacterPanel';

import images from '../../data/images';

import { ViewType } from '../navigation/ViewSelector';

interface StoryViewProps {
  applyTaskEffects: (effects: Array<{type: string, value: number}>) => void;
  handleViewChange: (view: ViewType) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  applyTaskEffects,
  handleViewChange
}) => {
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [persistentAnimation, setPersistentAnimation] = useState<{
    type: 'mote' | 'stack';
    config: any;
  } | null>(null);

  // Story state
  const {
    currentChapterIndex,
    currentNodeIndex,
    currentImage,
    persistentAnimation: savedPersistentAnimation,
    activeCharacters,
    temporaryNodes,
    makeChoice,
    advanceNode,
    completeChapter,
    updatePersistentAnimation
  } = useStoryStore();

  // Narrative state
  const { completeNarrative } = useNarrativeStore();

  useEffect(() => {
    const node = getCurrentNode();
    setCurrentNode(node);

    // Set initial persistent animation from saved state
    if (savedPersistentAnimation && !persistentAnimation) {
      setPersistentAnimation(savedPersistentAnimation);
    }

    // Handle animation persistence and modifications
    if (node?.media?.image?.animate) {
      const { type, config, persist, action, target } = node.media.image.animate;

      if (action) {
        // Handle stack modifications
        if (type === 'stack' && persistentAnimation?.type === 'stack') {
          const currentConfig = { ...persistentAnimation.config };
          
          switch (action) {
            case 'add':
              currentConfig.foregrounds = [...currentConfig.foregrounds, ...config.foregrounds];
              break;
            case 'remove':
              if (target) {
                currentConfig.foregrounds = currentConfig.foregrounds.filter(
                  img => img.src !== target
                );
              }
              break;
            case 'update':
              if (target) {
                currentConfig.foregrounds = currentConfig.foregrounds.map(img =>
                  img.src === target ? { ...img, ...config.foregrounds[0] } : img
                );
              }
              break;
            case 'clear':
              setPersistentAnimation(null);
              updatePersistentAnimation(null);
              return;
          }
          setPersistentAnimation({ type, config: currentConfig });
          updatePersistentAnimation({ type, config: currentConfig });
        }
      } else if (persist) {
        // Set new persistent animation
        setPersistentAnimation({ type, config });
        updatePersistentAnimation({ type, config });
      } else {
        // Clear persistent animation if new non-persistent animation
        setPersistentAnimation(null);
        updatePersistentAnimation(null);
      }
    }
  }, [currentChapterIndex, currentNodeIndex]);

  const getCurrentNode = (): StoryNode | null => {
    // If we're playing a narrative, use temporary nodes
    if (currentChapterIndex === -1 && temporaryNodes) {
      return temporaryNodes[currentNodeIndex] || null;
    }

    // Otherwise use regular story chapters
    const chapter = storyChapters[currentChapterIndex];
    if (!chapter) return null;
    return chapter.nodes[currentNodeIndex] || null;
  };

  const handleComplete = () => {
    // If we're in a narrative and at the last node
    if (currentChapterIndex === -1 && temporaryNodes) {
      if (currentNodeIndex >= temporaryNodes.length - 1) {
        // Complete the narrative and return to previous view
        completeNarrative(temporaryNodes[0].narrativeId!);
        handleViewChange('locations');
        return;
      }
    }

    // Otherwise complete chapter as normal
    completeChapter();
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

  // For all other nodes, render split view
  return (
    <div className="fixed inset-0 creamyBg flex story">
      {/* Left Panel - Background and Characters */}
      <div className="w-2/3 relative">
        <AnimatePresence mode="wait">
          {(currentNode?.media?.image?.animate || persistentAnimation) ? (
            <div key="animated" className="absolute inset-0 rounded-lg promontory overflow-hidden">
              {((currentNode?.media?.image?.animate?.type || persistentAnimation?.type) === 'mote') && (
                <MoteOverlay 
                  config={
                    currentNode?.media?.image?.animate?.config || 
                    persistentAnimation?.config
                  } 
                />
              )}
              {((currentNode?.media?.image?.animate?.type || persistentAnimation?.type) === 'stack') && (
                <ImageStack 
                  config={
                    currentNode?.media?.image?.animate?.config || 
                    persistentAnimation?.config
                  }
                />
              )}
            </div>
          ) : currentImage && !hasMainPosition ? (
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
          ) : null}
        </AnimatePresence>
      
        {hasMainPosition && <CharacterPanel characters={activeCharacters} />}
      </div>

      {/* Right Panel - Story Text and Interactions */}
      <div className="w-1/3 textpanel flex flex-col z-10">
        <StoryTextPanel
          currentNode={currentNode}
          nodeIndex={currentNodeIndex}
          onChoice={makeChoice}
          onNext={advanceNode}
          handleViewChange={handleViewChange}
          onComplete={handleComplete}
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