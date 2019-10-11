import { Theme } from '../themes/types';
import { textSelection, elevation } from './mixins';

describe('elevation', () => {
  it('Returns none when no or 0 height is given', () => {
    expect(elevation()).toBe('none');
    expect(elevation(0)).toBe('none');
  });

  it('Returns 3 shadows for height 1', () => {
    expect(elevation(1).match(/rgba/g)).toHaveLength(3);
  });

  it('Returns 5 shadows for height 3', () => {
    expect(elevation(3).match(/rgba/g)).toHaveLength(5);
  });

  it('Height 4 is maximum height', () => {
    const el4 = elevation(4);
    const el5 = elevation(5);
    const el6 = elevation(6);

    expect(el5).toBe(el4);
    expect(el6).toBe(el4);
  });
});

describe('textSelection', () => {
  it('Returns the color and backgroundColor for text selection of given theme', () => {
    const theme = {
      colors: {
        types: {
          textSelection: 'black',
          textSelectionBackground: 'white'
        }
      }
    } as Theme;

    expect(textSelection(theme)).toMatchObject({
      color: 'black',
      backgroundColor: 'white'
    });
  });
});
