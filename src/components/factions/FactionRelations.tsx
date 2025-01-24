import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { Faction } from '../../types/factions';

interface FactionRelationsProps {
  faction: Faction;
}

export const FactionRelations: React.FC<FactionRelationsProps> = ({ faction }) => {
  const { factions } = useGameStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Faction Relations</h3>
      
      <div className="grid gap-3">
        {Object.entries(faction.relationships)
          .sort(([, a], [, b]) => b - a)
          .map(([factionId, relationship]) => {
            const relatedFaction = factions.find(f => f.id === factionId);
            if (!relatedFaction) return null;

            return (
              <div
                key={factionId}
                className="bg-gray-700 rounded-lg p-4 flex items-center gap-4"
              >
                <div className={`
                  p-2 rounded-lg
                  ${relationship > 0 ? 'bg-green-900' : 'bg-red-900'}
                `}>
                  {relationship > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-medium">{relatedFaction.name}</div>
                  <div className="text-base text-gray-400">
                    {relationship > 0 ? 'Allied' : 'Rival'} faction
                  </div>
                </div>
                
                <div className={`
                  text-lg font-bold
                  ${relationship > 0 ? 'text-green-400' : 'text-red-400'}
                `}>
                  {relationship > 0 ? '+' : ''}{(relationship * 100).toFixed(0)}%
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};