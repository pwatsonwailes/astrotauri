import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryNode } from '../../../types/story';
import { useSettingsStore } from '../../../stores/useSettingsStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { MoteOverlay } from '../../animations/MoteOverlay';
import { ImageStack } from '../../animations/ImageStack';
import images from '../../../data/images';

interface GalleryNodeProps {
  node: StoryNode;
  onComplete: () => void;
}

export const GalleryNode: React.FC<GalleryNodeProps> = ({ node, onComplete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [persistentAnimation, setPersistentAnimation] = useState<{
    type: 'mote' | 'stack';
    config: any;
  } | null>(null);
  
  const nodeImages = node.media?.images || [];
  const textSize = useSettingsStore(state => state.textSize);
  const { t } = useTranslation();

  useEffect(() => {
    if (!nodeImages[currentImageIndex]) {
      onComplete();
      return;
    }

    const image = nodeImages[currentImageIndex];

    // Handle animation persistence and modifications
    if (image.animate) {
      const { type, config, persist, action, target } = image.animate;

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
              return;
          }
          setPersistentAnimation({ type, config: currentConfig });
        }
      } else if (persist) {
        // Set new persistent animation
        setPersistentAnimation({ type, config });
      } else {
        // Clear persistent animation if new non-persistent animation
        setPersistentAnimation(null);
      }
    }

    const timer = setTimeout(() => {
      if (currentImageIndex < nodeImages.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    }, (image.displayDuration || 5000) + (image.transitionDuration || 1000));

    return () => clearTimeout(timer);
  }, [currentImageIndex, nodeImages, onComplete]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {nodeImages[currentImageIndex] && (
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: (nodeImages[currentImageIndex].transitionDuration || 1000) / 1000
            }}
            className="absolute inset-0"
          >
            {(nodeImages[currentImageIndex].animate || persistentAnimation) ? (
              <div className="absolute inset-0">
                {((nodeImages[currentImageIndex].animate?.type || persistentAnimation?.type) === 'mote') && (
                  <MoteOverlay 
                    config={
                      nodeImages[currentImageIndex].animate?.config || 
                      persistentAnimation?.config
                    } 
                  />
                )}
                {((nodeImages[currentImageIndex].animate?.type || persistentAnimation?.type) === 'stack') && (
                  <ImageStack 
                    config={
                      nodeImages[currentImageIndex].animate?.config || 
                      persistentAnimation?.config
                    }
                  />
                )}
              </div>
            ) : (
              <img 
                src={images[nodeImages[currentImageIndex].src]} 
                className='galleryImg' 
              />
            )}

            {nodeImages[currentImageIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <p className={`text-white max-w-2xl mx-auto text-center ${
                  textSize === 'large' ? 'text-lg' : 'text-base'
                }`}>
                  {nodeImages[currentImageIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-lg bg-opacity-50 convex noShadow slate hover:bg-opacity-100 hover:rowdy text-white transition-colors z-50"
      >
        {t.common.skip}
      </button>
    </div>
  );
};