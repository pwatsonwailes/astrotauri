import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { GoalsList } from './GoalsList';
import { GoalDetails } from './GoalDetails';

export const GoalsView: React.FC = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [selectedSubgoalId, setSelectedSubgoalId] = useState<string | null>(null);

  // Game state
  const {
    goals,
    energyPoints,
    activateGoal,
    investInGoal
  } = useGameStore();

  const selectedGoal = selectedGoalId ? goals.find(g => g.id === selectedGoalId) : null;
  const selectedSubgoal = selectedSubgoalId ? goals.find(g => g.id === selectedSubgoalId) : null;

  const handleSelectSubgoal = (goalId: string) => {
    setSelectedSubgoalId(goalId);
  };

  const handleBack = () => {
    setSelectedSubgoalId(null);
  };

  const activeCount = goals.filter(g => g.status === 'active' && g.type === 'parentGoal').length;

  return (
    <div className="grid grid-cols-3 gap-6 distancedTop">
      <div className="col-span-2">
        <GoalsList
          goals={goals}
          onSelectGoal={setSelectedGoalId}
          onInvestInGoal={investInGoal}
          selectedGoalId={selectedGoalId}
          energy={energyPoints}
          onActivateGoal={activateGoal}
        />
      </div>
      
      <div>
        {(selectedSubgoal || selectedGoal) && (
          <GoalDetails
            goal={selectedSubgoal || selectedGoal}
            goals={goals}
            disabled={selectedGoal.status === 'available' && activeCount >= 3}
            onClose={() => {
              setSelectedGoalId(null);
              setSelectedSubgoalId(null);
            }}
            onActivate={() => activateGoal(selectedSubgoalId ? selectedSubgoal.id : selectedGoal.id)}
            onSelectSubgoal={handleSelectSubgoal}
            selectedSubgoalId={selectedSubgoalId}
            onBack={selectedSubgoal ? handleBack : undefined}
          />
        )}
      </div>
    </div>
  );
};