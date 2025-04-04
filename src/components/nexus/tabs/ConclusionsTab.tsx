import React from 'react';
import { useGameStore } from '../../../store/gameStore';

export const ConclusionsTab: React.FC = () => {
  const { conclusions, updateConclusion } = useGameStore();

  const handleBeliefChange = (id: string, value: number) => {
    updateConclusion(id, { belief: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Conclusions</h2>
      
      <div className="divide-y divide-gray-200">
        {conclusions.map(conclusion => (
          <div
            key={conclusion.id}
            className={`py-4 ${conclusion.isLocked ? 'opacity-50' : ''}`}
          >
            <h3 className="text-lg font-medium text-slate-900">
              {conclusion.title}
            </h3>
            
            {!conclusion.isLocked && (
              <>
                <p className="mt-2 text-slate-600">
                  {conclusion.description}
                </p>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Belief Level
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={conclusion.belief}
                    onChange={(e) => handleBeliefChange(conclusion.id, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Disbelief</span>
                    <span>Uncertain</span>
                    <span>Belief</span>
                  </div>
                </div>

                {conclusion.relatedCharacters && conclusion.relatedCharacters.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Related Characters</h4>
                    <div className="flex flex-wrap gap-2">
                      {conclusion.relatedCharacters.map(charId => (
                        <span 
                          key={charId}
                          className="px-2 py-1 text-sm bg-slate-100 text-slate-700 rounded"
                        >
                          {charId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};