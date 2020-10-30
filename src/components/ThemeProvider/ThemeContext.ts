import { createContext } from 'react';
import { extendFromBaseTheme } from '../../lib/theme/extendFromBaseTheme';
import maeven from '../../themes/maeven';
import { Theme } from '../../types';

const defaultTheme = { ...extendFromBaseTheme(maeven), isDark: false };

export const ThemeContext = createContext<Theme>(defaultTheme);
