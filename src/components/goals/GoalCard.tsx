import React from 'react';
import { Goal } from '../../types/goals';
import { RadialProgressBar } from '../common/RadialProgressBar';
import { Clock, Timer } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface GoalCardProps {
  goal: Goal;
  selected: boolean;
  onClick: () => void;
  onActivate: (id: string) => void;
  onInvest: (amount: number) => void;
  maxEnergy: number;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  selected,
  onClick,
  onActivate,
  onInvest,
  maxEnergy
}) => {
  const { t } = useTranslation();

  const renderTimer = (text: string) => {
    return (
      <div className={`flex items-center gap-2 text-sm mb-4 ${goal.status === 'available' ? `text-gray-500` : `text-green-600`}`}>
        <Timer className="w-4 h-4 text-inherit" />
        <strong>
          {text}
        </strong>
      </div>
    )
  }

  const energyRequirement = goal.requirements.find(req => req.type === 'energy');
  const invested = goal.progress.energyInvested;
  const amount = energyRequirement ? energyRequirement.amount : 0;
  const remaining = amount - invested;
  const maxInvestment = Math.min(remaining, maxEnergy);
  const isInvestmentComplete = remaining <= 0;
  const isProcessing = goal.progress.completionTimer > 0;

  // Only show controls if goal is active and either:
  // - Investment is not complete, or
  // - Goal requires turns to complete and isn't processing yet
  const showControls = goal.status === 'active' && 
    (!isInvestmentComplete || isProcessing);

  let timerText = ''

  if (goal.timeLimit > 0 && goal.status === 'available')
    timerText = t.goals.available +' for ' + goal.progress.turnsRemaining + 'turns'
  else if (goal.timeLimit === 0 && goal.status === 'available')
    timerText = t.goals.available
  else if (goal.timeLimit === 0 && goal.status === 'active' && goal.progress.turnsRemaining > 1)
    timerText = t.goals.active + '. ' + goal.progress.turnsRemaining + ' turns to complete.'
  else if (goal.timeLimit === 0 && goal.status === 'active')
    timerText = t.goals.active + '. ' + goal.progress.turnsRemaining + ' turn to complete.'
  else if (goal.timeLimit === 0 && goal.status === 'completed')
    timerText = t.goals.completed

  return (
    <div className={`goalCard rounded-lg promontory rounded-lg overflow-hidden`}>
      <h3 className={`text-xl font-semibold p-4 cursor-pointer ${selected && goal.status !== 'completed' ? 'text-amber-500' : 'text-black'}`} onClick={onClick}>
        {goal.title}
      </h3>

      <div className="p-4">
        {timerText !== '' && renderTimer(timerText)}

        {showControls && energyRequirement && remaining > 0 && energyRequirement.amount !== Infinity && (
          <RadialProgressBar
            invested={invested}
            required={amount}
            maxInvestment={maxInvestment}
            onInvest={onInvest}
          />
        )}

        {isInvestmentComplete && isProcessing && (
          <div className="py-4 ">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-blue-400" />
              Processing... {goal.progress.completionTimer} turns remaining
            </div>
          </div>
        )}
      </div>

      {goal.status === 'available' && (
        <button
          onClick={() => onActivate(goal.id)}
          className="activateButton px-4 py-2 w-full bg-slate-600 text-white hover:bg-slate-500 transition-colors"
        >
          {t.goals.accept}
        </button>
      )}
    </div>
  );
};