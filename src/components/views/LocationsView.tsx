import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useStoryStore } from '../../stores/useStoryStore';
import { LOCATIONS } from '../../data/locations';
import { NPCList } from '../locations/NPCList';
import { LocationCard } from '../locations/LocationCard';
import { getNPCsAtLocation } from '../../utils/npcs/locationManager';

export const LocationsView: React.FC = () => {
  const { currentLocation } = useGameStore();
  const { startNarrative } = useStoryStore();
  const [selectedSubLocation, setSelectedSubLocation] = useState<string | null>(null);

  const locationData = LOCATIONS[currentLocation.id];
  if (!locationData) return null;

  // Get NPCs for the current sublocation or main location
  const getRelevantNPCs = () => {
    if (selectedSubLocation) {
      const subLocation = locationData.subLocations.find(sub => sub.id === selectedSubLocation);
      if (!subLocation) return [];
      const presentNPCIds = getNPCsAtLocation(selectedSubLocation);
      return presentNPCIds
        .map(id => subLocation.npcs.find(npc => npc.id === id))
        .filter(npc => npc);
    }
    return [];
  };

  const presentNPCs = getRelevantNPCs();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 distancedTop pt-6">
      {/* Location Description */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-black mb-4">{locationData.name}</h2>
        <p className="text-gray-600 mb-6">{locationData.description}</p>
      </div>

      {/* Sub-locations */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-xl font-semibold text-black mb-4">Areas</h3>
        <div className="space-y-4">
          {locationData.subLocations.map(subLocation => (
            <LocationCard
              key={subLocation.id}
              location={subLocation}
              isSelected={selectedSubLocation === subLocation.id}
              onSelect={() => setSelectedSubLocation(subLocation.id)}
              isSubLocation
            />
          ))}
        </div>
      </div>

      {/* Available NPCs */}
      <div className="lg:col-span-2 space-y-4">
        {selectedSubLocation ? (
          <>
            <h3 className="text-xl font-semibold text-black mb-4">People Here</h3>
            <NPCList
              npcs={presentNPCs}
              onSelectNPC={(npcId) => {
                const npc = presentNPCs.find(n => n.id === npcId);
                if (npc?.availableNarratives?.[0]) {
                  startNarrative(npc.availableNarratives[0]);
                }
              }}
            />
          </>
        ) : (
          <div className="text-center text-gray-600 py-8">
            Select an area to see who is there
          </div>
        )}
      </div>
    </div>
  );
};