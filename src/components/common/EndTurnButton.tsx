import React from 'react';
import { RotateCw } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';

interface EndTurnButtonProps {
  onEndTurn: () => void;
}

export const EndTurnButton: React.FC<EndTurnButtonProps> = ({ onEndTurn }) => {
  const { events } = useEventStore();
  console.log(events)

  // Check if any housing completion event exists in the event log
  const hasCompletedHousing = events.some(
    event => event.type === 'success' && event.message.includes('Find Accommodation')
  );

  if (!hasCompletedHousing) {
    return (
      <button
        disabled
        className='flex items-center gap-2 px-4 py-2 text-base rounded-lg convex cursor-not-allowed text-gray-400'
      >
        <RotateCw className="w-5 h-5 text-gray-400" />
        Find Housing First
      </button>
    );
  }

  return (
    <button
      onClick={onEndTurn}
      className='flex items-center gap-2 px-4 py-2 text-base rounded-lg text-white convex rowdy'
    >
      <RotateCw className="w-5 h-5 text-inherit" />
      End Turn
    </button>
  );
};