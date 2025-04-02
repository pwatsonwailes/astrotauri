import React from 'react';
import { CharacterPane } from './CharacterPane';
import { GlossaryPane } from './GlossaryPane';
import { Character, GlossaryEntry } from '../../types/nexus';

interface InfoPanelProps {
  characters: Character[];
  glossaryEntries: GlossaryEntry[];
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ characters, glossaryEntries }) => {
  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-gray-100 shadow-lg overflow-y-auto divide-y divide-gray-200">
      <CharacterPane characters={characters} />
      <GlossaryPane entries={glossaryEntries} />
    </div>
  );
};