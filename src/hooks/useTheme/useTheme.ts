import { useContext } from 'react';

import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';

export function useTheme() {
  return useContext(ThemeContext);
}
