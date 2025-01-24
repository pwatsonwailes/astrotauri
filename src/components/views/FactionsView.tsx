import React, { useState } from 'react';
import { History, CreditCard, TrendingUp, Building2 } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { useEventStore } from '../../stores/useEventStore';
import { FactionDetails } from '../factions/FactionDetails';
import { FactionGoals } from '../factions/FactionGoals';
import { FactionHistory } from '../factions/FactionHistory';
import { FactionRelations } from '../factions/FactionRelations';

export const FactionsView: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('details');

  // Game state
  const { factions, credits } = useGameStore();

  // Events
  const { events } = useEventStore();

  // Set initial selected faction if none selected
  React.useEffect(() => {
    if (!selectedFaction && factions.length > 0) {
      setSelectedFaction(factions[0]);
    }
  }, [factions, selectedFaction]);

  const tabs = [
    { id: 'details', label: 'Details', icon: Building2 },
    { id: 'goals', label: 'Goals', icon: CreditCard },
    { id: 'history', label: 'History', icon: History },
    { id: 'relations', label: 'Relations', icon: TrendingUp },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Faction List */}
          <div className="space-y-2">
            {factions.map(faction => (
              <button
                key={faction.id}
                onClick={() => setSelectedFaction(faction)}
                className={`
                  w-full p-4 rounded-lg text-left transition-colors
                  ${selectedFaction?.id === faction.id
                    ? 'hover:bg-amber-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                <div className="font-medium">{faction.name}</div>
                <div className="text-base opacity-75">{faction.description}</div>
              </button>
            ))}
          </div>

          {/* Faction Details */}
          {selectedFaction && (
            <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6">
              <div className="border-b border-gray-700 mb-6">
                <div className="flex gap-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 -mb-px
                        ${activeTab === tab.id
                          ? 'text-amber-500 text-white'
                          : 'text-gray-400 hover:text-gray-300'
                        }
                      `}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-white">
                {activeTab === 'details' && (
                  <FactionDetails faction={selectedFaction} />
                )}
                {activeTab === 'goals' && (
                  <FactionGoals
                    faction={selectedFaction}
                    credits={credits}
                  />
                )}
                {activeTab === 'history' && (
                  <FactionHistory 
                    faction={selectedFaction}
                    events={events}
                  />
                )}
                {activeTab === 'relations' && (
                  <FactionRelations
                    faction={selectedFaction}
                    factions={factions}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};