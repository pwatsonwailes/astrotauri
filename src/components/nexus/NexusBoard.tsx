import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useGameStore } from '../../store/gameStore';
import { useNexusSystem } from '../../hooks/useNexusSystem';
import { NexusNode } from '../../types/nexus';
import { StoryNode } from './nodes/StoryNode';
import { ClueNode } from './nodes/ClueNode';
import { ConclusionNode } from './nodes/ConclusionNode';
import { InterludeNode } from './nodes/InterludeNode';
import { InfoPanel } from './InfoPanel';

const nodeTypes = {
  story: StoryNode,
  clue: ClueNode,
  conclusion: ConclusionNode,
  interlude: InterludeNode,
};

export const NexusBoard: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { characters, glossaryEntries, nexusNodes, nexusEdges } = useGameStore();
  const { handleConnection, initializeNexusBoard, handleStoryNodeClick } = useNexusSystem();

  // Initialize the board
  useEffect(() => {
    if (nexusNodes.length === 0) {
      initializeNexusBoard();
    }
    setNodes(nexusNodes);
    setEdges(nexusEdges);
  }, [nexusNodes, nexusEdges, initializeNexusBoard, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      handleConnection(params);
    },
    [handleConnection]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: NexusNode) => {
    if (node.type === 'story') {
      handleStoryNodeClick(node.id);
    }
  }, [handleStoryNodeClick]);

  return (
    <div className="flex">
      <div className="flex-1 h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <InfoPanel characters={characters} glossaryEntries={glossaryEntries} />
    </div>
  );
};