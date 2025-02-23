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
        <Tool className="w-5 h-5" />
        <h2 className="text-xl font-bold">Crafting Station</h2>
      </div>

      {craftingStatus && (
        <div
          className={`p-3 rounded-lg ${
            craftingStatus.type === 'success'
              ? 'bg-green-900/50 text-green-300'
              : 'bg-red-900/50 text-red-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <p>{craftingStatus.message}</p>
          </div>
        </div>
      )}

      {manufacturingQueue.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Manufacturing Queue</h3>
          <div className="space-y-2">
            {manufacturingQueue.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-400">
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
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all
                ${isSelected ? 'ring-2 ring-purple-500' : 'hover:bg-gray-700'}
                ${!craftable && 'opacity-75'}
                ${inQueue && 'opacity-50'}`}
              onClick={() => setSelectedRecipe(isSelected ? null : recipe.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center space-x-2">
                    <Hammer className="w-4 h-4 text-gray-400" />
                    <span>{recipe.name}</span>
                  </h3>
                  {isSelected && (
                    <p className="text-sm text-gray-400 mt-1">{recipe.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-gray-700 capitalize">
                    {recipe.type}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Required Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(recipe.cost).map(([resource, amount]) => (
                        <div
                          key={resource}
                          className={`text-xs px-2 py-1 rounded
                            ${
                              resources[resource as keyof Resources] >= (amount || 0)
                                ? 'bg-green-900/50 text-green-300'
                                : 'bg-red-900/50 text-red-300'
                            }`}
                        >
                          {resource}: {amount}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Manufacturing time: {recipe.turnsToComplete} turns
                    </span>
                    <button
                      onClick={() => handleCraft(recipe)}
                      disabled={!craftable || inQueue}
                      className={`py-2 px-4 rounded-lg transition-colors
                        ${
                          craftable && !inQueue
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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