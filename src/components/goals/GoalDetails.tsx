import React from 'react';
import { Goal } from '../../types/goals';
import { X, ChevronRight } from 'lucide-react';
import { SubgoalsList } from './SubgoalsList';

interface GoalDetailsProps {
  goal: Goal;
  goals: Goal[];
  onClose: () => void;
  onSelectSubgoal?: (goalId: string) => void;
  selectedSubgoalId?: string | null;
  onBack?: () => void;
}

export const GoalDetails: React.FC<GoalDetailsProps> = ({ 
  goal, 
  goals, 
  onClose,
  onSelectSubgoal,
  selectedSubgoalId,
  onBack
}) => {
  const isMainGoal = 'subgoals' in goal;
  const filteredRequirements = goal.requirements.filter(req => req.amount !== null);

  return (
    <div className="p-6 space-y-6 promontory rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-600">{goal.title}</h2>
            {/*<p className="text-gray-500 mt-3 italic">Goal {goal.status}</p>*/}
            <p className="text-gray-600 mt-3">{goal.description}</p>
            {goal?.progress?.turnsRemaining && goal.progress.turnsRemaining > 0 && (<p className="text-gray-600 mt-4"><strong>Turns remaining</strong>: {goal.progress.completionTimer}</p>)}
          </div>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {!onBack && (
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isMainGoal && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-600">Required Steps</h3>
          <SubgoalsList 
            subgoals={goal.subgoals}
            goals={goals}
            onSelectSubgoal={onSelectSubgoal!}
            selectedGoalId={selectedSubgoalId}
          />
        </div>
      )}

      {filteredRequirements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-600">Requirements</h3>
          <div className="space-y-2">
            {filteredRequirements.map((req, index) => {
              return (
                <div key={index} className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 text-amber-400 mr-2" />
                  {req.amount} {req.type}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {goal?.rewards && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-600"><strong>Rewards</strong></h3>
          <div className="space-y-2">
            {Object.entries(goal.rewards).map(([key, value]) => (
              value && (
                <div key={key} className="flex items-center text-gray-600">
                  <ChevronRight className="w-4 h-4 text-amber-400 mr-2" />
                  {value} {key}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};