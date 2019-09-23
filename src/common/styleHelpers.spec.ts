import { exportStyles } from './styleHelpers';

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

  it('ex[erted key classes is a dictonary of string', () => {
    const styles = exportStyles(testCss);

    expect(typeof styles.classes.one).toBe('string');
    expect(typeof styles.classes.two).toBe('string');
  });
});
