import { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider/ThemeContext';

export function useTheme() {
  return useContext(ThemeContext);
}
