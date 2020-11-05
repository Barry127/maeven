import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ isDark: false });

/**
 * useDarkMode returns wether current theme is dark mode and a function to toggle dark mode.
 */
export function useDarkMode(): [boolean, () => void] {
  const [isDark, setDark] = useGlobalState('isDark');
  const toggleDark = () => setDark(!isDark);

  useEffect(() => {
    if (isDark) document.body.classList.add('mvn-dark');
    return () => {
      document.body.classList.remove('mvn-dark');
    };
  }, [isDark]);

  return [isDark, toggleDark];
}
