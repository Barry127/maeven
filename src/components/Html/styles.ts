import { extend } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { color } from 'csx';
import { Theme } from '../../themes/types';
import { box, pm0, textSelection } from '../../common/mixins';
import { exportStyles } from '../../common/styleHelpers';

export const a = (theme: Theme) =>
  exportStyles({
    element: extend(
      createTextStyles(theme),
      {
        textDecoration: 'none',
        color: theme.colors.types.link,
        $nest: {
          '&:hover': {
            color: color(theme.colors.types.link)
              .darken(0.1)
              .toString(),
            textDecoration: 'none'
          },
          '&:focus': {
            outline: 'none',
            color: color(theme.colors.types.link)
              .darken(0.1)
              .toString()
          },
          '&:focus:not(:active):not(:hover)': {
            textDecoration: 'underline'
          },
          '&:active': {
            color: color(theme.colors.types.link)
              .darken(0.15)
              .toString()
          }
        }
      },
      theme.overrides.A
    )
  });

export const h1 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize * 3),
      theme.overrides.H1
    )
  });

export const h2 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize * 2.25),
      theme.overrides.H2
    )
  });

export const h3 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize * 1.5),
      theme.overrides.H3
    )
  });

export const h4 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize * 1.25),
      theme.overrides.H4
    )
  });

export const h5 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize),
      {
        fontWeight: 'bold',
        marginBottom: 0
      },
      theme.overrides.H5
    )
  });

export const h6 = (theme: Theme) =>
  exportStyles({
    element: extend(
      createHeadingStyles(theme, theme.typography.fontSize),
      {
        fontStyle: 'italic',
        marginBottom: 0
      },
      theme.overrides.H6
    )
  });

export const p = (theme: Theme) =>
  exportStyles({
    element: extend(
      createTextStyles(theme),
      { marginBottom: theme.typography.fontSize },
      theme.overrides.P
    )
  });

export const ul = (theme: Theme) =>
  exportStyles({
    element: extend(
      createTextStyles(theme),
      {
        marginBottom: theme.typography.fontSize,
        marginLeft: 1.5 * theme.typography.fontSize
      },
      theme.overrides.Ul
    )
  });

export const ol = (theme: Theme) =>
  exportStyles({
    element: extend(
      createTextStyles(theme),
      {
        marginBottom: theme.typography.fontSize,
        marginLeft: 1.5 * theme.typography.fontSize
      },
      theme.overrides.Ol
    )
  });

export const li = (theme: Theme) =>
  exportStyles({
    element: extend(createTextStyles(theme), theme.overrides.Li)
  });

function createHeadingStyles(
  theme: Theme,
  fontSize: number
): NestedCSSProperties {
  return {
    ...box,
    color: theme.colors.types.heading,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.headings.fontWeight,
    lineHeight: 1.15,
    ...pm0,
    marginBottom: theme.typography.fontSize,
    fontSize,
    $nest: {
      '&::selection': textSelection(theme),
      '&:last-child': {
        marginBottom: 0
      }
    }
  };
}

function createTextStyles(theme: Theme): NestedCSSProperties {
  return {
    ...box,
    color: theme.colors.types.heading,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    lineHeight: theme.typography.lineHeight,
    ...pm0,
    $nest: {
      '&::selection': textSelection(theme),
      '&:last-child': {
        marginBottom: 0
      }
    }
  };
}
