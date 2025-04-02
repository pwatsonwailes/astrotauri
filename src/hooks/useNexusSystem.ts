import { useCallback } from 'react';
import { Connection } from 'reactflow';
import { useGameStore } from '../store/gameStore';
import { NexusNode, NexusEdge } from '../types/nexus';
import Prologue from '../stories/main/c1/Prologue.ink?raw';
import SalvageMission from '../stories/salvage-mission.ink?raw';

export const useNexusSystem = () => {
  const {
    nexusNodes,
    nexusEdges,
    addNode,
    updateNode,
    addEdge,
    unlockNode,
    completeNode,
    addGlossaryEntry,
    unlockGlossaryEntry,
    addCharacterEvent,
    setScreen,
    setCurrentStory
  } = useGameStore();

  // Check if a connection is valid based on node rules
  const isValidConnection = useCallback((source: NexusNode, target: NexusNode): boolean => {
    // Check if either node is locked
    if (source.data.isLocked || target.data.isLocked) {
      return false;
    }

    // Check if the connection is allowed based on node types
    if (!source.data.allowedConnections?.includes(target.id)) {
      return false;
    }

    // Check if the connection already exists
    const connectionExists = nexusEdges.some(
      edge => edge.source === source.id && edge.target === target.id
    );

    return !connectionExists;
  }, [nexusEdges]);

  // Handle node connection
  const handleConnection = useCallback((connection: Connection) => {
    const sourceNode = nexusNodes.find(n => n.id === connection.source) as NexusNode;
    const targetNode = nexusNodes.find(n => n.id === connection.target) as NexusNode;

    if (!sourceNode || !targetNode) return false;

    if (!isValidConnection(sourceNode, targetNode)) return false;

    // Create the edge
    const newEdge: NexusEdge = {
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      type: 'smoothstep',
      data: {
        type: 'deduction'
      }
    };

    addEdge(newEdge);

    // Check if this connection should trigger any events
    checkConnectionTriggers(sourceNode, targetNode);

    return true;
  }, [nexusNodes, isValidConnection, addEdge]);

  // Check for triggers when nodes are connected
  const checkConnectionTriggers = useCallback((source: NexusNode, target: NexusNode) => {
    // Example: If connecting two specific clues unlocks a conclusion
    const conclusionNodes = nexusNodes.filter(
      node => node.type === 'conclusion' && node.data.isLocked
    );

    conclusionNodes.forEach(conclusion => {
      const requiredConnections = conclusion.data.allowedConnections || [];
      const hasAllConnections = requiredConnections.every(reqConnection => {
        return nexusEdges.some(edge => 
          (edge.source === source.id && edge.target === reqConnection) ||
          (edge.source === target.id && edge.target === reqConnection)
        );
      });

      if (hasAllConnections) {
        unlockNode(conclusion.id);
      }
    });
  }, [nexusNodes, nexusEdges, unlockNode]);

  // Handle story node completion
  const handleNodeCompletion = useCallback((nodeId: string) => {
    // Mark the story node as completed
    completeNode(nodeId);

    // Handle specific node completion logic
    switch (nodeId) {
      case 'prologue':
        // Unlock the Salvage Mission node after completing the Prologue
        unlockNode('salvage-mission');
        break;
      case 'salvage-mission':
        // Add any specific completion logic for Salvage Mission
        break;
    }
  }, [completeNode, unlockNode]);

  // Handle clicking a story node
  const handleStoryNodeClick = useCallback((nodeId: string) => {
    const node = nexusNodes.find(n => n.id === nodeId);
    if (!node || node.data.isLocked) return;

    // Set the current story based on the node's content
    let storyContent;
    switch (nodeId) {
      case 'prologue':
        storyContent = Prologue;
        break;
      case 'salvage-mission':
        storyContent = SalvageMission;
        break;
      default:
        return;
    }

    setCurrentStory(storyContent);
    setScreen('story');
  }, [nexusNodes, setCurrentStory, setScreen]);

  // Initialize the Nexus board with starting nodes
  const initializeNexusBoard = useCallback(() => {
    // Add the initial story node (Prologue)
    const prologueNode: NexusNode = {
      id: 'prologue',
      type: 'story',
      position: { x: 250, y: 250 },
      data: {
        label: 'Prologue',
        content: 'prologue',
        isLocked: false,
        isCompleted: false,
        allowedConnections: []  // Prologue doesn't connect to anything
      }
    };

    // Add the initial locked story node (Salvage Mission)
    const salvageMissionNode: NexusNode = {
      id: 'salvage-mission',
      type: 'story',
      position: { x: 250, y: 400 },
      data: {
        label: 'Salvage Mission',
        content: 'salvage-mission',
        isLocked: true,
        isCompleted: false,
        allowedConnections: []  // Will be updated when part 1 is completed
      }
    };

    addNode(prologueNode);
    addNode(salvageMissionNode);
  }, [addNode]);

  return {
    handleConnection,
    handleNodeCompletion,
    handleStoryNodeClick,
    initializeNexusBoard,
    isValidConnection
  };
};