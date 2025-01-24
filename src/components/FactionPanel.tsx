import React from 'react';
import { FactionDisplay } from './FactionDisplay';
import { Faction } from '../types/factions';

interface FactionPanelProps {
  factions: Faction[];
}

export const FactionPanel: React.FC<FactionPanelProps> = ({ factions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-900 rounded-lg">
      {factions.map(faction => (
        <FactionDisplay key={faction.id} faction={faction} />
      ))}
    </div>
  );
};