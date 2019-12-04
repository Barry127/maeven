import { style } from 'typestyle';

import { Theme } from '../types';

export function themeOverrideFactory(component: string) {
  return function themeOverride(theme: Theme) {
    return style(theme?.styleOverrides?.[component]);
  };
}
