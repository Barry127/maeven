export const createElevation = (height: number = 0): string => {
  if (height === 0) return 'none';

  let px = 1;
  let boxShadow = '';
  for (let i = 0; i < Math.min(height, 4) + 2; i++) {
    boxShadow += `,0 ${px}px ${px}px rgba(0,0,0,0.15)`;
    px *= 2;
  }

  return boxShadow.substr(1);
};
