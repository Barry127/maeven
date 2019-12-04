import React, { createContext, FC } from 'react';
import { style } from 'typestyle';

import { Theme } from '../../types';
import { MaevenDefault } from '../../themes';
import { theme2CssVars } from '../../themes/helpers/theme2CssVars';

export const ThemeContext = createContext<Theme>(MaevenDefault);

/**
 * ThemeProvider creates a React context Provider for a Maeven Theme.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  const className = style(theme2CssVars(theme));

  return (
    <ThemeContext.Provider value={theme}>
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
};

interface ThemeProviderProps {
  /** Maeven Theme object */
  theme: Theme;
}
