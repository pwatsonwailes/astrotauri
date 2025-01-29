import { NPCs } from '../../data/npcs';
import { useGameStore } from '../../stores/useGameStore';
import { NPCLocation } from '../../types/npcs';

// Initialize NPC locations
export const initializeNPCLocations = (): Record<string, NPCLocation> => {
  const npcLocations: Record<string, NPCLocation> = {};
  
  Object.entries(NPCs).forEach(([id, npc]) => {
    npcLocations[id] = {
      currentLocationId: npc.type === 'fixed' ? 'medical-bay' : 'ceres',
      isWithPlayer: false,
      fixedLocation: npc.type === 'fixed' ? 'medical-bay' : undefined
    };
  });

  return npcLocations;
};

// Get all NPCs at a specific location
export const getNPCsAtLocation = (locationId: string): string[] => {
  const { npcLocations } = useGameStore.getState();
  const npcsAtLocation: string[] = [];

  Object.entries(npcLocations).forEach(([npcId, data]) => {
    // Check if NPC is unlocked
    const npc = NPCs[npcId];
    if (!npc?.isUnlocked) return;

    // Check if NPC is at this location
    if (data.currentLocationId === locationId || data.fixedLocation === locationId) {
      npcsAtLocation.push(npcId);
    }
  });

  return npcsAtLocation;
};