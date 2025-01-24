import React, { useState, useCallback } from 'react';
import { motion } from "motion/react"
import { useStoryStore } from '../../stores/useStoryStore';
import { useGameStore } from '../../stores/useGameStore';
import { useTranslation } from '../../hooks/useTranslation';

interface CharacterCreationProps {
  setCurrentView: () => void;
}

export const CharacterCreation: React.FC<CharacterCreationProps> = ({ setCurrentView }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState<'He / Him' | 'She / Her' | 'They / Them'>('They / Them');

  const storyState = useStoryStore();
  const updateGameState = useGameStore(state => state.updatePlayerDetails);
  const { t } = useTranslation();

  const handleCharacterCreation = useCallback(async () => {
    updateGameState({
      firstName,
      lastName,
      pronouns
    });
    
    setCurrentView('goals');
  }, [firstName, lastName, pronouns, storyState, updateGameState, setCurrentView]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="promontory rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          {t.character.creation_title}
        </h2>
        
        <form onSubmit={handleCharacterCreation} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-base font-bold text-gray-600 mb-2">
                {t.character.first_name}
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-gray-700 text-base border border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-amber-400 hover:border-sky-400 focus:shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-base font-bold text-gray-600 mb-2">
                {t.character.last_name}
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-base border border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-amber-400 hover:border-sky-400 focus:shadow"
                required
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-600 mb-2">
                {t.character.pronouns}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['They / Them', 'He / Him', 'She / Her'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPronouns(option)}
                    className={`
                      px-4 py-2 text-sm font-normal
                      ${pronouns === option
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    {t.character.pronouns_option(option)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 convex slate rounded-lg text-white hover:rowdy transition-colors"
          >
            {t.common.continue}
          </button>
        </form>
      </motion.div>
    </div>
  );
};