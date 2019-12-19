import { getTextColorFromBackground } from './getTextColorFromBackground';

describe('getTextColorFromBackground', () => {
  it('returns white when backgroud is black', () => {
    expect(getTextColorFromBackground('#000', 'white', 'black')).toBe('white');
  });

  it('returns black when background is white', () => {
    expect(getTextColorFromBackground('#fff', 'white', 'black')).toBe('black');
  });
});
