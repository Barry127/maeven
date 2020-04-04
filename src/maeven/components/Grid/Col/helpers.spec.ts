import { hiddenToClassName } from './helpers';

describe('hiddenToClassName', () => {
  it('returns mvn-hidden when hidden is true', () => {
    expect(hiddenToClassName(true)).toBe('mvn-hidden');
  });

  it('returns all sizes when hidden is "xl"', () => {
    expect(hiddenToClassName('xl')).toBe(
      'mvn-col-hidden-xl mvn-col-hidden-lg mvn-col-hidden-md mvn-col-hidden-sm mvn-col-hidden-xs'
    );
  });

  it('returns sizes md, sm and xs when hidden is "md"', () => {
    expect(hiddenToClassName('md')).toBe(
      'mvn-col-hidden-md mvn-col-hidden-sm mvn-col-hidden-xs'
    );
  });

  it('returns sizes sm and lg when hidden is ["sm", "lg"]', () => {
    expect(hiddenToClassName(['sm', 'lg'])).toBe(
      'mvn-col-hidden-sm mvn-col-hidden-lg'
    );
  });
});
