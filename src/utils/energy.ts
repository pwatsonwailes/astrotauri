/**
 * Calculate maximum energy points based on character condition
 * @param healthPercentage Current condition/health percentage (0-100)
 * @returns Maximum energy points available
 */
export const calculateMaxEnergy = (healthPercentage: number): number => {
  const minEnergy = 4;
  const maxEnergy = 10;

  // Calculate energy using linear scaling between min and max
  const energy = minEnergy + ((maxEnergy - minEnergy) * healthPercentage / 100);

  // Return rounded energy value
  return Math.round(energy);
};