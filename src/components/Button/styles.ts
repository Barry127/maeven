import { extend } from 'typestyle';

import { Theme } from '../../themes/types';
import {
  exportStyles,
  getColorFromTheme,
  getTextColorFromBackground
} from '../../common/styleHelpers';
import { box, pm0 } from '../../common/mixins';

import { ButtonProps } from './Button';
import { color } from 'csx';
import { CSSProperties } from 'typestyle/lib/types';

export const buttonStyles = (
  theme: Theme,
  props: ButtonProps & WithChildren,
  buttonType: ButtonType
) => {
  const styleColor = getColorFromTheme(
    props.color === 'default' ? 'secondary' : props.color!,
    theme
  );
  let colorOutline = true;

  if (props.outline) {
    if (
      color(styleColor!).red() > 196 &&
      color(styleColor!).green() > 196 &&
      color(styleColor!).blue() > 196
    ) {
      colorOutline = false;
    }
  }

  const active: CSSProperties = {
    backgroundColor: color(styleColor!)
      .darken(0.1)
      .toString(),
    backgroundImage: 'none',
    boxShadow: `inset 0 0 0 1px ${color(theme.colors.name.black)
      .fade(0.2)
      .toString()}, inset 0 1px 2px ${color(theme.colors.name.black)
      .fade(0.2)
      .toString()}`
  };

  return exportStyles({
    button: extend(
      {
        ...box,
        ...pm0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeight,
        lineHeight: 1,
        verticalAlign: 'middle',
        userSelect: 'none',
        minHeight: theme.base * 8,
        minWidth: theme.base * 8,
        cursor: 'pointer',
        borderRadius: theme.sizes.borderRadius.medium,
        border: 0,
        paddingLeft: theme.base * 2,
        paddingRight: theme.base * 2,
        $nest: {
          '&::-moz-focus-inner': {
            border: 0
          },
          '&:focus': {
            outline: 'none',
            zIndex: 10
          }
        }
      },
      props.size === 'lg'
        ? {
            minHeight: theme.base * 12,
            minWidth: theme.base * 12,
            paddingLeft: theme.base * 4,
            paddingRight: theme.base * 4,
            fontSize: theme.typography.fontSize * 1.15
          }
        : null,
      props.size === 'sm'
        ? {
            minHeight: theme.base * 6,
            minWidth: theme.base * 6,
            paddingLeft: theme.base,
            paddingRight: theme.base,
            fontSize: theme.typography.fontSize * 0.85
          }
        : null,
      props.fluid
        ? {
            display: 'flex',
            width: '100%'
          }
        : null,
      props.disabled
        ? {
            pointerEvents: 'none'
          }
        : null,
      {
        color: getTextColorFromBackground(
          styleColor!,
          color(theme.colors.name.white)
            .fade(props.disabled ? 0.8 : 1)
            .toString(),
          color(theme.colors.name.black)
            .fade(props.disabled ? 0.5 : 1)
            .toString()
        ),
        backgroundColor: props.disabled
          ? color(styleColor!)
              .fade(0.5)
              .toString()
          : styleColor!,
        backgroundImage: props.disabled
          ? 'none'
          : `linear-gradient(180deg, ${color(styleColor!)
              .lighten(0.05)
              .toString()}, ${color(styleColor!)
              .darken(0.05)
              .toString()})`,
        boxShadow: `inset 0 0 0 1px ${color(theme.colors.name.black)
          .fade(0.2)
          .toString()}, inset 0 -1px 0 ${color(theme.colors.name.black)
          .fade(0.1)
          .toString()}`,
        $nest: {
          '&:hover, &:focus': {
            backgroundColor: color(styleColor!)
              .darken(0.05)
              .toString(),
            backgroundImage: `linear-gradient(180deg, ${color(styleColor!)
              .darken(0)
              .toString()}, ${color(styleColor!)
              .darken(0.1)
              .toString()})`,
            boxShadow: `inset 0 0 0 1px ${color(theme.colors.name.black)
              .fade(0.2)
              .toString()}, inset 0 -1px 0 ${color(theme.colors.name.black)
              .fade(0.1)
              .toString()}`
          },
          '&:active': active
        }
      },
      props.outline && !props.link
        ? {
            backgroundColor: theme.colors.name.white,
            backgroundImage: 'none',
            boxShadow: colorOutline
              ? `inset 0 0 0 1px ${color(styleColor!)
                  .fade(props.disabled ? 0.3 : 1)
                  .toString()}, inset 0 -1px 0 ${color(styleColor!)
                  .fade(props.disabled ? 0.3 : 1)
                  .toString()}`
              : `inset 0 0 0 1px ${color(theme.colors.name.black)
                  .fade(0.2)
                  .toString()}, inset 0 -1px 0 ${color(theme.colors.name.black)
                  .fade(0.1)
                  .toString()}`,
            color: props.disabled
              ? color(theme.colors.types.text)
                  .fade(0.5)
                  .toString()
              : getTextColorFromBackground(
                  styleColor!,
                  styleColor!,
                  theme.colors.name.black
                ),
            $nest: {
              '&:hover, &:focus': {
                color: getTextColorFromBackground(
                  styleColor!,
                  theme.colors.name.white,
                  theme.colors.name.black
                )
              }
            }
          }
        : null,
      props.link
        ? {
            color: props.disabled
              ? color(theme.colors.types.text)
                  .fade(0.5)
                  .toString()
              : theme.colors.types.link,
            background: 'transparent !important',
            boxShadow: 'none',
            $nest: {
              '&:hover, &:focus': {
                color: color(theme.colors.types.link)
                  .darken(0.1)
                  .toString()
              },
              '&:active': {
                color: color(theme.colors.types.link)
                  .darken(0.15)
                  .toString()
              }
            }
          }
        : null,
      props.active && !props.disabled
        ? {
            ...active,
            $nest: {
              '&:hover, &:focus': active
            }
          }
        : null,
      buttonType === 'Button'
        ? theme.overrides.Button
        : theme.overrides.AnchorButton
    ),
    focusOutline: extend({
      $nest: {
        '&::before': {
          transition: 'box-shadow 3s ease-in',
          borderRadius: 'inherit',
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: `0 0 ${theme.base}px ${theme.base}px ${color(
            theme.colors.types.focus
          )
            .fade(0.5)
            .toString()}`
        }
      }
    }),
    text: extend({
      fontSize: '0.95em',
      display: 'inline-block',
      marginLeft: theme.base,
      marginRight: theme.base
    }),
    iconLeft: extend(
      {
        marginRight: props.children ? theme.base : 0
      },
      props.size === 'lg'
        ? {
            fontSize: '1.25em'
          }
        : null,
      props.size === 'sm'
        ? {
            fontSize: '0.95em',
            marginRight: 0
          }
        : null
    ),
    iconRight: extend(
      {
        marginLeft: theme.base
      },
      props.size === 'lg'
        ? {
            fontSize: '1.25em'
          }
        : null,
      props.size === 'sm'
        ? {
            fontSize: '0.95em',

            marginLeft: 0
          }
        : null
    )
  });
};

interface WithChildren {
  children?: any;
}

export type ButtonType = 'Button' | 'AnchorButton';
