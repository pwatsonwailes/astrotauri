import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import images from '../../../data/images'

interface Character {
  name: string;
  src: string;
}

interface CharacterPanelProps {
  characters: Character[];
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({ characters }) => {
  return (
    <div className="p-6 mx-auto h-full w-full">
      <AnimatePresence mode="popLayout">
        {characters.length > 0 && characters.map(character => (
          <motion.div
            key={character.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="characterPanel"
          >
            <img src={images[character.src]} />
            <span className="characterText font-bold">{character.name}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};