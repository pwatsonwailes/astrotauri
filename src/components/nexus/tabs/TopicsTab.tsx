import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';

export const TopicsTab: React.FC = () => {
  const { topics, characters } = useGameStore();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Topics</h2>
      
      <div className="divide-y divide-gray-200">
        {(Array.isArray(topics) ? topics : []).map((topic) => (
          <div
            key={topic.id}
            className={`${topic.isLocked ? 'opacity-50' : ''}`}
          >
            <div
              className="py-4 cursor-pointer"
              onClick={() => setSelectedTopic(
                selectedTopic === topic.id ? null : topic.id
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-slate-500" />
                  <span className="font-medium text-slate-900">
                    {topic.title}
                  </span>
                </div>
                {selectedTopic === topic.id ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </div>
            </div>
            
            {!topic.isLocked && selectedTopic === topic.id && (
              <div className="px-4 py-3 bg-slate-50 rounded-lg mb-4">
                <p className="text-sm text-slate-900 mb-4">
                  {topic.description}
                </p>
                
                {topic.relatedCharacters.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">
                      Related Characters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedCharacters.map(charId => {
                        const character = characters.find(c => c.id === charId);
                        if (!character || character.isLocked) return null;
                        return (
                          <span
                            key={charId}
                            className="px-2 py-1 text-sm bg-slate-200 text-slate-700 rounded-md"
                          >
                            {character.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {topic.relatedTopics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedTopics.map(relatedId => {
                        const relatedTopic = topics.find(t => t.id === relatedId);
                        if (!relatedTopic || relatedTopic.isLocked) return null;
                        return (
                          <span
                            key={relatedId}
                            className="px-2 py-1 text-sm bg-slate-200 text-slate-700 rounded-md"
                          >
                            {relatedTopic.title}
                          </span>
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