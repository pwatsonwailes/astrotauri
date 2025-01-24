import { StoryVariable, StoryVariableUpdate, StoryRequirement } from '../../types/story';

export const updateStoryVariables = (
  currentVariables: Record<string, StoryVariable>,
  updates: StoryVariableUpdate[]
): Record<string, StoryVariable> => {
  const newVariables = { ...currentVariables };

  updates.forEach(update => {
    if (newVariables[update.id]) {
      newVariables[update.id] = {
        ...newVariables[update.id],
        value: update.value
      };
    }
  });

  return newVariables;
};

export const checkVariableRequirement = (
  requirement: StoryRequirement,
  variables: Record<string, StoryVariable>
): boolean => {
  if (requirement.type !== 'variable' || !requirement.variableId) {
    return true;
  }

  const variable = variables[requirement.variableId];
  if (!variable) return false;

  return variable.value === requirement.variableValue;
};