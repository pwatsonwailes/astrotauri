import React, { useState } from 'react';
import { Character } from '../../types/nexus';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

interface CharacterPaneProps {
  characters: Character[];
}

export const CharacterPane: React.FC<CharacterPaneProps> = ({ characters }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-lg rounded-lg w-80 overflow-hidden">
      <div className="p-4 bg-slate-800 text-white">
        <h2 className="text-xl font-semibold">Characters</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {characters.map((character) => (
          <div key={character.id} className="cursor-pointer">
            <div
              className="p-4 hover:bg-gray-50 flex items-center justify-between"
              onClick={() => setSelectedCharacter(
                selectedCharacter === character.id ? null : character.id
              )}
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">{character.name}</span>
              </div>
              {selectedCharacter === character.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            
            {selectedCharacter === character.id && (
              <div className="px-4 py-3 bg-gray-50">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Background</h3>
                  <p className="mt-1 text-sm text-gray-900">{character.background}</p>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
                  <p className="mt-1 text-sm text-gray-900">{character.status}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">History</h3>
                  <div className="mt-1 space-y-2">
                    {character.history.map((event, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-gray-500">
                          {new Date(event.timestamp).toLocaleDateString()}:
                        </span>
                        <span className="ml-2 text-gray-900">{event.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};