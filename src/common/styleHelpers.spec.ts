import { exportStyles, getColorFromTheme } from './styleHelpers';
import { Theme } from '../themes/types';

describe('exportStyles', () => {
  const testCss = {
    one: {
      color: 'red'
    },
    two: {
      color: 'blue'
    }
  };

  it('exports an object with the keys css and classes', () => {
    const styles = exportStyles(testCss);

    expect(Object.keys(styles)).toMatchObject(['css', 'classes']);
  });

  it('both css and classes have the same keys as the input', () => {
    const styles = exportStyles(testCss);

    expect(Object.keys(styles.css)).toMatchObject(Object.keys(testCss));
    expect(Object.keys(styles.classes)).toMatchObject(Object.keys(testCss));
  });

  it('exported key css is the css argument (same object)', () => {
    const styles = exportStyles(testCss);

    expect(styles.css).toBe(testCss);
  });

  it('exported key classes is a dictonary of string', () => {
    const styles = exportStyles(testCss);

    expect(typeof styles.classes.one).toBe('string');
    expect(typeof styles.classes.two).toBe('string');
  });
});

describe('getColorFromTheme', () => {
  const theme = {
    colors: {
      name: {
        blue: 'blue',
        red: 'red'
      },
      semantic: {
        success: 'green',
        warning: 'orange'
      }
    }
  } as Theme;

  it('Returns a color by name', () => {
    expect(getColorFromTheme('red', theme)).toBe('red');
    expect(getColorFromTheme('blue', theme)).toBe('blue');
  });

  it('Returns a color by semantic value', () => {
    expect(getColorFromTheme('success', theme)).toBe('green');
    expect(getColorFromTheme('warning', theme)).toBe('orange');
  });

  it('Returns null when no color is found', () => {
    expect(getColorFromTheme('slightlyPink', theme)).toBeNull();
  });
});
