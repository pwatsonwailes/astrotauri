import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface StoryNodeProps {
  data: {
    label: string;
    isLocked: boolean;
    isCompleted: boolean;
  };
  isConnectable: boolean;
}

export const StoryNode = memo(({ data, isConnectable }: StoryNodeProps) => {
  const nodeClasses = `px-4 py-2 rounded-lg shadow-lg ${
    data.isLocked
      ? 'bg-gray-500 text-gray-300'
      : data.isCompleted
      ? 'bg-green-600 text-white'
      : 'bg-blue-600 text-white'
  }`;

  return (
    <div className={nodeClasses}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-medium">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});