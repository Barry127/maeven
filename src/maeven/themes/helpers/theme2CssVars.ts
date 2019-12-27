import { CSSProperties } from 'react';
import { color } from 'csx';

import { Theme } from '../../types';
import { getTextColorFromBackground } from './getTextColorFromBackground';

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

    '--maeven-animation-default-timing': theme.animations.defaultTiming,
    '--maeven-animation-default-timing-function':
      theme.animations.defaultTimingFunction,

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

    '--maeven-color-black-f10': color(theme.colors.name.black)
      .fade(0.1)
      .toString(),
    '--maeven-color-black-f20': color(theme.colors.name.black)
      .fade(0.2)
      .toString(),

    '--maeven-color-danger': theme.colors.semantic.danger,
    '--maeven-color-danger-text': getTextColorFromBackground(
      theme.colors.semantic.danger,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-danger-d05': color(theme.colors.semantic.danger)
      .darken(0.05)
      .toString(),
    '--maeven-color-danger-d10': color(theme.colors.semantic.danger)
      .darken(0.1)
      .toString(),
    '--maeven-color-danger-f50': color(theme.colors.semantic.danger)
      .fade(0.5)
      .toString(),
    '--maeven-color-danger-l05': color(theme.colors.semantic.danger)
      .lighten(0.05)
      .toString(),
    '--maeven-color-danger-outline': outlineContrast(
      theme.colors.semantic.danger
    ),
    '--maeven-color-info': theme.colors.semantic.info,
    '--maeven-color-info-text': getTextColorFromBackground(
      theme.colors.semantic.info,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-info-d05': color(theme.colors.semantic.info)
      .darken(0.05)
      .toString(),
    '--maeven-color-info-d10': color(theme.colors.semantic.info)
      .darken(0.1)
      .toString(),
    '--maeven-color-info-f50': color(theme.colors.semantic.info)
      .fade(0.5)
      .toString(),
    '--maeven-color-info-l05': color(theme.colors.semantic.info)
      .lighten(0.05)
      .toString(),
    '--maeven-color-info-outline': outlineContrast(theme.colors.semantic.info),
    '--maeven-color-primary': theme.colors.semantic.primary,
    '--maeven-color-primary-text': getTextColorFromBackground(
      theme.colors.semantic.primary,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-primary-d05': color(theme.colors.semantic.primary)
      .darken(0.05)
      .toString(),
    '--maeven-color-primary-d10': color(theme.colors.semantic.primary)
      .darken(0.1)
      .toString(),
    '--maeven-color-primary-f50': color(theme.colors.semantic.primary)
      .fade(0.5)
      .toString(),
    '--maeven-color-primary-l05': color(theme.colors.semantic.primary)
      .lighten(0.05)
      .toString(),
    '--maeven-color-primary-outline': outlineContrast(
      theme.colors.semantic.primary
    ),
    '--maeven-color-secondary': theme.colors.semantic.secondary,
    '--maeven-color-secondary-text': getTextColorFromBackground(
      theme.colors.semantic.secondary,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-secondary-d05': color(theme.colors.semantic.secondary)
      .darken(0.05)
      .toString(),
    '--maeven-color-secondary-d10': color(theme.colors.semantic.secondary)
      .darken(0.1)
      .toString(),
    '--maeven-color-secondary-f50': color(theme.colors.semantic.secondary)
      .fade(0.5)
      .toString(),
    '--maeven-color-secondary-l05': color(theme.colors.semantic.secondary)
      .lighten(0.05)
      .toString(),
    '--maeven-color-secondary-outline': outlineContrast(
      theme.colors.semantic.secondary
    ),
    '--maeven-color-success': theme.colors.semantic.success,
    '--maeven-color-success-text': getTextColorFromBackground(
      theme.colors.semantic.success,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-success-d05': color(theme.colors.semantic.success)
      .darken(0.05)
      .toString(),
    '--maeven-color-success-d10': color(theme.colors.semantic.success)
      .darken(0.1)
      .toString(),
    '--maeven-color-success-f50': color(theme.colors.semantic.success)
      .fade(0.5)
      .toString(),
    '--maeven-color-success-l05': color(theme.colors.semantic.success)
      .lighten(0.05)
      .toString(),
    '--maeven-color-success-outline': outlineContrast(
      theme.colors.semantic.success
    ),
    '--maeven-color-warning': theme.colors.semantic.warning,
    '--maeven-color-warning-text': getTextColorFromBackground(
      theme.colors.semantic.warning,
      theme.colors.role.textLight,
      theme.colors.role.textDark
    ),
    '--maeven-color-warning-d05': color(theme.colors.semantic.warning)
      .darken(0.05)
      .toString(),
    '--maeven-color-warning-d10': color(theme.colors.semantic.warning)
      .darken(0.1)
      .toString(),
    '--maeven-color-warning-f50': color(theme.colors.semantic.warning)
      .fade(0.5)
      .toString(),
    '--maeven-color-warning-l05': color(theme.colors.semantic.warning)
      .lighten(0.05)
      .toString(),
    '--maeven-color-warning-outline': outlineContrast(
      theme.colors.semantic.warning
    ),

    '--maeven-color-background': theme.colors.role.background,
    '--maeven-color-body-background': theme.colors.role.bodyBackground,
    '--maeven-color-border': theme.colors.role.border,
    '--maeven-color-focus': theme.colors.role.focus,
    '--maeven-color-focus-border': theme.colors.role.focusBorder,
    '--maeven-color-heading': theme.colors.role.heading,
    '--maeven-color-link': theme.colors.role.link,
    '--maeven-color-link-hover': theme.colors.role.linkHover,
    '--maeven-color-link-focus': theme.colors.role.linkFocus,
    '--maeven-color-link-active': theme.colors.role.linkActive,
    '--maeven-color-text': theme.colors.role.text,
    '--maeven-color-text-f10': color(theme.colors.role.text)
      .fade(0.1)
      .toString(),
    '--maeven-color-text-f20': color(theme.colors.role.text)
      .fade(0.2)
      .toString(),
    '--maeven-color-text-f50': color(theme.colors.role.text)
      .fade(0.5)
      .toString(),
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

function outlineContrast(outlineColor: string): string {
  const c = color(outlineColor);

  if (c.red() > 196 && c.green() > 196 && c.blue() > 196) {
    return `inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)`;
  }

  return `inset 0 0 0 1px ${outlineColor}, inset 0 -1px 0 ${outlineColor}`;
}
