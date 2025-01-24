import React from 'react';
import { Character } from '../../types/characters';
import { CharacterGoals } from './CharacterGoals';

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">{character.name}</h2>
        <p className="text-lg text-gray-300">{character.title}</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="prose prose-invert">
            <p>{character.description}</p>
          </div>

          <CharacterGoals 
            goals={character.goals} 
            relationship={character.relationship}
          />
        </div>
      </div>
    </div>
  );
};