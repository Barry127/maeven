import { Theme } from '../themes/types';
import { textSelection } from './mixins';

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
