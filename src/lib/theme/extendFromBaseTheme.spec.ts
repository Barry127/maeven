import { extendFromBaseTheme } from './extendFromBaseTheme';

describe('lib/theme/extendFromBaseTheme', () => {
  const myTheme = {
    name: 'My Theme'
  };

  it('keeps name', () => {
    expect(extendFromBaseTheme(myTheme).name).toBe('My Theme');
  });

  it('keeps base', () => {
    expect(extendFromBaseTheme({ ...myTheme, base: 20 })).toHaveProperty(
      'base',
      '20px'
    );
  });

  it('sets default base when no base is given', () => {
    expect(extendFromBaseTheme(myTheme)).toHaveProperty('base', '10px');
  });

  it('keeps color', () => {
    const theme = extendFromBaseTheme({
      ...myTheme,
      colors: {
        red1: '#CC0000',
        danger5: '#FF0000'
      }
    });
    expect(theme.colors).toHaveProperty('red1', '#CC0000');
    expect(theme.colors).toHaveProperty('danger5', '#FF0000');
  });

  it('sets default values', () => {
    const theme = extendFromBaseTheme({
      ...myTheme,
      colors: {
        green1: '#00FF00'
      }
    });
    expect(theme.colors).toHaveProperty('white', '#ffffff');
    expect(theme.colors).toHaveProperty('success1', '#00FF00');
  });

  it('keeps typography', () => {
    const theme = extendFromBaseTheme({
      ...myTheme,
      typography: {
        fontFamily: 'times'
      }
    });
    expect(theme.typography).toHaveProperty('fontFamily', 'times');
    expect(theme.typography).toHaveProperty('fontFamilyHeading', 'times');
  });

  it('sets default values', () => {
    const theme = extendFromBaseTheme({
      ...myTheme,
      typography: {
        fontFamilyHeading: 'times'
      }
    });
    expect(theme.typography.fontFamily).not.toBe(
      theme.typography.fontFamilyHeading
    );
    expect(theme.typography).toHaveProperty('lineHeight', 1.65);
  });

  it('keeps animations', () => {
    const theme = extendFromBaseTheme({
      ...myTheme,
      animations: {
        timingFunction: 'ease'
      }
    });
    expect(theme.animations).toHaveProperty('duration', '0.2s');
    expect(theme.animations).toHaveProperty('timingFunction', 'ease');
  });

  it('sets default values', () => {
    const theme = extendFromBaseTheme(myTheme);
    expect(theme.animations).toHaveProperty('duration', '0.2s');
    expect(theme.animations.timingFunction).toContain('cubic-bezier');
  });
});
