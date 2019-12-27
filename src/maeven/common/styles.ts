import { style } from 'typestyle';
import { CSSProperties } from 'react';

import { createElevation } from './createElevation';

/**
 * Base style blocks at top. These can be overriden by specific style blocks.
 */

/** Set box-sizing to border-box */
export const box = style({
  boxSizing: 'border-box'
});

/** Display none */
export const hidden = style({
  display: 'none'
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

/** Base style for styled -webkit- scrollbars */
export const scrollbars = style({
  $nest: {
    '&::-webkit-scrollbar': {
      background: 'transparent',
      position: 'absolute',
      width: 'calc(var(--maeven-base) * 0.75)'
    },
    '&::-webkit-scrollbar-button': {
      display: 'none'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'var(--maeven-color-text-f20)',
      borderRadius: 'calc(var(--maeven-base) * 0.375)',
      border: '1px solid var(--maeven-color-background)',
      minHeight: 'calc(var(--maeven-base) * 1.5)',
      $nest: {
        '&:hover': {
          background: 'var(--maeven-color-text-f50)'
        }
      }
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

export const elevation = [
  style({ boxShadow: createElevation(0) }),
  style({ boxShadow: createElevation(1) }),
  style({ boxShadow: createElevation(2) }),
  style({ boxShadow: createElevation(3) }),
  style({ boxShadow: createElevation(4) })
];
