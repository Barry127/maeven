import { cssRaw } from 'typestyle';

import { theme2CssVars } from './theme2CssVars';
import { cssVars2Root } from './cssVars2Root';

import { Theme } from '../../types';

/**
 * Append css vars for default theme to style in document head
 */
export function setDefaultTheme(theme: Theme): void {
  const styles = cssVars2Root(theme2CssVars(theme));
  cssRaw(styles);
  cssRaw(`body {
    background: var(--maeven-color-body-background);
  }`);
}
