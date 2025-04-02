import React, { useState } from 'react';
import { GlossaryEntry } from '../../types/nexus';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';

interface GlossaryPaneProps {
  entries: GlossaryEntry[];
}

export const GlossaryPane: React.FC<GlossaryPaneProps> = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const unlockedEntries = entries.filter(entry => entry.unlocked);

  return (
    <div className="bg-white shadow-lg rounded-lg w-80 overflow-hidden">
      <div className="p-4 bg-slate-800 text-white">
        <h2 className="text-xl font-semibold">Glossary</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {unlockedEntries.map((entry) => (
          <div key={entry.id} className="cursor-pointer">
            <div
              className="p-4 hover:bg-gray-50 flex items-center justify-between"
              onClick={() => setSelectedEntry(
                selectedEntry === entry.id ? null : entry.id
              )}
            >
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">{entry.title}</span>
              </div>
              {selectedEntry === entry.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            
            {selectedEntry === entry.id && (
              <div className="px-4 py-3 bg-gray-50">
                <p className="text-sm text-gray-900 mb-3">{entry.description}</p>
                
                {entry.relatedEntries.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Related Entries</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.relatedEntries.map((relatedId) => {
                        const relatedEntry = entries.find(e => e.id === relatedId);
                        if (!relatedEntry?.unlocked) return null;
                        return (
                          <button
                            key={relatedId}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEntry(relatedId);
                            }}
                            className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                          >
                            {relatedEntry.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};