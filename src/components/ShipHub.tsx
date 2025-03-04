import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useSoundSystem } from '../hooks/useSoundSystem';
import { Location } from '../types/game';
import { Map, Users, Radio, Clipboard, ShoppingBag, Clock, Package } from 'lucide-react';
import { BridgeControl } from './BridgeControl';
import { CrewInteraction } from './CrewInteraction';
import { Market } from './Market';
import { CraftingSystem } from './CraftingSystem';
import { Inventory } from './Inventory';

import radial from '../assets/imgs/radial.jpg';

const locations: { id: Location | 'cargo'; name: string; icon: React.ReactNode }[] = [
  { id: 'bridge', name: 'Missions', icon: <Map className="w-5 h-5" /> },
  { id: 'quarters', name: 'People', icon: <Users className="w-5 h-5" /> },
  { id: 'market', name: 'Market', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'engineering', name: 'Engineering', icon: <Clipboard className="w-5 h-5" /> },
  { id: 'cargo', name: 'Cargo Hold', icon: <Package className="w-5 h-5" /> }
];

export const ShipHub: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | 'cargo'>('bridge');
  const { resources, currentTurn, advanceTurn, activeQuests } = useGameStore();
  const { playSound } = useSoundSystem();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleLocationChange = (location: Location | 'cargo') => {
    playSound('navigation');
    setSelectedLocation(location);
  };

  // Check if any missions need attention
  const canAdvanceTurn = !activeQuests.some(quest => 
    quest.status === 'active' && 
    quest.turnInteractions[quest.currentTurn] && 
    !quest.turnInteractions[quest.currentTurn].processed
  );

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
      case 'market':
        return <Market />;
      case 'cargo':
        return <Inventory />;
      default:
        return null;
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-amber-50 text-slate-800 overflow-hidden"
      style={{
        backgroundImage: `url(${radial})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
      {/* Fixed header */}
      <div ref={headerRef} className="flex-shrink-0 border-b border-slate-200 bg-white/30 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 pt-3">
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
                  disabled={!canAdvanceTurn}
                  className={`flex items-center px-3 py-1 rounded transition-colors text-xs font-medium ${
                    canAdvanceTurn
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                  aria-label="Advance to next turn"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Next Turn
                </button>
              </div>
            </div>
          </div>
          
          {/* Location tabs */}
          <div className="flex space-x-1 mt-3 overflow-x-auto scrollbar-hide">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationChange(location.id)}
                className={`px-3 py-2 rounded-t-lg transition-all flex items-center space-x-1 text-sm
                  ${selectedLocation === location.id
                    ? 'bg-white text-orange-600 font-medium'
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

      {/* Content area */}
      <div 
        className="flex-grow overflow-hidden"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 h-full">
          {renderLocationContent()}
        </div>
      </div>
    </div>
  );
};