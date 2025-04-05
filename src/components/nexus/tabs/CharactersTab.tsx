import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

export const CharactersTab: React.FC = () => {
  const { characters } = useGameStore();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Characters</h2>
      
      <div className="divide-y divide-gray-200">
        {(Array.isArray(characters) ? characters : []).map((character) => (
          <div
            key={character.id}
            className={`${character.isLocked ? 'opacity-50' : ''}`}
          >
            <div
              className="py-4 cursor-pointer"
              onClick={() => setSelectedCharacter(
                selectedCharacter === character.id ? null : character.id
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-900">
                    {character.name}
                  </span>
                </div>
                {selectedCharacter === character.id ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </div>
            </div>
            
            {!character.isLocked && selectedCharacter === character.id && (
              <div className="px-4 py-3 bg-slate-50 rounded-lg mb-4">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-slate-500">
                    Background
                  </h3>
                  <p className="mt-1 text-sm text-slate-900">
                    {character.background}
                  </p>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-slate-500">
                    Current Status
                  </h3>
                  <p className="mt-1 text-sm text-slate-900">
                    {character.status}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-500">
                    History
                  </h3>
                  <div className="mt-1 space-y-2">
                    {character.history.map((event, index) => (
                      <div key={index} className="text-sm">
                        <span className="text-slate-500">
                          {new Date(event.timestamp).toLocaleDateString()}:
                        </span>
                        <span className="ml-2 text-slate-900">
                          {event.event}
                        </span>
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