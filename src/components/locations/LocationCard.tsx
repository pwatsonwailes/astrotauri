import React from 'react';
import { motion } from "motion/react"
import { MapPin } from 'lucide-react';
import { Location, SubLocation } from '../../types/locations';

interface LocationCardProps {
  location: Location | SubLocation;
  isSelected: boolean;
  onSelect: () => void;
  transitTime?: number;
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
  return (
    <motion.div
      onClick={onSelect}
      className={`
        locationName rounded-lg p-4 cursor-pointer
        ${isSelected ? 'selected convex rowdy' : 'convex hover:lake'}
      `}
    >
      <section>
        <h3 className="flex gap-4 text-lg font-semibold my-0">
          <MapPin className="w-6 h-6" />
          {location.name}
        </h3>
        <p className="text-gray-500 mt-2 mb-0">{location.description}</p>
        {location.type === 'ship' && location?.turnsRemaining && (
          <>
            <p className="text-gray-500">Currently en route to <strong>{location.destination}</strong>.</p>
            <p className="text-gray-500">{location.turnsRemaining} turns remaining.</p>
          </>
        )}
      </section>
    </motion.div>
  );
};