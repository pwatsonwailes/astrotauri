import React from 'react';
import { Radio, MessageSquare } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TRADE_OFFERS = [
  {
    id: 'tech_exchange',
    name: 'Technology Exchange',
    description: 'Trade materials for advanced technology.',
    cost: {
      materials: 30
    },
    reward: {
      tech: 20
    },
    influence: 2
  },
  {
    id: 'material_purchase',
    name: 'Bulk Material Purchase',
    description: 'Buy materials at a discounted rate.',
    cost: {
      credits: 300
    },
    reward: {
      materials: 50
    },
    influence: 1
  }
];

export const Communications: React.FC = () => {
  const { resources, updateResources } = useGameStore();

  const canAcceptOffer = (cost: Partial<typeof resources>) => {
    return Object.entries(cost).every(
      ([key, value]) => resources[key as keyof typeof resources] >= (value || 0)
    );
  };

  const acceptOffer = (offer: typeof TRADE_OFFERS[0]) => {
    if (!canAcceptOffer(offer.cost)) return;

    // Deduct costs
    updateResources(
      Object.entries(offer.cost).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: -(value || 0)
      }), {})
    );

    // Add rewards and influence
    updateResources({
      ...offer.reward,
      influence: offer.influence
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Radio className="w-5 h-5" />
        <h2 className="text-xl font-bold">Communications</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {TRADE_OFFERS.map((offer) => {
          const canAccept = canAcceptOffer(offer.cost);

          return (
            <div
              key={offer.id}
              className={`bg-gray-800 rounded-lg p-6 ${
                canAccept ? 'cursor-pointer hover:bg-gray-700' : 'opacity-75'
              }`}
              onClick={() => canAccept && acceptOffer(offer)}
            >
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium">{offer.name}</h3>
              </div>

              <p className="text-gray-400 mb-4">{offer.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Cost</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(offer.cost).map(([key, value]) => (
                      <span
                        key={key}
                        className={`px-2 py-1 rounded text-xs
                          ${resources[key as keyof typeof resources] >= (value || 0)
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-red-900/50 text-red-300'
                          }`}
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Reward</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(offer.reward).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 rounded text-xs bg-purple-900/50 text-purple-300"
                      >
                        {key}: +{value}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded text-xs bg-blue-900/50 text-blue-300">
                      influence: +{offer.influence}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};