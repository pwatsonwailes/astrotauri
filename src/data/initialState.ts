import { GameState } from '../types/game';
import { factions } from './factions/factions';
import { generateStartingGoals } from './goals';
import { CharacterArchetype } from '../types/character';
import { SkillProgress } from '../engine/skills/progression';
import { LOCATIONS } from './locations';
import { initializeNPCLocations } from '../utils/npcs/locationManager';

const createInitialSkillProgress = (level: number): SkillProgress => ({
  level,
  experience: 0,
  experienceRequired: level < 7 ? 100 * Math.pow(2, level - 1) : Infinity
});

export const getInitialState = (character?: CharacterArchetype): GameState => {
  // Get regular starting goals
  const startingGoals = generateStartingGoals();

  // Initialize skills based on character or default values
  const baseSkills = character ? character.skills : {
    negotiation: 1,
    observation: 1,
    improvisation: 1,
    fitness: 1,
    knowledge: 1,
    stamina: 1
  };

  // Convert skill levels to proper SkillProgress objects
  const skills = Object.entries(baseSkills).reduce((acc, [skillName, level]) => ({
    ...acc,
    [skillName]: createInitialSkillProgress(level)
  }), {});

  return {
    currentView: 'story',
    // Starting Resources
    credits: 500,
    condition: 80,
    factions: factions,
    stress: 0,
    energyPoints: 9,
    reputation: 0,

    character: character,
    
    // Game Progress
    turn: 1,

    goals: startingGoals,

    // Inventory System
    inventory: {
      items: [],
      maxCapacity: 100
    },

    currentLocation: {
      type: 'ship',
      id: 'prospector',
      destination: 'ceres',
      turnsRemaining: 4
    },

    // Skills System with proper progression structure
    skills,

    // NPC Locations and Party
    npcLocations: initializeNPCLocations(),
    party: {
      activeCompanions: ['sadie'],
      maxCompanions: 12
    }
  };
};