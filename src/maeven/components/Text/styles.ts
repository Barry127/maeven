import { CSSProperties } from 'react';
import { style } from 'typestyle';

import { Theme } from '../../types';
import { truncate, textColor } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';

const text = style({
  background: 'transparent'
});

export const classes = {
  text,
  background: 'transparent',
  color: textColor,
  truncate,
  styleHtml: style({
    /* ugly but keeps rest of code clean */
    $nest: {
      '& a, & h1, & h2, & h3, & h4, & h5, & h6, & li, & ol, & p, & span, & ul': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
        fontFamily: 'var(--maeven-typography-font-family)',
        fontSize: 'var(--maeven-base)',
        fontWeight: 'var(--maeven-typography-font-weight)' as CSSProperties['fontWeight'],
        lineHeight: 'var(--maeven-typography-line-height)'
      },
      '& a::selection, & h1::selection, & h2::selection, & h3::selection, & h4::selection, & h5::selection, & h6::selection, & li::selection, & ol::selection, & p::selection, & span::selection, ul::selection': {
        color: 'var(--maeven-color-text-selection)',
        background: 'var(--maeven-color-text-selection-background)'
      },
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: 'var(--maeven-color-heading)',
        fontFamily: 'var(--maeven-typography-heading-font-family)',
        fontWeight: 'var(--maeven-typography-heading-font-weight)' as CSSProperties['fontWeight'],
        lineHeight: 1.15,
        marginBottom: 'var(--maeven-base)'
      },
      '& ol, & ul': {
        marginBottom: 'var(--maeven-base)',
        marginLeft: 'calc(1.5 * var(--maeven-base))'
      },
      '& a': {
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
      },
      '& h1': {
        fontSize: 'calc(var(--maeven-base) * 3)'
      },
      '& h2': {
        fontSize: 'calc(var(--maeven-base) * 2.25)'
      },
      '& h3': {
        fontSize: 'calc(var(--maeven-base) * 1.5)'
      },
      '& h4': {
        fontSize: 'calc(var(--maeven-base) * 1.25)'
      },
      '& h5': {
        fontSize: 'var(--maeven-base)',
        fontWeight: 'bold',
        marginBottom: 0
      },
      '& h6': {
        fontSize: 'var(--maeven-base)',
        fontStyle: 'italic',
        marginBottom: 0
      },
      '& p': {
        marginBottom: 'var(--maeven-base)'
      },
      '& a::last-child, & h1::last-child, & h2::last-child, & h3::last-child, & h4::last-child, & h5::last-child, & h6::last-child, & li::last-child, & ol::last-child, & p::last-child, & span::last-child, ul::last-child': {
        marginBottom: 0
      }
    }
  })
};

export const themeOverride = themeOverrideFactory('Text');

export const styleHtmlThemeOverride = (theme: Theme) =>
  style({
    $nest: {
      '& a': theme.styleOverrides?.A,
      '& h1': theme.styleOverrides?.H1,
      '& h2': theme.styleOverrides?.H2,
      '& h3': theme.styleOverrides?.H3,
      '& h4': theme.styleOverrides?.H4,
      '& h5': theme.styleOverrides?.H5,
      '& h6': theme.styleOverrides?.H6,
      '& li': theme.styleOverrides?.Li,
      '& ol': theme.styleOverrides?.Ol,
      '& p': theme.styleOverrides?.P,
      '& span': theme.styleOverrides?.Span,
      '& ul': theme.styleOverrides?.Ul
    }
  });
