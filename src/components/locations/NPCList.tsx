import React from 'react';
import { MessageSquare } from 'lucide-react';
import { NPCs } from '../../data/npcs';
import { useStoryStore } from '../../stores/useStoryStore';

interface NPCListProps {
  npcs: string[];
  onSelectNPC: (npcId: string) => void;
}

export const NPCList: React.FC<NPCListProps> = ({ npcs, onSelectNPC }) => {
  const { completedNarratives, activeNarratives } = useStoryStore();

  if (!npcs || npcs.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No one of interest here at the moment
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full flex flex-col grow">
      {npcs.map(npcId => {
        const npc = NPCs[npcId];
        if (!npc) return null;

        // Check if NPC has any available narratives
        const hasAvailableNarrative = npc.availableNarratives.some(narrativeId => 
          !completedNarratives.includes(narrativeId) &&
          !activeNarratives.includes(narrativeId)
        );
        
        return (
          <article key={npcId} className="promontory rounded-lg p-4 w-full">
            <div className="prose">
              <h2 className="flex items-center gap-2 my-2 cursor-pointer text-black mt-0" onClick={() => onSelectNPC(npcId)}>
                {npc.name}
                {hasAvailableNarrative && (
                  <MessageSquare className="w-4 h-4 text-blue-400 animate-pulse ml-4 mt-0" />
                )}
              </h2>
              <p className="text-gray-500"><em>{npc.title}</em></p>
              <p className="text-gray-600">{npc.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};