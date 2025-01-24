import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react"
import { CharacterArchetype, CHARACTER_ARCHETYPES } from '../../types/character';
import { SkillBar } from './SkillBar';
import { Shield, Eye, Lightbulb, Heart, Book, Brain } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface CharacterSelectProps {
  handleCharacterSelect: (character: CharacterArchetype) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ handleCharacterSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterArchetype | null>(CHARACTER_ARCHETYPES[0]);
  const { t } = useTranslation();

  const skillIcons = {
    negotiation: Brain,
    observation: Eye,
    improvisation: Lightbulb,
    fitness: Heart,
    knowledge: Book,
    stamina: Shield
  };

  return (
    <div className="min-h-screen creamyBgLighter p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          {t.character.select_title}
        </h2>
        
        <div className="flex">
          {/* Character List */}
          <div className="w-1/3 flex flex-col justify-center">
            {CHARACTER_ARCHETYPES.map(character => (
              <motion.button
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                className={`
                  relative convex rounded-lg p-4 text-lg font-bold text-white w-full mb-4
                  ${selectedCharacter?.id === character.id
                    ? 'rowdy'
                    : 'slate hover:lake'
                  }
                `}
                whileTap={{ scale: 0.98 }}
              >
                {t.character[character.id].name}
              </motion.button>
            ))}
          </div>

          {/* Character Details */}
          <AnimatePresence mode="wait">
            {selectedCharacter && (
              <motion.div
                key={selectedCharacter.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 space-y-6 w-2/3 flex flex-col"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">
                    {t.character[selectedCharacter.id].name}
                  </h2>
                  <p className="text-lg text-gray-700">
                    {t.character[selectedCharacter.id].title}
                  </p>
                  <p className="text-gray-600">
                    {t.character[selectedCharacter.id].description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-black">
                    {t.character.starting_skills}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedCharacter.skills).map(([skill, level]) => {
                      const Icon = skillIcons[skill as keyof typeof skillIcons];
                      return (
                        <SkillBar
                          key={skill}
                          name={t.skills[skill as keyof typeof t.skills]}
                          level={level}
                          icon={<Icon className="w-5 h-5" />}
                        />
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleCharacterSelect(selectedCharacter)}
                  className="px-6 py-3 convex rowdy rounded-lg mx-auto text-white font-semibold"
                >
                  {t.character.start_game}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};