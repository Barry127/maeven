import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import MaevenTheme from '../../themes/Maeven';
import { Theme } from '../../themes/types';
import { ThemeProvider } from '../../components/ThemeProvider';

import { useTheme } from './useTheme';

describe('useTheme', () => {
  it('Returns Maeven theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe(MaevenTheme);
  });

  it('Returns theme set wth ThemeProvider', () => {
    const customTheme = {} as Theme;
    const wrapper = ({ children }: any) => (
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).toBe(customTheme);
  });
});
