import { getPercentage } from './helpers';

describe('getPercentage', () => {
  it('value 50 min 0, max 100 returns 50', () => {
    expect(getPercentage(0, 100, 50)).toBe(50);
  });

  it('value 150 min 100, max 250 returns 33', () => {
    expect(getPercentage(100, 250, 150)).toBeCloseTo(33.33);
  });

  it('value 50 min 200, max 100 returns 0 (min greater than max = 0)', () => {
    expect(getPercentage(2000, 100, 50)).toBe(0);
  });

  it('value undefined returns 0', () => {
    expect(getPercentage(50, 100)).toBe(0);
  });

  it('returns 100 when value is greater than max', () => {
    expect(getPercentage(0, 100, 101)).toBe(100);
  });

  it('returns 0 when value is less than min', () => {
    expect(getPercentage(0, 100, -1)).toBe(0);
  });
});
