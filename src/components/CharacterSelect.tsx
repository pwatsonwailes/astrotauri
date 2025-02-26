import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { characters } from '../data/characters';
import Prologue from '../stories/main/c1/Prologue.ink?raw';

import radial from '../assets/imgs/radial.jpg'

export const CharacterSelect: React.FC = () => {
  const { setScreen, setCharacter, setCurrentStory, addCompletedConversation } = useGameStore();
  const { playSound } = useSoundSystem();

  const selectCharacter = (characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (character) {
      playSound('select');
      setCharacter(character);
      setCurrentStory(Prologue);
      // Mark the initial story as completed
      addCompletedConversation('main_1');
      setScreen('story');
    }
  };

  const handleBack = () => {
    playSound('navigation');
    setScreen('intro');
  };

  return (
    <div
      className="min-h-screen creamyBg text-black p-8 characterScreen"
      style={{
        backgroundImage: `url(${radial})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
      <button
        onClick={handleBack}
        className="flex items-center text-slate-400 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2" size={24} />
        Back to Menu
      </button>
      
      <h2>Choose Your Alignment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`card cursor-pointer ${character.id}`}
            onClick={() => selectCharacter(character.id)}
          >
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>{character.description}</p>
            <h3 className="text-2xl font-bold">{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};