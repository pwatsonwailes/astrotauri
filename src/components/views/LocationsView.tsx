import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useStoryStore } from '../../stores/useStoryStore';
import { LocationAction } from '../locations/LocationAction';
import { LOCATIONS } from '../../data/locations';
import { NPCs } from '../../data/npcs';
import { getNPCsAtLocation } from '../../utils/npcs/locationManager';

export const LocationsView: React.FC = () => {
  const { currentLocation, turn } = useGameStore();
  const { startNarrative } = useStoryStore();

  const locationData = LOCATIONS[currentLocation.id];
  if (!locationData) return null;

  // Get NPCs currently at this location
  const presentNPCIds = getNPCsAtLocation(currentLocation.id);
  const presentNPCs = presentNPCIds.map(id => NPCs[id]).filter(npc => npc);

  // Get available actions for this location
  const locationActions = locationData.actions || [];
  
  // Add NPC interaction actions
  const npcActions = presentNPCs.map(npc => ({
    id: `talk-to-${npc.id}`,
    type: 'talk' as const,
    title: `Talk to ${npc.name}`,
    description: npc.title,
    narrativeId: npc.availableNarratives[0] // For now just use first available narrative
  }));

  const allActions = [...locationActions, ...npcActions];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 distancedTop">
      {/* Location Description */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-black mb-4">{locationData.name}</h2>
        <p className="text-gray-600 mb-6">{locationData.description}</p>
      </div>

      {/* Available Actions */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-semibold text-black mb-4">Available Actions</h3>
        <div className="grid gap-4">
          {allActions.map(action => (
            <LocationAction
              key={action.id}
              action={action}
              onSelect={() => startNarrative(action.narrativeId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};