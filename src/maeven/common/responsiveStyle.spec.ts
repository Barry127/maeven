import { reinit, getStyles } from 'typestyle';

import { responsiveStyle } from './responsiveStyle';

import { MaevenDefault } from '..';

describe('responsiveStyle', () => {
  const defaultStyle = { color: 'default' };
  const xs = { color: 'xs' };
  const sm = { color: 'sm' };
  const md = { color: 'md' };
  const lg = { color: 'lg' };
  const xl = { color: 'xl' };

  beforeEach(reinit);

  it('Sets all styles', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      xs,
      sm,
      md,
      lg,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(5);
    expect(styles).toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).toContain('color:lg');
    expect(styles).toContain('color:xl');
  });

  it('Omits default', () => {
    responsiveStyle(MaevenDefault, {
      xs,
      sm,
      md,
      lg,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(5);
    expect(styles).not.toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).toContain('color:lg');
  });

  it('Omits xs', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      sm,
      md,
      lg,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(4);
    expect(styles).toContain('color:default');
    expect(styles).not.toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).toContain('color:lg');
    expect(styles).toContain('color:xl');
  });

  it('Omits sm', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      xs,
      md,
      lg,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(4);
    expect(styles).toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).not.toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).toContain('color:lg');
    expect(styles).toContain('color:xl');
  });

  it('Omits md', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      xs,
      sm,
      lg,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(4);
    expect(styles).toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).not.toContain('color:md');
    expect(styles).toContain('color:lg');
    expect(styles).toContain('color:xl');
  });

  it('Omits lg', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      xs,
      sm,
      md,
      xl
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(4);
    expect(styles).toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).not.toContain('color:lg');
    expect(styles).toContain('color:xl');
  });

  it('Omits xl', () => {
    responsiveStyle(MaevenDefault, {
      default: defaultStyle,
      xs,
      sm,
      md,
      lg
    });
    const styles = getStyles();
    expect(styles.match(/@media/g)).toHaveLength(4);
    expect(styles).toContain('color:default');
    expect(styles).toContain('color:xs');
    expect(styles).toContain('color:sm');
    expect(styles).toContain('color:md');
    expect(styles).toContain('color:lg');
    expect(styles).not.toContain('color:xl');
  });
});
