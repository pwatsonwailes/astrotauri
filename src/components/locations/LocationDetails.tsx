import React from 'react';
import { Location, SubLocation } from '../../types/locations';
import { MapPin } from 'lucide-react';

interface LocationDetailsProps {
  location: Location;
  selectedSubLocation: SubLocation | null;
  onSelectSubLocation: (subLocation: SubLocation) => void;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({
  location,
}) => {
  return (
    <div className="prose py-4">
      <h3 className="font-semibold text-black">{location.name}</h3>
      <p className="text-gray-600">{location.description}</p>
    </div>
  );
};