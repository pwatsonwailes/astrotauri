import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StackedImageConfig } from '../../types/animations';
import { MoteOverlay } from './MoteOverlay';

import images from '../../data/images'

interface ImageStackProps {
  config: StackedImageConfig;
}

export const ImageStack: React.FC<ImageStackProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <motion.img
        src={images[config.background]}
        className="absolute w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ zIndex: 1 }}
      />
      
      {config.motes && (
        <div className="absolute inset-0" style={{ zIndex: config.motes.zIndex || 5 }}>
          <MoteOverlay config={config.motes} />
        </div>
      )}
      
      <AnimatePresence>
        {config.foregrounds.map((foreground, index) => {
          const rotationAnimation = foreground.infiniteRotation
            ? {
                rotate: [
                  foreground.initialRotation || 0,
                  foreground.infiniteRotation.clockwise !== false
                    ? 360
                    : -360
                ]
              }
            : {
                rotate: foreground.targetRotation || foreground.initialRotation || 0
              };

          const transition = foreground.infiniteRotation
            ? {
                duration: 360 / foreground.infiniteRotation.speed,
                repeat: Infinity,
                ease: "linear"
              }
            : {
                duration: foreground.duration || 1,
                ease: "easeInOut"
              };

          return (
            <motion.img
              key={foreground.src}
              src={images[foreground.src]}
              className="absolute foregroundImg"
              initial={{
                scale: foreground.initialScale || 1,
                opacity: foreground.initialOpacity ?? 1,
                x: foreground.position?.x ? `${foreground.position.x}%` : '50%',
                y: foreground.position?.y ? `${foreground.position.y}%` : '50%',
                rotate: foreground.initialRotation || 0
              }}
              animate={{
                scale: foreground.targetScale || 1,
                opacity: foreground.targetOpacity ?? 1,
                x: foreground.targetPosition?.x ? `${foreground.targetPosition.x}%` : '50%',
                y: foreground.targetPosition?.y ? `${foreground.targetPosition.y}%` : '50%',
                ...rotationAnimation
              }}
              transition={{
                duration: foreground.duration || 1,
                ease: "easeInOut",
                rotate: transition
              }}
              style={{
                zIndex: foreground.zIndex || index + 3, // Increased to account for motes
                transformOrigin: 'center center',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};