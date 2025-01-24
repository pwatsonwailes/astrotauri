import React from 'react';
import { Compass } from 'lucide-react';
import { Location } from '../../types/locations';
import { useGameStore } from '../../stores/useGameStore';

interface TravelOptionsProps {
  currentLocation: Location;
  availableDestinations: Location[];
  credits: number;
}

export const TravelOptions: React.FC<TravelOptionsProps> = ({
  currentLocation,
  availableDestinations,
  credits
}) => {
  const startTravel = useGameStore(state => state.startTravel);

  const handleTravel = (destination: Location) => {
    const requirements = currentLocation.travelRequirements?.[destination.id];
    if (!requirements || credits < requirements.credits) return;

    startTravel({
      destinationId: destination.id,
      shipId: 'fast-picket', // or however you determine the ship
      cost: requirements.credits,
      turns: requirements.turns
    });
  };

  // Get all available ships from locations data
  const availableShips = Object.values(LOCATIONS).filter(
    location => 
      location.type === 'ship' && 
      location.id !== currentLocation.id
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Available Destinations</h3>
      
      <div className="grid gap-4">
        {availableDestinations.map(destination => {
          const requirements = currentLocation.travelRequirements?.[destination.id];
          const canAfford = requirements ? credits >= requirements.credits : false;

          return (
            <div
              key={destination.id}
              className="bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <Compass className="w-5 h-5 text-amber-500" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-white">{destination.name}</h4>
                  <p className="text-sm text-gray-300">{destination.description}</p>
                  
                  {requirements && (
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="text-gray-400">
                        Cost: {requirements.credits} credits
                      </div>
                      <div className="text-gray-400">
                        Travel time: {requirements.turns} turns
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleTravel(destination)}
                  disabled={!canAfford}
                  className={`
                    px-4 py-2 transition-colors
                    ${canAfford
                      ? 'bg-amber-500 hover:bg-amber-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Travel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
