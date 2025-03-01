import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { Location } from '../types/game';
import { Map, Users, Radio, Clipboard, ShoppingBag, Clock, ChevronRight } from 'lucide-react';
import { QuestList } from './QuestList';
import { Inventory } from './Inventory';
import { CraftingSystem } from './CraftingSystem';
import { CrewInteraction } from './CrewInteraction';
import { BridgeControl } from './BridgeControl';
import { Communications } from './Communications';

const locations: { id: Location; name: string; icon: React.ReactNode }[] = [
  { id: 'bridge', name: 'Mission Control', icon: <Map className="w-5 h-5" /> },
  { id: 'quarters', name: 'Crew Quarters', icon: <Users className="w-5 h-5" /> },
  { id: 'comms', name: 'Communications', icon: <Radio className="w-5 h-5" /> },
  { id: 'engineering', name: 'Engineering', icon: <Clipboard className="w-5 h-5" /> },
  { id: 'market', name: 'Market', icon: <ShoppingBag className="w-5 h-5" /> }
];

export const ShipHub: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>('bridge');
  const { resources, currentTurn, advanceTurn, selectedCharacter } = useGameStore();
  const { playSound } = useSoundSystem();
  const contentRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleLocationChange = (location: Location) => {
    playSound('navigation');
    setSelectedLocation(location);
    // Scroll to top when changing location
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  // Measure header height on mount and resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

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
            <p className="text-gray-600">Select a different location to view its content.</p>
          </>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-amber-50 text-slate-800 overflow-hidden">
      {/* Fixed header */}
      <div ref={headerRef} className="flex-shrink-0 border-b border-slate-200 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">The Prospector</h1>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Resource indicators */}
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-white rounded text-xs font-medium border border-slate-200 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                  <span>{resources.credits}</span>
                </div>
                <div className="px-2 py-1 bg-white rounded text-xs font-medium border border-slate-200 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-500 mr-1"></div>
                  <span>{resources.materials}</span>
                </div>
                <div className="px-2 py-1 bg-white rounded text-xs font-medium border border-slate-200 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span>{resources.tech}</span>
                </div>
                <div className="px-2 py-1 bg-white rounded text-xs font-medium border border-slate-200 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span>{resources.influence}</span>
                </div>
              </div>
              
              {/* Turn indicator and button */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full text-amber-800 text-xs font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Turn {currentTurn}</span>
                </div>
                <button
                  onClick={advanceTurn}
                  className="flex items-center px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors text-xs font-medium"
                  aria-label="Advance to next turn"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Next Turn
                </button>
              </div>
            </div>
          </div>
          
          {/* Location tabs */}
          <div className="flex space-x-1 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationChange(location.id)}
                className={`px-3 py-2 rounded-t-lg transition-all flex items-center space-x-1 text-sm
                  ${selectedLocation === location.id
                    ? 'bg-white text-orange-600 border-t border-l border-r border-slate-200 font-medium'
                    : 'bg-slate-100 hover:bg-slate-50 text-slate-700 hover:text-orange-600'}`}
                aria-label={`Go to ${location.name}`}
                aria-pressed={selectedLocation === location.id}
              >
                {location.icon}
                <span>{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div 
        ref={contentRef}
        className="flex-grow overflow-y-auto custom-scrollbar"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 border border-slate-200">
              <div className="mb-4 pb-3 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">{locations.find(l => l.id === selectedLocation)?.name}</h2>
              </div>
              {renderLocationContent()}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-800">Active Missions</h2>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <QuestList />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-800">Inventory</h2>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <Inventory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import these at the top of the file
import { backgrounds, alignments } from '../data/characters';