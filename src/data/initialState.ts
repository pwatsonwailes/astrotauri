import { GameState } from '../types/game';
import { factions } from './factions/factions';
import { generateStartingGoals } from './goals';
import { CharacterArchetype } from '../types/character';
import { SkillProgress } from '../engine/skills/progression';
import { LOCATIONS } from './locations';

const createInitialSkillProgress = (level: number): SkillProgress => ({
  level,
  experience: 0,
  experienceRequired: level < 7 ? 100 * Math.pow(2, level - 1) : Infinity
});

// Helper to collect all location goals
const collectLocationGoals = () => {
  return Object.values(LOCATIONS).flatMap(location => [
    ...location.goals,
    ...location.subLocations.flatMap(sub => sub.goals)
  ]).map(goal => ({
    ...goal,
    source: 'location' as const,
    type: 'parentGoal' as const
  }));
};

export const getInitialState = (character?: CharacterArchetype): GameState => {

  // Get regular starting goals
  const startingGoals = generateStartingGoals();

  // Get all location goals
  const locationGoals = collectLocationGoals();

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

    goals: [...startingGoals, ...locationGoals],

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
    skills
  };
};