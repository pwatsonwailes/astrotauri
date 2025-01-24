import React from 'react';
import { LocationGoal } from '../../types/locations';
import { EnergyBar } from '../goals/EnergyBar';

interface GoalListProps {
  goals: LocationGoal[];
  onSelectGoal: (goalId: string) => void;
  onActivateGoal: (goalId: string) => void;
  onInvestInGoal: (goalId: string, type: string, amount: number) => void;
  selectedGoalId: string | null;
  energy: number;
}

export const GoalList: React.FC<GoalListProps> = ({
  goals,
  onSelectGoal,
  onActivateGoal,
  onInvestInGoal,
  selectedGoalId,
  energy
}) => {
  const filteredGoals = goals.filter(goal => {
    if (goal.source !== 'location') return false;

    return goal.status !== 'archived';
  });

  if (!filteredGoals || filteredGoals.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No available goals in this area
      </div>
    );
  }

  const handleActivateGoal = (goalId: string) => {
    onActivateGoal(goalId);
  };

  const handleInvestEnergy = (goalId: string, amount: number) => {
    // Prevent event bubbling
    event?.stopPropagation();
    onInvestInGoal(goalId, 'energy', amount);
  };

  return (
    <div className="space-y-4">
      {filteredGoals.map(goal => {
        const isSelected = selectedGoalId === goal.id;
        const isActive = goal.status === 'active';
        const isCompleted = goal.status === 'completed';
        const energyRequirement = goal.requirements.find(req => req.type === 'energy');
        const invested = goal.progress.energyInvested;
        const required = energyRequirement?.amount || 0;

        return (
          <article key={goal.id} className="p-4 promontory rounded-lg">
            <div className="prose flex items-start gap-4 cursor-pointer" onClick={() => onSelectGoal(goal.id)}>
              <div className="flex-1">
                <h2 className="mt-0 text-black">{goal.title}</h2>
                <p className="text-gray-600">{goal.description}</p>
                {goal.rewards && (
                  <div className="mt-2">
                    <span className="text-green-400">
                      Rewards: {goal.rewards.credits && `${goal.rewards.credits} credits`}
                      {goal.rewards.reputation && `, ${goal.rewards.reputation} reputation`}
                    </span>
                  </div>
                )}
                {goal.status === 'completed' && <p className="text-white mb-0">Goal completed</p>}
              </div>
            </div>

            {isSelected && (
              <div className="mt-4 space-y-4">
                {!isActive && !isCompleted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActivateGoal(goal.id);
                    }}
                    className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-700 text-white transition-colors"
                  >
                    Accept Goal
                  </button>
                )}

                {isActive && energyRequirement && (
                  <EnergyBar
                    invested={invested}
                    required={required}
                    maxInvestment={energy}
                    onInvest={(amount) => handleInvestEnergy(goal.id, amount)}
                  />
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};