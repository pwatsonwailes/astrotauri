import { StoryNode, LoopState } from '../../types/story';

export const checkLoopRequirements = (
  node: StoryNode,
  activeLoops: LoopState[]
): boolean => {
  const loopReq = node.requirements?.find(req => req.type === 'loop');
  if (!loopReq) return true;

  const activeLoop = activeLoops.find(loop => loop.loopId === node.loopId);
  if (!activeLoop) return true;

  if (loopReq.maxLoops && activeLoop.count >= loopReq.maxLoops) {
    return false;
  }

  return true;
};

export const handleLoopLogic = (
  node: StoryNode,
  currentNodeIndex: number,
  activeLoops: LoopState[]
): { 
  nextNodeIndex: number | null;
  updatedLoops: LoopState[];
} => {
  let updatedLoops = [...activeLoops];

  // Start new loop
  if (node.isLoopStart && node.loopId) {
    updatedLoops.push({
      loopId: node.loopId,
      count: 0,
      maxLoops: node.maxLoops || Infinity,
      startNodeIndex: currentNodeIndex
    });
    return { nextNodeIndex: null, updatedLoops };
  }

  // Handle loop back
  if (node.options?.some(opt => opt.loopBack)) {
    const activeLoop = updatedLoops.find(loop => loop.loopId === node.loopId);
    if (activeLoop) {
      activeLoop.count++;
      if (activeLoop.count < activeLoop.maxLoops) {
        return { 
          nextNodeIndex: activeLoop.startNodeIndex,
          updatedLoops 
        };
      }
    }
  }

  // End loop
  if (node.isLoopEnd || node.options?.some(opt => opt.exitLoop)) {
    updatedLoops = updatedLoops.filter(loop => loop.loopId !== node.loopId);
  }

  return { nextNodeIndex: null, updatedLoops };
};