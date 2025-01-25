import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { Faction } from '../../types/factions';
import { GoalCard } from '../goals/GoalCard';

interface FactionGoalsProps {
  faction: Faction;
}

export const FactionGoals: React.FC<FactionGoalsProps> = ({ faction }) => {
  const { goals, credits, energyPoints, activateGoal, investInGoal } = useGameStore();

  const factionGoals = goals.filter(goal => 
    goal.factionId === faction.id && goal.status === 'available'
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Available Actions</h3>
        <div className="text-base text-gray-400">
          {factionGoals.length} actions available
        </div>
      </div>

      <div className="grid gap-3">
        {factionGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            selected={false}
            onClick={() => {}}
            onInvest={(amount) => investInGoal(goal.id, 'energy', amount)}
            maxEnergy={energyPoints}
            onActivate={() => activateGoal(goal.id)}
          />
        ))}
        
        {factionGoals.length === 0 && (
          <div className="text-gray-400 text-center py-8">
            No actions available from this faction
          </div>
        )}
      </div>
    </div>
  );
};