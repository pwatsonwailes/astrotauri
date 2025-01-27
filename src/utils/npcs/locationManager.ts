import { NPCLocations } from '../../data/npcs';

export const getNPCsAtLocation = (locationId: string): string[] => {
  return Object.entries(NPCLocations)
    .filter(([_, data]) => data.currentLocationId === locationId)
    .map(([npcId]) => npcId);
};

export const updateNPCLocations = (currentTime: number): void => {
  Object.entries(NPCLocations).forEach(([npcId, data]) => {
    if (!data.schedule) return;

    // Find the last schedule entry that's before or at the current time
    const currentSchedule = [...data.schedule]
      .reverse()
      .find(entry => entry.time <= currentTime);

    if (currentSchedule) {
      NPCLocations[npcId].currentLocationId = currentSchedule.locationId;
    }
  });
};