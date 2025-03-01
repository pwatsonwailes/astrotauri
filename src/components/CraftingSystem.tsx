import React from 'react';
import { useGameStore } from '../store/gameStore';
import { PenTool as Tool, Hammer, AlertCircle } from 'lucide-react';
import { Resources } from '../types/game';

type CraftingRecipe = {
  id: string;
  name: string;
  description: string;
  type: 'tool' | 'upgrade' | 'special';
  cost: Partial<Resources>;
  turnsToComplete: number;
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
    turnsToComplete: 3
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
    turnsToComplete: 2
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
    turnsToComplete: 4
  },
];

export const CraftingSystem: React.FC = () => {
  const { resources, manufacturingQueue, addManufacturingItem } = useGameStore();
  const [selectedRecipe, setSelectedRecipe] = React.useState<string | null>(null);
  const [craftingStatus, setCraftingStatus] = React.useState<{
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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Tool className="w-5 h-5 text-slate-600" />
        <h2 className="text-xl font-bold text-slate-800">Engineering</h2>
      </div>

      {craftingStatus && (
        <div
          className={`p-3 rounded-lg ${
            craftingStatus.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <p>{craftingStatus.message}</p>
          </div>
        </div>
      )}

      {manufacturingQueue.length > 0 && (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
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

      <div className="grid grid-cols-1 gap-4">
        {CRAFTING_RECIPES.map((recipe) => {
          const isSelected = selectedRecipe === recipe.id;
          const craftable = canCraft(recipe);
          const inQueue = manufacturingQueue.some(item => item.id === recipe.id);

          return (
            <div
              key={recipe.id}
              className={`bg-slate-50 rounded-lg p-4 cursor-pointer transition-all border
                ${isSelected ? 'border-orange-300 ring-1 ring-orange-300' : 'border-slate-200 hover:border-orange-200'}
                ${!craftable && 'opacity-75'}
                ${inQueue && 'opacity-50'}`}
              onClick={() => setSelectedRecipe(isSelected ? null : recipe.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center space-x-2 text-slate-800">
                    <Hammer className="w-4 h-4 text-slate-500" />
                    <span>{recipe.name}</span>
                  </h3>
                  {isSelected && (
                    <p className="text-sm text-slate-600 mt-1">{recipe.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-slate-200 text-slate-700 capitalize">
                    {recipe.type}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Required Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(recipe.cost).map(([resource, amount]) => (
                        <div
                          key={resource}
                          className={`text-xs px-2 py-1 rounded
                            ${
                              resources[resource as keyof Resources] >= (amount || 0)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {resource}: {amount}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Manufacturing time: {recipe.turnsToComplete} turns
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCraft(recipe);
                      }}
                      disabled={!craftable || inQueue}
                      className={`py-2 px-4 rounded-lg transition-colors text-sm
                        ${
                          craftable && !inQueue
                            ? 'bg-orange-600 hover:bg-orange-700 text-white'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                      {inQueue ? 'In Production' : craftable ? 'Start Manufacturing' : 'Insufficient Resources'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};