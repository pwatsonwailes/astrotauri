import { StoryNode, StoryVariable } from '../../types/story';
import { checkVariableRequirement } from './variables';

export const checkNodeRequirements = (
  node: StoryNode,
  choices: Record<string, number>,
  variables: Record<string, StoryVariable>
): boolean => {
  if (!node.requirements || node.requirements.length === 0)
    return true;

  return node.requirements.every(req => {
    if (!req) return true;

    switch (req.type) {
      case 'choice':
        return req.choiceId ? choices[req.choiceId] === req.optionId : true;
      case 'variable':
        return checkVariableRequirement(req, variables);
      default:
        return true;
    }
  });
};

export const findNodeById = (nodes: StoryNode[], nodeId: string): number => {
  return nodes.findIndex(node => node.id === nodeId);
};

export const findNextValidNode = (
  nodes: StoryNode[],
  startIndex: number,
  choices: Record<string, number>,
  variables: Record<string, StoryVariable>
): { node: StoryNode; index: number } | null => {
  for (let i = startIndex; i < nodes.length; i++) {
    const node = nodes[i];
    if (checkNodeRequirements(node, choices, variables)) {
      return { node, index: i };
    }
  }

  return null;
};