export const getPercentage = (
  min: number,
  max: number,
  value?: number
): number => {
  if (min > max) return 0;
  if (!value) return 0;
  if (value > max) return 100;
  if (value < min) return 0;

  return ((value - min) * 100) / (max - min);
};
