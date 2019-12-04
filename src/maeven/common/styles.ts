import { style } from 'typestyle';
import { CSSProperties } from 'react';

/**
 * Base style blocks at top. These can be overriden by specific style blocks.
 */

/** Set box-sizing to border-box */
export const box = style({
  boxSizing: 'border-box'
});

/** Theme color & background color */
export const blockColors = style({
  background: 'var(--maeven-color-background)',
  color: 'var(--maeven-color-text)'
});

/** No padding and margin */
export const pm0 = style({
  padding: 0,
  margin: 0
});

/** Default typography styles */
export const defaultTypography = style({
  //@ts-ignore
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  fontFamily: 'var(--maeven-typography-font-family)',
  fontSize: 'var(--maeven-base)',
  fontWeight: 'var(--maeven-typography-font-weight)' as CSSProperties['fontWeight'],
  lineHeight: 'var(--maeven-typography-line-height)',
  $nest: {
    '&::selection': {
      color: 'var(--maeven-color-text-selection)',
      background: 'var(--maeven-color-text-selection-background)'
    }
  }
});

//** Base style for headings */
export const headingBase = style({
  color: 'var(--maeven-color-heading)',
  fontFamily: 'var(--maeven-typography-heading-font-family)',
  fontWeight: 'var(--maeven-typography-heading-font-weight)' as CSSProperties['fontWeight'],
  lineHeight: 1.15,
  marginBottom: 'var(--maeven-base)',
  $nest: {
    '&:last-child': {
      marginBottom: 0
    }
  }
});

/**
 * Specific style blocks at bottom. These can override base styles.
 */

/** Truncate text to one line */
export const truncate = style({
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
});

/** All text colors */
export const textColor = {
  black: style({
    color: 'var(--maeven-color-black)'
  }),
  blue: style({
    color: 'var(--maeven-color-blue)'
  }),
  cyan: style({
    color: 'var(--maeven-color-cyan)'
  }),
  darkGrey: style({
    color: 'var(--maeven-color-dark-grey)'
  }),
  green: style({
    color: 'var(--maeven-color-green)'
  }),
  grey: style({
    color: 'var(--maeven-color-grey)'
  }),
  indigo: style({
    color: 'var(--maeven-color-indigo)'
  }),
  orange: style({
    color: 'var(--maeven-color-orange)'
  }),
  pink: style({
    color: 'var(--maeven-color-pink)'
  }),
  purple: style({
    color: 'var(--maeven-color-purple)'
  }),
  red: style({
    color: 'var(--maeven-color-red)'
  }),
  teal: style({
    color: 'var(--maeven-color-teal)'
  }),
  white: style({
    color: 'var(--maeven-color-white)'
  }),
  yellow: style({
    color: 'var(--maeven-color-yellow)'
  }),

  danger: style({
    color: 'var(--maeven-color-danger)'
  }),
  info: style({
    color: 'var(--maeven-color-info)'
  }),
  primary: style({
    color: 'var(--maeven-color-primary)'
  }),
  secondary: style({
    color: 'var(--maeven-color-secondary)'
  }),
  success: style({
    color: 'var(--maeven-color-success)'
  }),
  warning: style({
    color: 'var(--maeven-color-warning)'
  })
};
