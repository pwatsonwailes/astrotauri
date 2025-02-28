import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { backgrounds, alignments, getBaseStats } from '../data/characters';
import { Background, Alignment, Character } from '../types/game';
import Prologue from '../stories/main/c1/Prologue.ink?raw';

import radial from '../assets/imgs/radial.jpg';

const StatBar: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2">
      <div
        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
  </div>
);

export const CharacterSelect: React.FC = () => {
  const { setScreen, setCharacter, setCurrentStory, addCompletedConversation } = useGameStore();
  const { playSound } = useSoundSystem();
  const [selectedBackground, setSelectedBackground] = useState<Background>('smuggler');
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment>('ruthless');

  const handleBack = () => {
    playSound('navigation');
    setScreen('intro');
  };

  const stats = getBaseStats(selectedBackground);

  const createCharacter = () => {
    const character: Character = {
      id: `${selectedBackground}-${selectedAlignment}`,
      avatar: '',
      name: `${alignments[selectedAlignment].name} ${backgrounds[selectedBackground].name}`,
      description: backgrounds[selectedBackground].description,
      background: selectedBackground,
      alignment: selectedAlignment,
      stats: stats
    };

    playSound('select');
    setCharacter(character);
    setCurrentStory(Prologue);
    addCompletedConversation('Prologue');
    setScreen('story');
  };

  return (
    <div
      className="min-h-screen creamyBg text-black p-4 md:p-8 overflow-auto flex flex-col align-center justify-center"
      style={{
        backgroundImage: `url(${radial})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <button
        onClick={handleBack}
        className="backButton flex items-center text-slate-500 hover:text-black transition-colors"
      >
        <ArrowLeft className="mr-2" size={24} />
        Back to Menu
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6">Background</h2>
            <div className="space-y-2 md:space-y-4">
              {Object.entries(backgrounds).map(([key, { name }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedBackground(key as Background)}
                  className={`w-full text-left p-3 md:p-4 rounded-lg transition-all text-white hover:shadow-lg hover:shadow-black/50 ${
                    selectedBackground === key
                      ? 'bg-orange-600 shadow-lg'
                      : 'bg-slate-700 shadow-sm hover:bg-slate-500'
                  }`}
                >
                  <h3 className="text-base md:text-lg">{name}</h3>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6">Alignment</h2>
            <div className="space-y-2 md:space-y-4">
              {Object.entries(alignments).map(([key, { name }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAlignment(key as Alignment)}
                  className={`w-full text-left p-3 md:p-4 rounded-lg transition-all text-white hover:shadow-lg hover:shadow-black/50 ${
                    selectedAlignment === key
                      ? 'bg-orange-600 shadow-lg'
                      : 'bg-slate-700 shadow-sm hover:bg-slate-500'
                  }`}
                >
                  <h3 className="text-base md:text-lg">{name}</h3>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{alignments[selectedAlignment].name} {backgrounds[selectedBackground].name}</h2>
            
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-gray-700 font-semibold mb-1">Background:</h3>
                <p className="text-sm text-gray-800">{backgrounds[selectedBackground].description}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-gray-700 font-semibold mb-1">Alignment:</h3>
                <p className="text-sm text-gray-800">{alignments[selectedAlignment].description}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Stats</h3>
            <StatBar value={stats.technicalExpertise} label="Technical Expertise" />
            <StatBar value={stats.diplomacy} label="Diplomacy" />
            <StatBar value={stats.riskTolerance} label="Risk Tolerance" />
            <StatBar value={stats.leadership} label="Leadership" />
            <StatBar value={stats.strategicIntelligence} label="Strategic Intelligence" />
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex justify-center">
          <button
            onClick={createCharacter}
            className="begin px-6 py-3 md:px-8 md:py-4 bg-slate-700 text-white rounded-lg text-base md:text-lg font-bold hover:shadow-lg hover:shadow-black/50 hover:bg-orange-600 transition-colors"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};