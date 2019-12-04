import { CSSProperties } from 'react';

/**
 * Convert a dictionary of css vars to a :root {} css selector
 */
export function cssVars2Root(cssVars: CSSProperties): string {
  return `:root {${Object.entries(cssVars).reduce(
    (styles, [name, value]) => `${styles}${name}: ${value};`,
    ''
  )}}`;
}
