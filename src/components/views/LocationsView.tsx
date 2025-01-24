import React, { useState, useEffect } from 'react';
import { MapPin, Users, Target, Compass } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { useEventStore } from '../../stores/useEventStore';
import { useCharacterUnlock } from '../../hooks/useCharacterUnlock';
import { SubLocation } from '../../types/locations';
import { LocationCard } from '../locations/LocationCard';
import { LocationDetails } from '../locations/LocationDetails';
import { NPCList } from '../locations/NPCList';
import { GoalList } from '../locations/GoalList';
import { TravelStatus } from '../locations/TravelStatus';
import { TravelOptions } from '../locations/TravelOptions';
import { LOCATIONS } from '../../data/locations';

export const LocationsView: React.FC = () => {
  const [selectedSubLocation, setSelectedSubLocation] = useState<SubLocation | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'npcs' | 'goals' | 'travel'>('details');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);

  // Game state
  const {
    currentLocation,
    credits,
    energyPoints,
    goals,
    activateGoal,
    investInGoal,
    endTurn,
    startTravel
  } = useGameStore();

  // Character unlocking
  const { checkAllLocations } = useCharacterUnlock();

  // Events
  const addEvent = useEventStore(state => state.addEvent);

  useEffect(() => {
    setSelectedSubLocation(null);
  }, [currentLocation.id]);

  // Check for character unlocks whenever the view is rendered
  useEffect(() => {
    checkAllLocations();
  }, [checkAllLocations]);

  const currentLocationData = LOCATIONS[currentLocation.id];

  // Update goals with current state
  const updateGoalsWithState = (locationGoals: LocationGoal[]) => {
    return locationGoals.map(goal => {
      const stateGoal = goals.find(g => g.id === goal.id);
      return stateGoal ? { ...goal, ...stateGoal } : goal;
    });
  };

  const currentGoals = selectedSubLocation?.goals || currentLocationData.goals || [];
  const updatedGoals = updateGoalsWithState(currentGoals);

  const transitTime = typeof currentLocation.turnsRemaining !== 'undefined' && currentLocation.turnsRemaining > 0
    ? currentLocation.turnsRemaining
    : -1;

  const transitDestination = typeof currentLocation.destination !== 'undefined'
    ? currentLocation.destination
    : '';

  let npcs = []

  if (selectedSubLocation && typeof selectedSubLocation.npcs !== 'undefined')
    npcs = selectedSubLocation.npcs
  else if (currentLocationData && typeof currentLocationData.npcs !== 'undefined')
    npcs = currentLocationData.npcs

  return (
    <div className="grid grid-cols-3 gap-6 distancedTop pt-4">
      {/* Location Navigation */}
      <section className="space-y-4">
        <LocationCard
          location={currentLocationData}
          transitDestination={transitDestination}
          transitTime={transitTime}
          isSelected={false}
          onSelect={() => setSelectedSubLocation(null)}
        />
        
        {currentLocationData.subLocations.map(subLocation => (
          <LocationCard
            key={subLocation.id}
            location={subLocation}
            isSelected={selectedSubLocation?.id === subLocation.id}
            onSelect={() => setSelectedSubLocation(subLocation)}
            isSubLocation
          />
        ))}
      </section>

      {/* Details Panel */}
      <section className="col-span-2">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`
              flex items-center gap-2 px-4 py-2
              ${activeTab === 'details'
                ? 'text-amber-400'
                : 'text-gray-600 hover:text-sky-400'
              }
            `}
          >
            <MapPin className="w-4 h-4" />
            Details
          </button>
          
          <button
            onClick={() => setActiveTab('npcs')}
            className={`
              flex items-center gap-2 px-4 py-2
              ${activeTab === 'npcs'
                ? 'text-amber-400'
                : 'text-gray-600 hover:text-sky-400'
              }
            `}
          >
            <Users className="w-4 h-4" />
            People
          </button>
          
          <button
            onClick={() => setActiveTab('goals')}
            className={`
              flex items-center gap-2 px-4 py-2
              ${activeTab === 'goals'
                ? 'text-amber-400'
                : 'text-gray-600 hover:text-sky-400'
              }
            `}
          >
            <Target className="w-4 h-4" />
            Goals
          </button>

          {currentLocationData.availableDestinations && (
            <button
              onClick={() => setActiveTab('travel')}
              className={`
                flex items-center gap-2 px-4 py-2
                ${activeTab === 'travel'
                  ? 'text-amber-600'
                  : 'text-gray-600 hover:text-sky-400'
                }
              `}
            >
              <Compass className="w-4 h-4" />
              Travel
            </button>
          )}
        </div>

        {activeTab === 'details' && (
          <LocationDetails
            location={selectedSubLocation || currentLocationData}
            selectedSubLocation={selectedSubLocation}
            onSelectSubLocation={setSelectedSubLocation}
          />
        )}
        
        {activeTab === 'npcs' && (
          <NPCList
            npcs={npcs}
            onSelectNPC={setSelectedNpcId}
          />
        )}
        
        {activeTab === 'goals' && (
          <GoalList
            goals={updatedGoals}
            onSelectGoal={setSelectedGoalId}
            selectedGoalId={selectedGoalId}
            onActivateGoal={activateGoal}
            onInvestInGoal={investInGoal}
            energy={energyPoints}
          />
        )}

        {activeTab === 'travel' && currentLocation.destination && (
          <TravelStatus
            currentLocation={currentLocationData}
            destination={LOCATIONS[currentLocation.destination]}
            turnsRemaining={currentLocation.turnsRemaining || 0}
          />
        )}

        {activeTab === 'travel' && !currentLocation.destination && currentLocationData.availableDestinations && (
          <TravelOptions
            currentLocation={currentLocationData}
            availableDestinations={currentLocationData.availableDestinations.map(id => LOCATIONS[id])}
            credits={credits}
            onTravel={(destinationId, shipId, cost, turns) => {
              startTravel({ destinationId, shipId, cost, turns });
              addEvent({
                type: 'info',
                message: `Started journey to ${destinationId}`,
                timestamp: Date.now()
              });
            }}
          />
        )}
      </section>
    </div>
  );
};