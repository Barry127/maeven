import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { ThemeProvider } from '../../components';
import maeven from '../../themes/maeven';
import { useTheme } from './useTheme';

const theme2 = { ...maeven, name: 'Theme2' };

describe('useTheme', () => {
  it('Returns MaevenDefault theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.name).toBe(maeven.name);
  });

  it('Returns theme set with ThemeProvider', () => {
    const wrapper = ({ children }: any) => (
      <ThemeProvider theme={theme2}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.name).toBe('Theme2');
  });
});
