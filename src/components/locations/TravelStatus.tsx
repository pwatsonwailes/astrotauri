import React from 'react';
import { Compass } from 'lucide-react';
import { Location } from '../../types/locations';

interface TravelStatusProps {
  currentLocation: Location;
  destination: Location;
  turnsRemaining: number;
}

export const TravelStatus: React.FC<TravelStatusProps> = ({
  currentLocation,
  destination,
  turnsRemaining
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-700 rounded-lg">
          <Compass className="w-6 h-6 text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Current Journey</h2>
      </div>
      
      <div className="space-y-2 text-gray-300">
        <p>Currently aboard <span className="text-white">{currentLocation.name}</span></p>
        <p>Destination: <span className="text-white">{destination.name}</span></p>
        <p>Arrival in: <span className="text-white">{turnsRemaining} turns</span></p>
      </div>
    </div>
  );
};