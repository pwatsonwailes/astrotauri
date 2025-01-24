import React from 'react';
import { motion } from "motion/react"
import { MapPin } from 'lucide-react';
import { Location, SubLocation } from '../../types/locations';

interface LocationCardProps {
  location: Location | SubLocation;
  isSelected: boolean;
  onSelect: () => void;
  transitTime?: int;
  transitDestination?: string;
  isSubLocation?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  isSelected,
  onSelect,
  transitTime = -1,
  transitDestination,
  isSubLocation = false
}) => {
  const hasSubLocations = !isSubLocation && location.subLocations

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  if (hasSubLocations) {
    return (
      <motion.div onClick={onSelect}>
        <section className="gap-4">
          <div className="flex items-start gap-4 p-4 promontory slate rounded-lg mb-4">
            <div className="p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mt-2 mb-0 text-white">{location.name}</h2>
            </div>
          </div>
          {location.type === 'ship' && transitTime && (
            <>
              <p className="text-gray-800 mb-4">Currently en route to {toTitleCase(transitDestination)}.</p>
              <p className="text-gray-800 mb-4">{transitTime} turns remaining.</p>
            </>
          )}
        </section>
      </motion.div>
    )
  }
  else {
    return (
      <motion.div
        onClick={onSelect}
        className={`
          rounded-lg p-4 cursor-pointer
          ${isSelected ? 'convex rowdy' : 'convex'}
        `}
      >
        <section className="flex items-start gap-4">
          <div className="p-2 rounded-lg">
            <MapPin className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
          </div>
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mt-2 mb-0 ${isSelected ? 'text-white' : 'text-gray-600'}`}>{location.name}</h3>

            {location.type === 'ship' && location?.turnsRemaining && (
              <>
                <p className="text-gray-500">Currently en route to <strong>{location.destination}</strong>.</p>
                <p className="text-gray-500">{location.turnsRemaining} turns remaining.</p>
              </>
            )}
          </div>
        </section>
      </motion.div>
    )
  }
};