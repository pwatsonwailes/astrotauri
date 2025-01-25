import React from 'react';
import { CharacterGoal } from '../../types/characters';
import { GoalCard } from '../goals/GoalCard';
import { useGameStore } from '../../stores/useGameStore';

interface CharacterGoalsProps {
  goals: CharacterGoal[];
  relationship: number;
}

export const CharacterGoals: React.FC<CharacterGoalsProps> = ({
  goals,
  relationship
}) => {
  const { energyPoints, activateGoal, investInGoal } = useGameStore();

  const availableGoals = goals.filter(goal => 
    goal.status !== 'archived' && 
    relationship >= goal.relationshipRequirement
  );

  if (availableGoals.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No available actions
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Available Actions</h3>
      <div className="space-y-4">
        {availableGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onActivate={() => activateGoal(goal.id)}
            onInvest={(amount) => investInGoal(goal.id, 'energy', amount)}
            maxEnergy={energyPoints || 0}
          />
        ))}
      </div>
    </div>
  );
};