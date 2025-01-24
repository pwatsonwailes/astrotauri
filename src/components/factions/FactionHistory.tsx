import React from 'react';
import { useEventStore } from '../../stores/useEventStore';
import { Faction } from '../../types/factions';

interface FactionHistoryProps {
  faction: Faction;
}

export const FactionHistory: React.FC<FactionHistoryProps> = ({ faction }) => {
  const { events } = useEventStore();

  const factionEvents = events.filter(event => 
    (event.type === 'faction' && event.details?.factionId === faction.id) ||
    (event.type === 'reputation' && event.details?.factionId === faction.id)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Events</h3>
      
      <div className="space-y-3">
        {factionEvents.length > 0 ? (
          factionEvents.map(event => (
            <div
              key={event.id}
              className="bg-gray-700 rounded-lg p-4 space-y-2"
            >
              <div className="font-medium">{event.message}</div>
              <div className="text-base text-gray-400">
                {new Date(event.timestamp).toLocaleString()}
              </div>
              {event.type === 'reputation' && event.details && (
                <div className="text-base">
                  <span className={event.details.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {event.details.change > 0 ? '+' : ''}{event.details.change} reputation
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-8">
            No recent events with this faction
          </div>
        )}
      </div>
    </div>
  );
};