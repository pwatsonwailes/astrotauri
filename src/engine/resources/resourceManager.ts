import { GameState } from '../../types/game';

const CONDITION_DECAY_RATE = 5; // 5% per turn
const STRESS_RECOVERY_PER_ENERGY = 3.33; // 10 stress per 3 energy
const MIN_HEALTHY_ENERGY = 5;

export const processResourceUpdates = (state: GameState): GameState => {
  let newState = { ...state };

  // Apply condition decay
  newState.condition = Math.max(0, newState.condition - CONDITION_DECAY_RATE);

  // Calculate stress recovery from unused energy
  const unusedEnergy = state.energyPoints;
  const stressRecovery = Math.floor(unusedEnergy * STRESS_RECOVERY_PER_ENERGY);
  newState.stress = Math.max(0, state.stress - stressRecovery);

  // Add stress if max energy is too low
  if (calculateMaxEnergy(newState.condition) < MIN_HEALTHY_ENERGY) {
    newState.stress += 5;
  }

  return newState;
};

export const calculateMaxEnergy = (condition: number): number => {
  const minEnergy = 4;
  const maxEnergy = 10;
  return Math.max(minEnergy, Math.round(maxEnergy * (condition / 100)));
};

export const performMaintenance = (state: GameState): GameState => {
  const MAINTENANCE_ENERGY_COST = 5;
  
  if (state.energyPoints < MAINTENANCE_ENERGY_COST) {
    return state;
  }

  return {
    ...state,
    condition: 100,
    energyPoints: state.energyPoints - MAINTENANCE_ENERGY_COST
  };
};