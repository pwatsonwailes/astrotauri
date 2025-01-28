import React from 'react';
import { MessageSquare } from 'lucide-react';
import { LocationNPC } from '../../types/locations';
import { useNarrativeStore } from '../../stores/useNarrativeStore';
import { useStoryStore } from '../../stores/useStoryStore';
import { checkNarrativeAvailability } from '../../utils/narrative/checkAvailability';

interface NPCListProps {
  npcs: LocationNPC[];
  onSelectNPC: (npcId: string) => void;
}

export const NPCList: React.FC<NPCListProps> = ({ npcs, onSelectNPC }) => {
  const { completedNarratives, activeNarratives } = useNarrativeStore();
  const storyState = useStoryStore();

  const isNarrativeAvailable = (npc: LocationNPC): boolean => {
    // Check if NPC has narrative requirements
    if (npc.narrativeRequirements) {
      return npc.narrativeRequirements.some(req => {
        switch (req.type) {
          case 'story':
            return storyState.currentChapterIndex > req.chapterId! || 
              (storyState.currentChapterIndex === req.chapterId! && 
               storyState.currentNodeIndex >= req.nodeId!);
          
          case 'narrative':
            return completedNarratives.includes(req.narrativeId!);
          
          case 'turns':
            const relatedNarrative = completedNarratives.find(n => n === req.narrativeId);
            if (!relatedNarrative) return false;
            // Would need to track completion turn and compare with current turn
            return true; // Implement turn tracking logic
          
          default:
            return false;
        }
      });
    }

    // If no requirements, check if they have any available narratives
    return npc.availableNarratives.some(narrativeId => 
      !completedNarratives.includes(narrativeId) &&
      !activeNarratives.includes(narrativeId)
    );
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
      {npcs.map(npc => {
        const hasAvailableNarrative = isNarrativeAvailable(npc);
        
        return (
          <article key={'npc' + npc.id} className="promontory rounded-lg p-4 w-full">
            <div className="prose">
              <h2 className="flex items-center gap-2 my-2 cursor-pointer text-black mt-0" onClick={() => onSelectNPC(npc.id)}>
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