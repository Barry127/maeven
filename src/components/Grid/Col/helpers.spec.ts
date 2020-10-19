import classes from './col.module.scss';
import { hiddenToClassName } from './helpers';

describe('hiddenToClassName', () => {
  it('returns mvn-hidden when hidden is true', () => {
    expect(hiddenToClassName(true)).toBe(classes.hidden);
  });

  it('returns all sizes when hidden is "xl"', () => {
    expect(hiddenToClassName('xl')).toBe(
      `${classes['hidden-xl']} ${classes['hidden-lg']} ${classes['hidden-md']} ${classes['hidden-sm']} ${classes['hidden-xs']}`
    );
  });

  it('returns sizes md, sm and xs when hidden is "md"', () => {
    expect(hiddenToClassName('md')).toBe(
      `${classes['hidden-md']} ${classes['hidden-sm']} ${classes['hidden-xs']}`
    );
  });

  it('returns sizes sm and lg when hidden is ["sm", "lg"]', () => {
    expect(hiddenToClassName(['sm', 'lg'])).toBe(
      `${classes['hidden-sm']} ${classes['hidden-lg']}`
    );
  });
});
