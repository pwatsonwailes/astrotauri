import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { NotesTab } from './tabs/NotesTab';
import { ConclusionsTab } from './tabs/ConclusionsTab';
import { CharactersTab } from './tabs/CharactersTab';
import { TopicsTab } from './tabs/TopicsTab';

type TabType = 'notes' | 'conclusions' | 'characters' | 'topics';

export const NexusBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const { characters, topics } = useGameStore();

  const tabClass = (tab: TabType) => `
    px-4 py-2 text-sm font-medium rounded-t-lg
    ${activeTab === tab 
      ? 'bg-white text-slate-900 shadow-lg' 
      : 'bg-slate-700 text-white hover:bg-slate-600'}
  `;

  return (
    <div className="min-h-screen bg-slate-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex">
        <div className="flex-1 mr-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('notes')}
              className={tabClass('notes')}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('conclusions')}
              className={tabClass('conclusions')}
            >
              Conclusions
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={tabClass('characters')}
            >
              Characters
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={tabClass('topics')}
            >
              Topics
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            {activeTab === 'notes' && <NotesTab />}
            {activeTab === 'conclusions' && <ConclusionsTab />}
            {activeTab === 'characters' && <CharactersTab />}
            {activeTab === 'topics' && <TopicsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};