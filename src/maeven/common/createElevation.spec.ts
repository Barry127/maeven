import { createElevation } from './createElevation';

describe('createElevation', () => {
  it('Returns none when no or 0 height is given', () => {
    expect(createElevation()).toBe('none');
    expect(createElevation(0)).toBe('none');
  });

  it('Returns 3 shadows for height 1', () => {
    expect(createElevation(1).match(/rgba/g)).toHaveLength(3);
  });

  it('Returns 5 shadows for height 3', () => {
    expect(createElevation(3).match(/rgba/g)).toHaveLength(5);
  });

  it('Height 4 is maximum height', () => {
    const el4 = createElevation(4);
    const el5 = createElevation(5);
    const el6 = createElevation(6);

    expect(el5).toBe(el4);
    expect(el6).toBe(el4);
  });
});
