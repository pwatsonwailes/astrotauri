import React from 'react';
import { Goal } from '../../types/goals';
import { CheckCircle, Circle } from 'lucide-react';

interface SubgoalsListProps {
  subgoals: { goalId: string; required: boolean }[];
  goals: Goal[];
  onSelectSubgoal: (goalId: string) => void;
  selectedGoalId: string | null;
}

export const SubgoalsList: React.FC<SubgoalsListProps> = ({
  subgoals,
  goals,
  onSelectSubgoal,
  selectedGoalId
}) => {
  return (
    <div className="space-y-3">
      {subgoals.map(subgoal => {
        const goal = goals.find(g => g.id === subgoal.goalId);
        if (!goal) return null;

        const isCompleted = goal.status === 'completed';
        const isSelected = selectedGoalId === goal.id;

        return (
          <button
            key={subgoal.goalId}
            onClick={() => onSelectSubgoal(goal.id)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
              ${isSelected ? 'bg-amber-400/20' : ''}
              ${isCompleted ? 'bg-green-900/20' : 'bg-gray-700/50'}
              hover:bg-amber-400/20
            `}
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <div className="flex-1">
              <div className="font-medium text-white">{goal.title}</div>
              <div className="text-sm text-gray-400">{goal.description}</div>
            </div>
            {subgoal.required && (
              <span className="text-xs px-2 py-1 bg-red-900/50 text-red-400 rounded-full">
                Required
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};