import { numberToPx } from './numberToPx';

describe('lib/numberToPx', () => {
  it('converts number values to strings with px values', () => {
    expect(numberToPx(10)).toBe('10px');
    expect(numberToPx(3.14)).toBe('3.14px');
    expect(numberToPx(1e3)).toBe('1000px');
  });

  it('keeps string values', () => {
    expect(numberToPx('100px')).toBe('100px');
    expect(numberToPx('50vh')).toBe('50vh');
    expect(numberToPx('20%')).toBe('20%');
  });
});
