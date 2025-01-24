import { GameState, Card, CardEffect } from '../../types/game';

export const applyCardEffects = (state: GameState, card: Card): GameState => {
  let newState = { ...state };

  card.effects.forEach(effect => {
    if (!effect.chance || Math.random() <= effect.chance) {
      newState = applyEffect(newState, effect);
    }
  });

  return newState;
};

const applyEffect = (state: GameState, effect: CardEffect): GameState => {
  switch (effect.type) {
    case 'draw':
      return drawCards(state, effect.value);
    case 'reputation':
      return applyReputationEffect(state, effect);
    default:
      return {
        ...state,
        [effect.type]: state[effect.type] + effect.value,
      };
  }
};

const applyReputationEffect = (state: GameState, effect: CardEffect): GameState => {
  if (!effect.corporationId) return state;

  const newCorporations = state.corporations.map(corp => 
    corp.id === effect.corporationId
      ? { ...corp, reputation: corp.reputation + effect.value }
      : corp
  );

  return {
    ...state,
    corporations: newCorporations,
  };
};