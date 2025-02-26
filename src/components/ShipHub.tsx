import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { Location } from '../types/game';
import { Map, Users, Radio, Clipboard, ShoppingBag, Clock } from 'lucide-react';
import { QuestList } from './QuestList';
import { Inventory } from './Inventory';
import { CraftingSystem } from './CraftingSystem';
import { CrewInteraction } from './CrewInteraction';
import { BridgeControl } from './BridgeControl';
import { Communications } from './Communications';

const locations: { id: Location; name: string; icon: React.ReactNode }[] = [
  { id: 'bridge', name: 'Bridge', icon: <Map className="w-6 h-6" /> },
  { id: 'quarters', name: 'Crew Quarters', icon: <Users className="w-6 h-6" /> },
  { id: 'comms', name: 'Communications', icon: <Radio className="w-6 h-6" /> },
  { id: 'engineering', name: 'Engineering', icon: <Clipboard className="w-6 h-6" /> },
  { id: 'market', name: 'Market', icon: <ShoppingBag className="w-6 h-6" /> }
];

export const ShipHub: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>('bridge');
  const { resources, currentTurn, advanceTurn, selectedCharacter } = useGameStore();
  const { playSound } = useSoundSystem();

  const handleLocationChange = (location: Location) => {
    playSound('navigation');
    setSelectedLocation(location);
  };

  const renderLocationContent = () => {
    switch (selectedLocation) {
      case 'bridge':
        return <BridgeControl />;
      case 'engineering':
        return <CraftingSystem />;
      case 'quarters':
        return <CrewInteraction />;
      case 'comms':
        return <Communications />;
      default:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Location View</h2>
            <p className="text-gray-400">Select a different location to view its content.</p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">The Prospector</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Turn {currentTurn}</span>
              <button
                onClick={advanceTurn}
                className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Clock className="w-5 h-5 mr-2" />
                Next Turn
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-4 text-sm">
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                Credits: {resources.credits}
              </div>
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                Materials: {resources.materials}
              </div>
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                Tech: {resources.tech}
              </div>
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                Influence: {resources.influence}
              </div>
            </div>
            
            {selectedCharacter && (
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800 rounded-lg">
                <img 
                  src={selectedCharacter.avatar} 
                  alt={selectedCharacter.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">{selectedCharacter.name}</div>
                  <div className="text-xs text-gray-400">
                    {backgrounds[selectedCharacter.background].name} • {alignments[selectedCharacter.alignment].name}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationChange(location.id)}
              className={`p-4 rounded-lg transition-colors flex flex-col items-center justify-center space-y-2
                ${selectedLocation === location.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'}`}
            >
              {location.icon}
              <span>{location.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-gray-800 rounded-lg p-6">
            {renderLocationContent()}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <QuestList />
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <Inventory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import these at the top of the file
import { backgrounds, alignments } from '../data/characters';