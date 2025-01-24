import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { EventItem } from './events/EventItem';
import { GameEvent } from '../types/events';

interface EventLogProps {
  displayEvents: GameEvent[];
}

export const EventLog: React.FC<EventLogProps> = ({ displayEvents }) => {
  return (
    <div className="fixed bottom-20 right-4 max-w-md w-full space-y-2 z-50">
      <AnimatePresence mode="popLayout">
        {displayEvents.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </div>
  );
};