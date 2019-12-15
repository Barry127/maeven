import { CSSProperties } from 'react';

import { Theme } from '../../types';

/**
 * Convert Theme to a dictionary of CSS vars
 */
export function theme2CssVars(theme: Theme): CSSProperties {
  return {
    '--maeven-base':
      typeof theme.base === 'number' ? `${theme.base}px` : theme.base,

    '--maeven-size-border-radius-medium':
      typeof theme.sizes.borderRadius.medium === 'number'
        ? `${theme.sizes.borderRadius.medium}px`
        : theme.sizes.borderRadius.medium,
    '--maeven-size-border-radius-large':
      typeof theme.sizes.borderRadius.large === 'number'
        ? `${theme.sizes.borderRadius.large}px`
        : theme.sizes.borderRadius.large,

    '--maeven-color-black': theme.colors.name.black,
    '--maeven-color-blue': theme.colors.name.blue,
    '--maeven-color-cyan': theme.colors.name.cyan,
    '--maeven-color-dark-grey': theme.colors.name.darkGrey,
    '--maeven-color-green': theme.colors.name.green,
    '--maeven-color-grey': theme.colors.name.grey,
    '--maeven-color-indigo': theme.colors.name.indigo,
    '--maeven-color-orange': theme.colors.name.orange,
    '--maeven-color-pink': theme.colors.name.pink,
    '--maeven-color-purple': theme.colors.name.purple,
    '--maeven-color-red': theme.colors.name.red,
    '--maeven-color-teal': theme.colors.name.teal,
    '--maeven-color-white': theme.colors.name.white,
    '--maeven-color-yellow': theme.colors.name.yellow,

    '--maeven-color-danger': theme.colors.semantic.danger,
    '--maeven-color-info': theme.colors.semantic.info,
    '--maeven-color-primary': theme.colors.semantic.primary,
    '--maeven-color-secondary': theme.colors.semantic.secondary,
    '--maeven-color-success': theme.colors.semantic.success,
    '--maeven-color-warning': theme.colors.semantic.warning,

    '--maeven-color-background': theme.colors.role.background,
    '--maeven-color-body-background': theme.colors.role.bodyBackground,
    '--maeven-color-focus': theme.colors.role.focus,
    '--maeven-color-heading': theme.colors.role.heading,
    '--maeven-color-link': theme.colors.role.link,
    '--maeven-color-link-hover': theme.colors.role.linkHover,
    '--maeven-color-link-focus': theme.colors.role.linkFocus,
    '--maeven-color-link-active': theme.colors.role.linkActive,
    '--maeven-color-text': theme.colors.role.text,
    '--maeven-color-text-inverted': theme.colors.role.textInverted,
    '--maeven-color-text-selection': theme.colors.role.textSelection,
    '--maeven-color-text-selection-background':
      theme.colors.role.textSelectionBackground,

    '--maeven-typography-font-family': theme.typography.fontFamily,
    '--maeven-typography-font-family-monospace':
      theme.typography.fontFamilyMonospace,
    '--maeven-typography-font-weight': theme.typography.fontWeight,
    '--maeven-typography-line-height': theme.typography.lineHeight,

    '--maeven-typography-heading-font-family':
      theme.typography.heading.fontFamily,
    '--maeven-typography-heading-font-weight':
      theme.typography.heading.fontWeight
  } as CSSProperties;
}
