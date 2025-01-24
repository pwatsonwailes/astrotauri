import React, { useState } from 'react';
import { motion } from "motion/react"
import { Task } from '../../../types/tasks';
import { useGameStore } from '../../../stores/useGameStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { resolveTask } from '../../../engine/tasks/taskResolution';
import { SkillProgressBar } from '../../skills/SkillProgressBar';

interface TaskNodeProps {
  task: Task;
  onComplete: (result: { effects?: any[] }) => void;
}

export const TaskNode: React.FC<TaskNodeProps> = ({
  task,
  onComplete
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const { t } = useTranslation();

  const gameState = useGameStore();
  const updateSkillExperience = useGameStore(state => state.updateSkillExperience);

  const handleSkillSelect = (skillType: string) => {
    setSelectedSkill(skillType);
    setResult(null);
  };

  const handleAttempt = () => {
    if (!selectedSkill || !gameState) return;

    const taskResult = resolveTask(task, selectedSkill, gameState);
    setResult(taskResult);

    // Update skill experience if task was successful
    if (taskResult.success && taskResult.experienceGained && taskResult.skillType)
      updateSkillExperience();
  };

  const handleConfirm = () => {
    if (!result) return;
    onComplete({ effects: result.effects });
  };

  const applicableSkills = task.applicableSkills.map(skillType => ({
    type: skillType,
    progress: gameState?.skills[skillType]
  })).filter(skill => skill.progress);

  return (
    <div className="max-w-2xl w-full space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
        <p className="text-gray-300 mb-4">{task.description}</p>
        <div className="flex items-center gap-2 text-base">
          <span className="text-gray-400">{t.goals.requirements}:</span>
          <span className="text-amber-600">{task.difficulty}</span>
        </div>
      </div>

      {!result ? (
        <>
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-white">{t.skills.available}</h4>
            {applicableSkills.map(({ type, progress }) => (
              <motion.button
                key={type}
                onClick={() => handleSkillSelect(type)}
                className={`
                  w-full p-4 rounded-lg text-left transition-colors
                  ${selectedSkill === type ? 'bg-slate-800' : 'bg-gray-700 hover:bg-gray-600'}
                `}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-white capitalize">{type}</div>
                    </div>
                    {progress.level >= task.difficulty && (
                      <span className="text-green-400 text-base">{t.skills.meets_requirement}</span>
                    )}
                  </div>
                  <SkillProgressBar progress={progress} />
                </div>
              </motion.button>
            ))}
          </div>

          <button
            onClick={handleAttempt}
            disabled={!selectedSkill}
            className={`
              w-full p-4 rounded-lg font-medium text-white hover:text-black transition-colors
              ${selectedSkill
                ? 'bg-slate-800 hover:bg-amber-400'
                : 'bg-gray-700 cursor-not-allowed'
              }
            `}
          >
            {t.tasks.attempt}
          </button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-slate-800">
            <h4 className={`text-lg font-bold mt-0 mb-2 ${result.success ? 'text-green-400' : 'text-red-400'}`}>
              {result.success ? t.tasks.success : t.tasks.failure}
            </h4>
            <p className="text-gray-200">{result.message}</p>
            
            {result.effects.length > 0 && (
              <div className="mt-4 space-y-2">
                <h5 className="text-base font-bold text-gray-300">{t.tasks.effects}</h5>
                {result.effects.map((effect, index) => {
                  if (effect.value > 0) {
                    return (
                      <div key={index} className="text-base text-gray-300">
                        +{effect.value} {effect.type}
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {result.experienceGained > 0 && (
              <div className="mt-4 text-amber-600">
                +{result.experienceGained} XP {t.tasks.gained_for} {selectedSkill}
              </div>
            )}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full p-4 rounded-lg font-medium bg-amber-500 text-white hover:bg-amber-700"
          >
            {t.common.continue}
          </button>
        </div>
      )}
    </div>
  );
};