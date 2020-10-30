import React, { FC, useMemo } from 'react';
import { useDarkMode } from '../../hooks';
import { extendFromBaseTheme } from '../../lib/theme/extendFromBaseTheme';
import { theme2css } from '../../lib/theme/theme2css';
import { PartialTheme } from '../../types';
import { ThemeContext } from './ThemeContext';

/**
 * ThemeProvider creates a React context Provider for a Maeven Theme.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  theme: partialTheme
}) => {
  const [isDark] = useDarkMode();
  const theme = useMemo(
    () => ({ ...extendFromBaseTheme(partialTheme), isDark }),
    [partialTheme, isDark]
  );
  const style = useMemo(() => theme2css(theme), [theme]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </>
  );
};

export interface ThemeProviderProps {
  /** Maeven theme */
  theme: PartialTheme;
}
