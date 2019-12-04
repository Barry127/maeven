import { style } from 'typestyle';
import clsx from 'clsx';

import { Theme } from '../../types';
import { box, defaultTypography, pm0, headingBase } from '../../common/styles';

const list = style({
  marginBottom: 'var(--maeven-base)',
  marginLeft: 'calc(1.5 * var(--maeven-base))',
  $nest: {
    '&:last-child': {
      marginBottom: 0
    }
  }
});

const a = style({
  textDecoration: 'underline',
  color: 'var(--maeven-color-link)',
  $nest: {
    '&:hover': {
      color: 'var(--maeven-color-link-hover)',
      textDecoration: 'none'
    },
    '&:focus': {
      color: 'var(--maeven-color-link-focus)',
      outline: 'none'
    },
    '&:focus:not(:active):not(:hover)': {
      textDecoration: 'underline'
    },
    '&:active': {
      color: 'var(--maeven-color-link-active)'
    }
  }
});

const h1 = style({
  fontSize: 'calc(var(--maeven-base) * 3)'
});

const h2 = style({
  fontSize: 'calc(var(--maeven-base) * 2.25)'
});

const h3 = style({
  fontSize: 'calc(var(--maeven-base) * 1.5)'
});

const h4 = style({
  fontSize: 'calc(var(--maeven-base) * 1.25)'
});

const h5 = style({
  fontSize: 'var(--maeven-base)',
  fontWeight: 'bold',
  marginBottom: 0
});

const h6 = style({
  fontSize: 'var(--maeven-base)',
  fontStyle: 'italic',
  marginBottom: 0
});

const p = style({
  marginBottom: 'var(--maeven-base)',
  $nest: {
    '&:last-child': {
      marginBottom: 0
    }
  }
});

export const classes = {
  a: clsx(box, defaultTypography, a),
  h1: clsx(box, pm0, defaultTypography, headingBase, h1),
  h2: clsx(box, pm0, defaultTypography, headingBase, h2),
  h3: clsx(box, pm0, defaultTypography, headingBase, h3),
  h4: clsx(box, pm0, defaultTypography, headingBase, h4),
  h5: clsx(box, pm0, defaultTypography, headingBase, h5),
  h6: clsx(box, pm0, defaultTypography, headingBase, h6),
  li: clsx(box, pm0, defaultTypography),
  ol: clsx(box, pm0, defaultTypography, list),
  p: clsx(box, pm0, defaultTypography, p),
  span: clsx(box, defaultTypography),
  ul: clsx(box, pm0, defaultTypography, list)
};

export const themeOverride = (theme: Theme, component: keyof typeof classes) =>
  style(
    theme?.styleOverrides?.[
      component.slice(0, 1).toUpperCase() + component.slice(1)
    ]
  );
