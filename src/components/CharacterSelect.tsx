import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { characters } from '../data/characters';
import mainStory from '../stories/main.ink?raw';

export const CharacterSelect: React.FC = () => {
  const { setScreen, setCharacter, setCurrentStory, addCompletedConversation } = useGameStore();
  const { playSound } = useSoundSystem();

  const selectCharacter = (characterId: string) => {
    const character = characters.find(c => c.id === characterId);
    if (character) {
      playSound('select');
      setCharacter(character);
      setCurrentStory(mainStory);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-8">
      <button
        onClick={handleBack}
        className="flex items-center text-gray-300 hover:text-white mb-8"
      >
        <ArrowLeft className="mr-2" size={24} />
        Back to Menu
      </button>
      
      <h2 className="text-4xl font-bold mb-8">Choose Your Character</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => selectCharacter(character.id)}
          >
            <img
              src={character.avatar}
              alt={character.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
            <p className="text-gray-400">{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};