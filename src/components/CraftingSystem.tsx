import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { PenTool as Tool, Hammer, AlertCircle, ChevronLeft } from 'lucide-react';
import { Resources } from '../types/game';

type CraftingRecipe = {
  id: string;
  name: string;
  description: string;
  type: 'tool' | 'upgrade' | 'special';
  cost: Partial<Resources>;
  turnsToComplete: number;
  riskLevel: 'low' | 'medium' | 'high';
};

const CRAFTING_RECIPES: CraftingRecipe[] = [
  {
    id: 'scanner_mk2',
    name: 'Scanner Mk.II',
    description: 'An upgraded scanner that reveals hidden resources and quest opportunities.',
    type: 'tool',
    cost: {
      materials: 30,
      tech: 15,
    },
    turnsToComplete: 3,
    riskLevel: 'low'
  },
  {
    id: 'shield_booster',
    name: 'Shield Booster',
    description: 'Improves shield regeneration during risky missions.',
    type: 'upgrade',
    cost: {
      materials: 25,
      tech: 20,
      credits: 500,
    },
    turnsToComplete: 2,
    riskLevel: 'medium'
  },
  {
    id: 'quantum_analyzer',
    name: 'Quantum Analyzer',
    description: 'Advanced tool for analyzing anomalies and predicting quest outcomes.',
    type: 'special',
    cost: {
      materials: 40,
      tech: 30,
      influence: 5,
    },
    turnsToComplete: 4,
    riskLevel: 'high'
  },
];

export const CraftingSystem: React.FC = () => {
  const { resources, manufacturingQueue, addManufacturingItem } = useGameStore();
  const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe | null>(null);
  const [craftingStatus, setCraftingStatus] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const canCraft = (recipe: CraftingRecipe) => {
    return Object.entries(recipe.cost).every(
      ([resource, amount]) => resources[resource as keyof Resources] >= (amount || 0)
    );
  };

  const handleCraft = (recipe: CraftingRecipe) => {
    if (!canCraft(recipe)) {
      setCraftingStatus({
        message: 'Insufficient resources for crafting',
        type: 'error',
      });
      return;
    }

    if (manufacturingQueue.some(item => item.id === recipe.id)) {
      setCraftingStatus({
        message: 'This item is already being manufactured',
        type: 'error',
      });
      return;
    }

    // Add to manufacturing queue
    addManufacturingItem({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      type: recipe.type,
      turnsRemaining: recipe.turnsToComplete
    });

    setCraftingStatus({
      message: `Started manufacturing ${recipe.name}`,
      type: 'success',
    });

    // Clear status after 3 seconds
    setTimeout(() => {
      setCraftingStatus(null);
    }, 3000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tool':
        return 'bg-blue-100 text-blue-800';
      case 'upgrade':
        return 'bg-green-100 text-green-800';
      case 'special':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Left Column - Recipe List */}
      <div className="overflow-auto pr-4">
        <div className="flex items-center space-x-2 mb-4">
          <Tool className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Engineering</h2>
        </div>

        {manufacturingQueue.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Manufacturing Queue</h3>
            <div className="space-y-2">
              {manufacturingQueue.map((item) => (
                <div key={item.id} className="bg-white rounded p-3 border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">{item.name}</span>
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.turnsRemaining} {item.turnsRemaining === 1 ? 'turn' : 'turns'} remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {CRAFTING_RECIPES.map((recipe) => {
            const canStart = canCraft(recipe);
            const inQueue = manufacturingQueue.some(item => item.id === recipe.id);
            
            return (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(selectedRecipe?.id === recipe.id ? null : recipe)}
                className={`bg-white/70 rounded-lg p-4 cursor-pointer transition-all border relative ${
                  selectedRecipe?.id === recipe.id 
                    ? 'border-orange-300 ring-1 ring-orange-300' 
                    : 'border-slate-200 hover:border-orange-200'
                } ${!canStart || inQueue ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Hammer className="w-5 h-5 text-slate-600" />
                    <h3 className="font-medium text-slate-800">{recipe.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(recipe.type)}`}>
                      {recipe.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(recipe.riskLevel)}`}>
                      {recipe.riskLevel} risk
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{recipe.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column - Recipe Details */}
      <div className="overflow-auto pl-4 border-l border-slate-200">
        {selectedRecipe ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="flex items-center text-slate-600 hover:text-orange-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Close</span>
              </button>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(selectedRecipe.type)}`}>
                  {selectedRecipe.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getRiskLevelColor(selectedRecipe.riskLevel)}`}>
                  {selectedRecipe.riskLevel} risk
                </span>
              </div>
            </div>

            {craftingStatus && (
              <div
                className={`p-4 rounded-lg ${
                  craftingStatus.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <p>{craftingStatus.message}</p>
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedRecipe.name}</h2>
              <p className="text-slate-600 mb-6">{selectedRecipe.description}</p>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Required Resources</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedRecipe.cost).map(([resource, amount]) => (
                      <span
                        key={resource}
                        className={`px-2 py-1 rounded text-xs ${
                          resources[resource as keyof Resources] >= (amount || 0)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {resource}: {amount}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Manufacturing Details</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      Time: {selectedRecipe.turnsToComplete} turns
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleCraft(selectedRecipe)}
                  disabled={!canCraft(selectedRecipe) || manufacturingQueue.some(item => item.id === selectedRecipe.id)}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    canCraft(selectedRecipe) && !manufacturingQueue.some(item => item.id === selectedRecipe.id)
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {manufacturingQueue.some(item => item.id === selectedRecipe.id)
                    ? 'Already in Production'
                    : canCraft(selectedRecipe)
                    ? 'Start Manufacturing'
                    : 'Insufficient Resources'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <Tool className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a recipe to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};