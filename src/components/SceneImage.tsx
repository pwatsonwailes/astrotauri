import React, { useState, useEffect } from 'react';
import { SceneState } from '../types/story';

import images from '../data/images';

interface SceneImageProps {
  scene: SceneState;
}

export const SceneImage: React.FC<SceneImageProps> = ({ scene }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading state when image changes
    setIsLoading(true);
    setIsImageVisible(false);
    
    // Get the image source
    const src = images[scene.image];
    
    if (!src) {
      console.warn(`Image not found: ${scene.image}`);
      setIsLoading(false);
      return;
    }
    
    // Preload the image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      
      // Add a small delay before showing the image to ensure smooth transition
      setTimeout(() => {
        setIsImageVisible(true);
      }, 100);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${scene.image}`);
      setIsLoading(false);
    };
  }, [scene.image]);

  return (
    <div className="screenImage relative w-full rounded-lg overflow-hidden bg-black/50 shadow-lg shadow-black/50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {imageSrc && (
        <img
          src={imageSrc}
          loading="lazy" 
          alt="Current scene"
          className={`transition-opacity duration-1000 ${isImageVisible ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => {
            // This is a backup to ensure the image is marked as loaded
            // even if the preload event didn't fire correctly
            setIsLoading(false);
            setTimeout(() => setIsImageVisible(true), 100);
          }}
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-wrap gap-3">
          {scene.presentCharacters.map((characterId) => {
            const isActive = scene.speakingCharacter === characterId;
            const isPresent = scene.presentCharacters.includes(characterId);
            
            return (
              <span
                key={characterId}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${isActive ? 'bg-red-500 text-white' : 
                    isPresent ? 'bg-blue-500 text-white' : 
                    'bg-gray-600 text-gray-300'}`}
              >
                {characterId}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};