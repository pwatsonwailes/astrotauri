import React, { useState } from 'react';
import { Radio, MessageSquare, ChevronLeft, AlertCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TRADE_OFFERS = [
  {
    id: 'tech_exchange',
    name: 'Technology Exchange',
    description: 'Trade materials for advanced technology.',
    type: 'exchange',
    cost: {
      materials: 30
    },
    reward: {
      tech: 20
    },
    influence: 2,
    riskLevel: 'low'
  },
  {
    id: 'material_purchase',
    name: 'Bulk Material Purchase',
    description: 'Buy materials at a discounted rate.',
    type: 'purchase',
    cost: {
      credits: 300
    },
    reward: {
      materials: 50
    },
    influence: 1,
    riskLevel: 'low'
  },
  {
    id: 'influence_trade',
    name: 'Political Favor',
    description: 'Exchange resources for political influence.',
    type: 'influence',
    cost: {
      credits: 500,
      tech: 15
    },
    reward: {
      influence: 10
    },
    influence: 0,
    riskLevel: 'medium'
  }
];

export const Market: React.FC = () => {
  const { resources, updateResources } = useGameStore();
  const [selectedOffer, setSelectedOffer] = useState<typeof TRADE_OFFERS[0] | null>(null);
  const [tradeStatus, setTradeStatus] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const canAcceptOffer = (cost: Partial<typeof resources>) => {
    return Object.entries(cost).every(
      ([key, value]) => resources[key as keyof typeof resources] >= (value || 0)
    );
  };

  const acceptOffer = (offer: typeof TRADE_OFFERS[0]) => {
    if (!canAcceptOffer(offer.cost)) {
      setTradeStatus({
        message: 'Insufficient resources for trade',
        type: 'error'
      });
      return;
    }

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

    setTradeStatus({
      message: 'Trade completed successfully',
      type: 'success'
    });

    // Clear status after 3 seconds
    setTimeout(() => {
      setTradeStatus(null);
    }, 3000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exchange':
        return 'bg-blue-100 text-blue-800';
      case 'purchase':
        return 'bg-green-100 text-green-800';
      case 'influence':
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
      {/* Left Column - Trade List */}
      <div className="overflow-auto pr-4">
        <div className="flex items-center space-x-2 mb-4">
          <Radio className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Market</h2>
        </div>

        <div className="space-y-4">
          {TRADE_OFFERS.map((offer) => {
            const canAccept = canAcceptOffer(offer.cost);
            
            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOffer(selectedOffer?.id === offer.id ? null : offer)}
                className={`bg-white/70 rounded-lg p-4 cursor-pointer transition-all border relative ${
                  selectedOffer?.id === offer.id 
                    ? 'border-orange-300 ring-1 ring-orange-300' 
                    : 'border-slate-200 hover:border-orange-200'
                } ${!canAccept ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-slate-800">{offer.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(offer.type)}`}>
                      {offer.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(offer.riskLevel)}`}>
                      {offer.riskLevel} risk
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{offer.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column - Trade Details */}
      <div className="overflow-auto pl-4 border-l border-slate-200">
        {selectedOffer ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedOffer(null)}
                className="flex items-center text-slate-600 hover:text-orange-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Close</span>
              </button>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(selectedOffer.type)}`}>
                  {selectedOffer.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getRiskLevelColor(selectedOffer.riskLevel)}`}>
                  {selectedOffer.riskLevel} risk
                </span>
              </div>
            </div>

            {tradeStatus && (
              <div
                className={`p-4 rounded-lg ${
                  tradeStatus.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <p>{tradeStatus.message}</p>
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedOffer.name}</h2>
              <p className="text-slate-600 mb-6">{selectedOffer.description}</p>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Cost</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedOffer.cost).map(([key, value]) => (
                      <span
                        key={key}
                        className={`px-2 py-1 rounded text-xs ${
                          resources[key as keyof typeof resources] >= (value || 0)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Reward</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedOffer.reward).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800"
                      >
                        {key}: +{value}
                      </span>
                    ))}
                    {selectedOffer.influence > 0 && (
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                        influence: +{selectedOffer.influence}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => acceptOffer(selectedOffer)}
                  disabled={!canAcceptOffer(selectedOffer.cost)}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    canAcceptOffer(selectedOffer.cost)
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {canAcceptOffer(selectedOffer.cost) ? 'Accept Trade' : 'Insufficient Resources'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a trade to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};