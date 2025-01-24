export const calculateEnergy = (healthPercentage: number): number => {
  const minEnergy = 4;
  const maxEnergy = 10;
  return Math.round(minEnergy + ((maxEnergy - minEnergy) * healthPercentage / 100));
};