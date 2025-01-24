import React from 'react';
import { User, MessageSquare } from 'lucide-react';
import { LocationNPC } from '../../types/locations';
import { useNarrativeStore } from '../../stores/useNarrativeStore';

interface NPCListProps {
  npcs: LocationNPC[];
  onSelectNPC: (npcId: string) => void;
}

export const NPCList: React.FC<NPCListProps> = ({ npcs, onSelectNPC }) => {
  const { completedNarratives, activeNarratives } = useNarrativeStore();

  const hasAvailableNarrative = (npcId: string): boolean => {
    return !completedNarratives.includes(npcId) &&
           !activeNarratives.includes(npcId);
  };

  if (!npcs || npcs.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No one of interest here at the moment
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full flex flex-col grow">
      {npcs.map(npc => (
        <article key={'npc' + npc.id} className="promontory rounded-lg p-4 w-full">
          <div className="prose">
            <h2 className="flex items-center gap-2 my-2 cursor-pointer text-black mt-0" onClick={() => onSelectNPC(npc.id)}>
              {npc.name}
              {hasAvailableNarrative(npc.id) && (
                <MessageSquare className="w-4 h-4 text-blue-400 animate-pulse ml-4 mt-0" />
              )}
            </h2>
            <p className="text-gray-500"><em>{npc.title}</em></p>
            <p className="text-gray-600">{npc.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};