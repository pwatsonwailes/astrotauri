import React from 'react';
import { Shield } from 'lucide-react';
import { Faction, ReputationLevel } from '../types/factions';
import { ReputationManager } from '../engine/reputation/reputationManager';

interface FactionDisplayProps {
  faction: Faction;
}

const getReputationColor = (level: ReputationLevel): string => {
  switch (level) {
    case 'allied': return 'text-green-500';
    case 'friendly': return 'text-green-400';
    case 'neutral': return 'text-gray-400';
    case 'unfriendly': return 'text-red-400';
    case 'hostile': return 'text-red-500';
    default: return 'text-gray-400';
  }
};

export const FactionDisplay: React.FC<FactionDisplayProps> = ({ faction }) => {
  const reputationLevel = ReputationManager.getReputationLevel(faction.reputation);
  const reputationColor = getReputationColor(reputationLevel);

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">{faction.name}</h3>
      </div>
      
      <p className="text-base text-gray-400">{faction.description}</p>
      
      <div className="flex items-center gap-2">
        <span className="text-base text-gray-400">Reputation:</span>
        <span className={`font-medium ${reputationColor}`}>
          {reputationLevel.charAt(0).toUpperCase() + reputationLevel.slice(1)}
          {' '}({faction.reputation})
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-medium text-gray-300">Traits:</h4>
        {faction.traits.map(trait => (
          <div key={trait.id} className="text-base text-gray-400">
            <span className="font-medium text-blue-400">{trait.name}</span>
            <span className="mx-1">-</span>
            <span>{trait.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};