import React, { createContext, FC, useEffect } from 'react';
import { style, cssRaw } from 'typestyle';

import { Theme } from '../../types';
import { MaevenDefault } from '../../themes';
import { theme2CssVars } from '../../themes/helpers/theme2CssVars';

export const ThemeContext = createContext<Theme>(MaevenDefault);

/**
 * ThemeProvider creates a React context Provider for a Maeven Theme.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  global = false,
  theme
}) => {
  const className = style(theme2CssVars(theme));

  useEffect(() => {
    if (global) {
      cssRaw(`body{
      background: ${theme.colors.role.bodyBackground}
    }`);
    }
  }, [global, theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
};

interface ThemeProviderProps {
  /** When set to true global styles like body background will be set */
  global?: boolean;

  /** Maeven Theme object */
  theme: Theme;
}
