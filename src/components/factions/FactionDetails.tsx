import React from 'react';
import { Shield, TrendingUp, Award } from 'lucide-react';
import { Faction } from '../../types/factions';
import { ReputationManager } from '../../engine/reputation/reputationManager';

interface FactionDetailsProps {
  faction: Faction;
}

export const FactionDetails: React.FC<FactionDetailsProps> = ({ faction }) => {
  const reputationLevel = ReputationManager.getReputationLevel(faction.reputation);
  const reputationModifier = ReputationManager.getReputationModifier(faction);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-700 rounded-lg">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{faction.name}</h2>
          <p className="text-gray-400">{faction.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-medium">Reputation</h3>
          </div>
          <div className="text-2xl font-bold">
            {faction.reputation > 0 ? '+' : ''}{faction.reputation}
          </div>
          <div className={`
            text-base mt-1
            ${reputationLevel === 'allied' ? 'text-green-400' :
              reputationLevel === 'friendly' ? 'text-blue-400' :
              reputationLevel === 'neutral' ? 'text-gray-400' :
              reputationLevel === 'unfriendly' ? 'text-orange-400' :
              'text-red-400'}
          `}>
            {reputationLevel.charAt(0).toUpperCase() + reputationLevel.slice(1)}
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="font-medium">Market Modifier</h3>
          </div>
          <div className="text-2xl font-bold">
            {reputationModifier > 0 ? '+' : ''}{(reputationModifier * 100).toFixed(0)}%
          </div>
          <div className="text-base text-gray-400 mt-1">
            Price adjustment based on reputation
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-medium mb-3">Faction Traits</h3>
        <div className="space-y-3">
          {faction.traits.map(trait => (
            <div key={trait.id} className="border-l-2 border-amber-600 pl-3">
              <div className="font-medium">{trait.name}</div>
              <div className="text-base text-gray-400">{trait.description}</div>
              <div className="text-base text-amber-600 mt-1">
                {trait.effect.modifier > 0 ? '+' : ''}{(trait.effect.modifier * 100).toFixed(0)}% {trait.effect.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};