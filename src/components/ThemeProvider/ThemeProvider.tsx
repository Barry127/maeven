import React, { FC, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { extendFromBaseTheme } from '../../lib/theme/extendFromBaseTheme';
import { theme2css } from '../../lib/theme/theme2css';
import { Theme } from '../../types';

/**
 * ThemeProvider creates a React context Provider for a Maeven Theme.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  const completeTheme = useMemo(() => extendFromBaseTheme(theme), [theme]);
  const style = useMemo(() => theme2css(completeTheme), [completeTheme]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <ThemeContext.Provider value={completeTheme}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export interface ThemeProviderProps {
  /** Maeven theme */
  theme: Theme;
}
