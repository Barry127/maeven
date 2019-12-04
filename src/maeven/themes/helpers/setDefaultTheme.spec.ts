import { getStyles, reinit } from 'typestyle';

import { setDefaultTheme } from './setDefaultTheme';
import { theme2CssVars } from './theme2CssVars';
import { cssVars2Root } from './cssVars2Root';

import { MaevenDefault } from '..';

describe('setDefaultTheme', () => {
  beforeEach(reinit);

  it('Sets MaevenDefault as default theme', () => {
    const themeCss = cssVars2Root(theme2CssVars(MaevenDefault));
    setDefaultTheme(MaevenDefault);

    expect(getStyles()).toBe(themeCss);
  });
});
