import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package, Info } from 'lucide-react';

export const Inventory: React.FC = () => {
  const inventory = useGameStore((state) => state.inventory);
  const removeInventoryItem = useGameStore((state) => state.removeInventoryItem);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const groupedItems = inventory.reduce((acc, item) => {
    const existing = acc.find(i => i.type === item.type);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ type: item.type, items: [item] });
    }
    return acc;
  }, [] as { type: string; items: typeof inventory }[]);

  return (
    <div className="space-y-4">
      {groupedItems.map(group => (
        <div key={group.type} className="space-y-2">
          <h3 className="text-lg font-semibold capitalize">{group.type}s</h3>
          <div className="grid grid-cols-2 gap-2">
            {group.items.map(item => (
              <div
                key={item.id}
                className={`bg-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors
                  ${selectedItem === item.id ? 'ring-2 ring-purple-500' : 'hover:bg-gray-700'}`}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">x{item.quantity}</span>
                </div>
                
                {selectedItem === item.id && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-300">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeInventoryItem(item.id, 1);
                        }}
                        className="text-xs px-2 py-1 bg-red-900/50 text-red-300 rounded hover:bg-red-900/70 transition-colors"
                      >
                        Discard
                      </button>
                      <button
                        className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded hover:bg-blue-900/70 transition-colors flex items-center"
                      >
                        <Info className="w-3 h-3 mr-1" />
                        Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {inventory.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Your inventory is empty</p>
        </div>
      )}
    </div>
  );
};