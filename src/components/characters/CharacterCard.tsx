import React from 'react';
import { motion } from "motion/react"
import { Character } from '../../types/characters';
import { Heart } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onSelect: () => void;
  isSelected: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect,
  isSelected
}) => {
  return (
    <motion.div
      onClick={onSelect}
      className={`
        bg-gray-800 rounded-lg p-4 cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-amber-500' : 'hover:bg-gray-700'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url(/imgs/cast/main/${character.image}.png)` }}
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{character.name}</h3>
          <p className="text-sm text-gray-400">{character.title}</p>
          <div className="flex items-center gap-1 mt-2">
            <Heart className={`w-4 h-4 ${getRelationshipColor(character.relationship)}`} />
            <span className="text-sm text-gray-400">
              {getRelationshipLabel(character.relationship)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getRelationshipColor = (value: number): string => {
  if (value >= 75) return 'text-green-400';
  if (value >= 25) return 'text-blue-400';
  if (value >= -25) return 'text-gray-400';
  if (value >= -75) return 'text-orange-400';
  return 'text-red-400';
};

const getRelationshipLabel = (value: number): string => {
  if (value >= 75) return 'Trusted';
  if (value >= 25) return 'Friendly';
  if (value >= -25) return 'Neutral';
  if (value >= -75) return 'Wary';
  return 'Hostile';
};