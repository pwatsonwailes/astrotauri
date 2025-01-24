import React from 'react';
import { motion } from "motion/react"
import { EventIcon } from './EventIcon';
import { getEventColor } from './EventStyles';
import { GameEvent } from '../../types/events';

interface EventItemProps {
  event: GameEvent;
}

export const EventItem = React.forwardRef<HTMLDivElement, EventItemProps>(({ event }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`
        p-4 rounded-lg shadow-lg flex items-center gap-3
        ${getEventColor(event.type)}
        text-white
      `}
    >
      <EventIcon type={event.type} />
      <div className="flex-1">
        <p className="font-medium">{event.message}</p>
        {event.details && 'newPrice' in event.details && (
          <p className="text-base opacity-90">
            New price: {event.details.newPrice} credits
          </p>
        )}
        {event.type === 'transaction' && event.details && (
          <p className="text-base opacity-90">
            {event.details.isBuy ? 'Bought' : 'Sold'} for {event.details.total.toLocaleString()} credits
          </p>
        )}
      </div>
    </motion.div>
  );
});

EventItem.displayName = 'EventItem';