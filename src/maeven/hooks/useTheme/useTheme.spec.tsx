import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { MaevenDefault, MaevenDark } from '../../themes';
import { ThemeProvider } from '../../components/ThemeProvider';

import { useTheme } from './useTheme';

describe('useTheme', () => {
  it('Returns MaevenDefault theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe(MaevenDefault);
  });

  it('Returns theme set with ThemeProvider', () => {
    const wrapper = ({ children }: any) => (
      <ThemeProvider theme={MaevenDark}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).toBe(MaevenDark);
  });
});
