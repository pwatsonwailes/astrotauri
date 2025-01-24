import { GameState } from '../../types/game';

export interface TaskEffect {
  type: 'credits' | 'condition' | 'stress' | 'energy';
  value: number;
}

export const applyTaskEffects = (state: GameState, effects: TaskEffect[]): GameState => {
  let newState = { ...state };

  effects.forEach(effect => {
    switch (effect.type) {
      case 'credits':
        newState.credits += effect.value;
        break;
      case 'condition':
        newState.condition = Math.max(0, Math.min(100, newState.condition + effect.value));
        break;
      case 'stress':
        newState.stress = Math.max(0, newState.stress + effect.value);
        break;
      case 'energy':
        newState.energyPoints += effect.value;
        break;
    }
  });

  return newState;
};