import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryNode } from '../../types/story';
import { ParagraphNode } from './nodes/ParagraphNode';
import { ChoiceNode } from './nodes/ChoiceNode';
import { ButtonNode } from './nodes/ButtonNode';
import { TaskNode } from './nodes/TaskNode';

interface StoryTextPanelProps {
  currentNode: StoryNode;
  nodeIndex: number;
  onChoice: (choiceId: string, picked: number) => void;
  onNext: () => void;
  handleViewChange: () => void;
  onComplete: () => void;
  onTaskComplete: (result: { effects?: any[] }) => void;
}

export const StoryTextPanel: React.FC<StoryTextPanelProps> = ({
  currentNode,
  nodeIndex,
  onChoice,
  onNext,
  onComplete,
  handleViewChange,
  onTaskComplete
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when node changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [nodeIndex]);

  const handleButtonNodeClick = () => {
    if (typeof currentNode.mode !== 'undefined' && currentNode.mode !== null)
      handleViewChange(currentNode.mode)
    else
      onNext()
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto m-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${nodeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-6"
        >
          <div className="max-w-lg mx-auto">
            {currentNode.type === 'paragraph' && (
              <ParagraphNode node={currentNode} onComplete={onNext} />
            )}
            {currentNode.type === 'choice' && currentNode.id && (
              <ChoiceNode node={currentNode} onChoice={onChoice} />
            )}
            {currentNode.type === 'button' && (
              <ButtonNode 
                node={currentNode} 
                onComplete={handleButtonNodeClick} 
              />
            )}
            {currentNode.type === 'task' && currentNode.task && (
              <TaskNode
                task={currentNode.task}
                onComplete={onTaskComplete}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};