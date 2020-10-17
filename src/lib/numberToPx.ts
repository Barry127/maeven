export function numberToPx(input: number | string): string {
  if (typeof input === 'number') return `${input}px`;
  return input;
}
