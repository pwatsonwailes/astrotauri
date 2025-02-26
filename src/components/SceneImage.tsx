import React from 'react';
import { SceneState } from '../types/story';

interface SceneImageProps {
  scene: SceneState;
}

export const SceneImage: React.FC<SceneImageProps> = ({ scene }) => {
  return (
    <div className="screenImage relative w-full rounded-lg overflow-hidden bg-black/50 shadow-lg shadow-black/50">
      <img
        src={scene.image}
        alt="Current scene"
        className="transition-opacity duration-1000"
      />
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