import { useCallback } from 'react';
import { useEventStore } from '../stores/useEventStore';
import { Location } from '../types/locations';
import { UnlockCondition } from '../types/characters';
import { GameEvent } from '../types/events';
import { useGameStore } from '../stores/useGameStore';

export const useCharacterUnlock = () => {
  const { events } = useEventStore();

  const checkUnlockCondition = useCallback((condition: UnlockCondition): boolean => {
    // Filter events to only include those that could trigger unlocks
    const relevantEvents = events.filter((event: GameEvent): boolean => {
      switch (condition.type) {
        case 'story':
          return (
            event.type === 'story-progress' &&
            event.details?.chapterId === condition.chapterId &&
            event.details?.nodeId === condition.nodeId
          );
        case 'goal':
          return (
            event.type === 'success' &&
            event.details?.goalId === condition.goalId
          );
        case 'faction':
          return (
            event.type === 'reputation' &&
            event.details?.factionId === condition.factionId &&
            event.details?.newReputation >= condition.reputation
          );
        default:
          return false;
      }
    });

    return relevantEvents.length > 0;
  }, [events]);

  const checkLocationNPCs = useCallback((location: Location): Location => {
    // Process main location NPCs
    const updatedNPCs = location.npcs.map(npc => {
      if (npc.isUnlocked || !npc.unlockCondition) return npc;
      
      const shouldUnlock = checkUnlockCondition(npc.unlockCondition);
      if (shouldUnlock) {
        useEventStore.getState().addEvent({
          type: 'character-unlock',
          message: `${npc.name} is now available at ${location.name}`,
          details: {
            characterId: npc.id,
            unlockCondition: npc.unlockCondition
          }
        });
        return { ...npc, isUnlocked: true };
      }
      return npc;
    });

    // Process sub-location NPCs
    const updatedSubLocations = location.subLocations.map(subLocation => ({
      ...subLocation,
      npcs: subLocation.npcs.map(npc => {
        if (npc.isUnlocked || !npc.unlockCondition) return npc;
        
        const shouldUnlock = checkUnlockCondition(npc.unlockCondition);
        if (shouldUnlock) {
          useEventStore.getState().addEvent({
            type: 'character-unlock',
            message: `${npc.name} is now available at ${subLocation.name}`,
            details: {
              characterId: npc.id,
              unlockCondition: npc.unlockCondition
            }
          });
          return { ...npc, isUnlocked: true };
        }
        return npc;
      })
    }));

    return {
      ...location,
      npcs: updatedNPCs,
      subLocations: updatedSubLocations
    };
  }, [checkUnlockCondition]);

  const checkAllLocations = useCallback(() => {
    const gameState = useGameStore.getState();
    const currentLocation = gameState.currentLocation;
    
    // Only process the current location to avoid unnecessary updates
    if (currentLocation.type === 'station' || currentLocation.type === 'area') {
      const locationData = LOCATIONS[currentLocation.id];
      if (locationData) {
        const updatedLocation = checkLocationNPCs(locationData);
        // Update the location data if changes were made
        if (JSON.stringify(locationData) !== JSON.stringify(updatedLocation)) {
          LOCATIONS[currentLocation.id] = updatedLocation;
        }
      }
    }
  }, [checkLocationNPCs]);

  return {
    checkAllLocations
  };
};