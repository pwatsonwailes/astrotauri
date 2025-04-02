import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface InterludeNodeProps {
  data: {
    label: string;
    isLocked: boolean;
  };
  isConnectable: boolean;
}

export const InterludeNode = memo(({ data, isConnectable }: InterludeNodeProps) => {
  return (
    <div className={`px-4 py-2 rounded-lg shadow-lg ${
      data.isLocked ? 'bg-gray-500 text-gray-300' : 'bg-orange-600 text-white'
    }`}>
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