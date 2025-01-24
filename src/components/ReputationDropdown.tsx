import React, { useState } from 'react';
import { Award, ChevronDown } from 'lucide-react';
import { Faction } from '../types/game';
import { Tooltip } from './Tooltip';

interface ReputationDropdownProps {
  factions: Faction[];
}

export const ReputationDropdown: React.FC<ReputationDropdownProps> = ({ factions }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Tooltip content="Faction Reputations - Your standing with various factions" isLeft={false}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-help"
        >
          <Award size={20} className="text-blue-400" />
          <ChevronDown size={16} className="text-blue-400" />
        </button>
      </Tooltip>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl z-50 p-2">
          {factions.map(corp => (
            <div
              key={corp.id}
              className="p-2 hover:bg-gray-800 rounded-md transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">{corp.name}</span>
                <span className={`text-base ${
                  corp.reputation > 0 ? 'text-green-400' :
                  corp.reputation < 0 ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {corp.reputation > 0 ? '+' : ''}{corp.reputation}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{corp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};