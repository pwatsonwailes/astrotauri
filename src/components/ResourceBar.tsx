import React from 'react';
import { CreditCard, Heart, Brain, Coins, Zap } from 'lucide-react';
import { ResourceItem } from './ResourceItem';
import { useTranslation } from '../hooks/useTranslation';

interface ResourceBarProps {
  credits: number;
  condition: number;
  stress: number;
  reputation: number;
  energyPoints: number;
  maxEnergy: number;
}

export const ResourceBar: React.FC<ResourceBarProps> = ({
  credits,
  condition,
  stress,
  reputation,
  energyPoints,
  maxEnergy,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-5 gap-4 p-4 text-gray-800 rounded-lg depressed">
      <ResourceItem
        Icon={CreditCard}
        value={credits}
        color="text-amber-400"
        tooltip={t.resources.credits}
      />
      
      <ResourceItem
        Icon={Heart}
        value={condition}
        color="text-red-400"
        tooltip={t.resources.condition}
        suffix="%"
      />
      
      <ResourceItem
        Icon={Brain}
        value={stress}
        color="text-purple-400"
        tooltip={t.resources.stress}
      />

      <ResourceItem
        Icon={Coins}
        value={reputation}
        color="text-red-500"
        tooltip={t.resources.reputation}
      />

      <ResourceItem
        Icon={Zap}
        value={energyPoints + ' / ' + maxEnergy}
        color="text-sky-500"
        tooltip={t.resources.energy}
      />
    </div>
  );
};