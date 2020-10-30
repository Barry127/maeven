import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({ isDark: false });

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
