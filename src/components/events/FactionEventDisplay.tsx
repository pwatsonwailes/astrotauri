import React from 'react';
import { Building2, AlertTriangle, Zap } from 'lucide-react';
import { FactionEvent } from '../../types/events';

interface FactionEventDisplayProps {
  event: FactionEvent;
}

const getEventIcon = (eventType: FactionEvent['details']['eventType']) => {
  switch (eventType) {
    case 'deal':
      return <Building2 className="w-5 h-5" />;
    case 'conflict':
      return <AlertTriangle className="w-5 h-5" />;
    case 'opportunity':
    case 'warning':
      return <Zap className="w-5 h-5" />;
  }
};

const getEventColor = (eventType: FactionEvent['details']['eventType']) => {
  switch (eventType) {
    case 'deal':
      return 'bg-green-600';
    case 'conflict':
      return 'bg-red-600';
    case 'opportunity':
      return 'bg-blue-600';
    case 'warning':
      return 'bg-amber-600';
  }
};

export const FactionEventDisplay: React.FC<FactionEventDisplayProps> = ({ event }) => {
  const { eventType } = event.details;
  
  return (
    <div className={`
      p-4 rounded-lg shadow-lg flex items-center gap-3
      ${getEventColor(eventType)}
      text-white
    `}>
      {getEventIcon(eventType)}
      <div className="flex-1">
        <p className="font-medium">{event.message}</p>
        {event.details.creditsChange && (
          <p className="text-base opacity-90">
            Credits: {event.details.creditsChange > 0 ? '+' : ''}{event.details.creditsChange}
          </p>
        )}
        {event.details.reputationChange && (
          <p className="text-base opacity-90">
            Reputation: {event.details.reputationChange > 0 ? '+' : ''}{event.details.reputationChange}
          </p>
        )}
      </div>
    </div>
  );
};