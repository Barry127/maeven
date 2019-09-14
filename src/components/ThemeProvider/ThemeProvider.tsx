import React, { createContext, FC } from 'react';

import { Theme } from '../../themes/types';
import MeavenTheme from '../../themes/Maeven';

export const ThemeContext = createContext<Theme>(MeavenTheme);

/**
 * ThemeProvider creates a React context Provider for a Maeven Theme.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

interface ThemeProviderProps {
  /** Maeven Theme object */
  theme: Theme;
}
