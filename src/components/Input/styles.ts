import { extend } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { color } from 'csx';

import { Theme } from '../../themes/types';
import { exportStyles } from '../../common/styleHelpers';
import { box, pm0, textSelection, scrollbars } from '../../common/mixins';
import { flatButtonStyles } from '../Button/styles';

import { TextInputProps } from './TextInput';
import { PasswordInputProps } from './PasswordInput';
import { TextAreaProps } from './TextArea';

const container: NestedCSSProperties = {
  ...box,
  ...pm0,
  width: '100%'
};

const baseLabel = (
  theme: Theme,
  props: TextInputProps | TextAreaProps
): NestedCSSProperties =>
  extend(
    {
      ...box,
      ...pm0,
      display: 'flex',
      lineHeight: 1,
      color: theme.colors.types.text,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      $nest: {
        '&:not(:last-child)': {
          marginBottom: theme.typography.fontSize / 2
        }
      }
    },
    props.hasError
      ? {
          color: theme.colors.semantic.danger
        }
      : null,
    props.size === 'lg'
      ? {
          fontSize: theme.typography.fontSize * 1.25
        }
      : null,
    props.size === 'sm'
      ? {
          fontSize: theme.typography.fontSize * 0.85
        }
      : null
  );

const baseInput = (
  theme: Theme,
  props: TextInputProps | TextAreaProps
): NestedCSSProperties =>
  extend({
    ...pm0,
    flexGrow: 1,
    color: theme.colors.types.text,
    background: theme.colors.types.background,
    fontFamily: 'inherit',
    fontSize: '0.95em',
    fontWeight: theme.typography.fontWeight,
    lineHeight: 1,
    border: `1px solid ${theme.colors.types.border}`,
    borderRadius: theme.sizes.borderRadius.medium,
    $nest: {
      '&:focus': {
        outline: 'none',
        zIndex: 1,
        borderColor: theme.colors.types.focus,
        boxShadow: `0 0 ${theme.base}px ${theme.base}px ${color(
          theme.colors.types.focus
        )
          .fade(0.5)
          .toString()}`
      },
      '&[readonly]:focus': {
        borderColor: theme.colors.types.border,
        boxShadow: 'none'
      },
      '&::placeholder': {
        color: color(theme.colors.types.text)
          .fade(0.4)
          .toString()
      },
      '&::selection': textSelection(theme),
      '&:disabled': {
        background: color(theme.colors.types.text)
          .fade(0.1)
          .toString(),
        borderColor: 'transparent',
        color: color(theme.colors.types.text)
          .fade(0.5)
          .toString()
      }
    }
  });

export const areaStyles = (theme: Theme, props: TextAreaProps) =>
  exportStyles({
    container: extend(container, theme.overrides.TextArea),

    label: extend(baseLabel(theme, props)),

    textarea: extend(
      baseInput(theme, props),
      scrollbars(theme),
      {
        padding: theme.base * 2
      },
      !props.autoSize ? { ...box } : null
    )
  });

export const inputStyles = (theme: Theme, props: TextInputProps) =>
  exportStyles({
    container: extend(container, theme.overrides.TextInput),

    label: extend(baseLabel(theme, props), {
      position: 'relative'
    }),

    input: extend(
      baseInput(theme, props),
      {
        ...box,
        height: theme.base * 8,
        paddingLeft: props.icon
          ? theme.base * 3 + theme.typography.fontSize
          : theme.base * 2,
        paddingRight: props.iconRight
          ? theme.base * 3 + theme.typography.fontSize
          : theme.base * 2,
        $nest: {
          '&:focus': {
            $nest: {
              '& ~ span': {
                opacity: 0.8
              }
            }
          }
        }
      },
      props.hasError
        ? {
            color: theme.colors.semantic.danger,
            borderColor: color(theme.colors.semantic.danger)
              .lighten(0.2)
              .toString(),
            background: color(theme.colors.semantic.danger)
              .mix(theme.colors.types.background, 0.1)
              .toString(),
            $nest: {
              '&:focus': {
                borderColor: theme.colors.semantic.danger,
                boxShadow: `0 0 ${theme.base}px ${theme.base}px ${color(
                  theme.colors.semantic.danger
                )
                  .fade(0.3)
                  .toString()}`
              }
            }
          }
        : null,
      props.size === 'lg'
        ? {
            height: theme.base * 12,
            paddingLeft: props.icon
              ? theme.base * 6 + theme.typography.fontSize
              : theme.base * 4,
            paddingRight: props.iconRight
              ? theme.base * 6 + theme.typography.fontSize
              : theme.base * 4
          }
        : null,
      props.size === 'sm'
        ? {
            height: theme.base * 6,
            paddingLeft: props.icon
              ? theme.base * 2.25 + theme.typography.fontSize
              : theme.base * 1.5,
            paddingRight: props.iconRight
              ? theme.base * 2.25 + theme.typography.fontSize
              : theme.base * 1.5
          }
        : null
    ),

    icon: extend({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.6
    }),

    iconLeft: extend(
      {
        left: theme.base * 1.5
      },
      props.size === 'lg'
        ? {
            left: theme.base * 3
          }
        : null
    ),

    iconRight: extend(
      {
        right: theme.base * 1.5
      },
      props.size === 'lg'
        ? {
            right: theme.base * 3
          }
        : null
    ),

    rightElement: extend({
      position: 'absolute',
      top: '50%',
      right: 1,
      transform: 'translateY(-50%)',
      zIndex: 1,
      display: 'flex',
      alignContent: 'space-around'
    }),

    children: extend(
      props.hasError
        ? {
            color: theme.colors.semantic.danger
          }
        : null
    )
  });

export const passwordStyles = (theme: Theme, props: PasswordInputProps) =>
  exportStyles({
    input: extend(
      {
        $nest: {
          '& input': {
            paddingRight:
              theme.base *
              (props.size === 'md' ? 8 : props.size === 'sm' ? 6 : 12)
          }
        }
      },
      theme.overrides.PasswordInput
    ),
    toggle: extend(
      flatButtonStyles(theme),
      props.hasError
        ? {
            color: theme.colors.semantic.danger
          }
        : null
    )
  });
