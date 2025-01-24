import React, { useState } from 'react';
import { Goal } from '../../types/goals';
import { GoalCard } from './GoalCard';

interface GoalsListProps {
  goals: Goal[];
  onSelectGoal: (goalId: string) => void;
  onActivateGoal: (goalId: string) => void;
  onInvestInGoal: (goalId: string, type: string, amount: number) => void;
  selectedGoalId: string | null;
  energy: number;
}

type GoalsTab = 'available' | 'active';

export const GoalsList: React.FC<GoalsListProps> = ({
  goals,
  onSelectGoal,
  onActivateGoal,
  onInvestInGoal,
  selectedGoalId,
  energy
}) => {
  const availableGoals = goals.filter(goal => {
    if (goal.source === 'location') return false;
    return goal.status === 'available' && goal.type === 'parentGoal';
    return (goal.status === 'active' || goal.status === 'completed') && goal.type === 'parentGoal';
  });

  const activeGoals = goals.filter(goal => {
    if (goal.source === 'location') return false;
    return (goal.status === 'active' || goal.status === 'completed') && goal.type === 'parentGoal';
  });

  const availableCount = availableGoals.length;
  const activeCount = activeGoals.length;

  return (
    <div className="py-4 space-y-6">
      <h3 className="w-full px-2 py-2 mt-0 mb-4 flex items-center gap-2 text-gray-600 text-lg">
        Active
        <span className="ml-2 px-2 py-0.5 text-sm bg-gray-800 text-white rounded-full">
          {activeCount}
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {activeCount > 0 && activeGoals.map(goal => (
          <div
            key={goal.id}
            className={selectedGoalId === goal.id ? 'rounded-lg' : ''}
          >
            <GoalCard
              goal={goal}
              selected={selectedGoalId === goal.id}
              onInvest={(amount) => onInvestInGoal(goal.id, 'energy', amount)}
              onClick={() => onSelectGoal(goal.id)}
              maxEnergy={energy}
            />
          </div>
        ))}
        
        {activeCount === 0 && (
          <div className="col-span-full text-center py-8 text-gray-600">
            No active activities
          </div>
        )}
      </div>

      <h3
        className="w-full px-2 py-2 mt-0 mb-4 flex items-center gap-2 text-gray-600 text-lg">
        Available
        <span className="ml-2 px-2 py-0.5 text-sm bg-gray-800 text-white rounded-full">
          {availableCount}
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {availableCount > 0 && availableGoals.map(goal => (
          <div
            key={goal.id}
            className={selectedGoalId === goal.id ? 'rounded-lg' : ''}
          >
            <GoalCard
              goal={goal}
              selected={selectedGoalId === goal.id}
              onActivate={(id) => onActivateGoal(id)}
              onInvest={(amount) => onInvestInGoal(goal.id, 'energy', amount)}
              onClick={() => onSelectGoal(goal.id)}
              maxEnergy={energy}
            />
          </div>
        ))}
        
        {availableCount === 0 && (
          <div className="col-span-full text-center py-8 text-gray-600">
            No available activities
          </div>
        )}
      </div>
    </div>
  );
};