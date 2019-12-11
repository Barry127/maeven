import { NestedCSSProperties } from 'typestyle/lib/types';
import { style, media } from 'typestyle';

import { Theme } from '../types';

export function responsiveStyle(
  theme: Theme,
  styles: ResponsiveCSSProperties
): string {
  return style(
    styles.default,
    styles.xs ? media({ maxWidth: theme.media.xs.to }, styles.xs) : null,
    styles.sm
      ? media(
          { minWidth: theme.media.sm.from, maxWidth: theme.media.sm.to },
          styles.sm
        )
      : null,
    styles.md
      ? media(
          { minWidth: theme.media.md.from, maxWidth: theme.media.md.to },
          styles.md
        )
      : null,
    styles.lg
      ? media(
          { minWidth: theme.media.lg.from, maxWidth: theme.media.lg.to },
          styles.lg
        )
      : null,
    styles.xl ? media({ minWidth: theme.media.xl.from }, styles.xl) : null
  );
}

interface ResponsiveCSSProperties {
  default?: NestedCSSProperties;
  xs?: NestedCSSProperties;
  sm?: NestedCSSProperties;
  md?: NestedCSSProperties;
  lg?: NestedCSSProperties;
  xl?: NestedCSSProperties;
}
