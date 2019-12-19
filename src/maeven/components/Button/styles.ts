import { CSSProperties } from 'react';
import clsx from 'clsx';
import { linearGradient } from 'csx';
import { style } from 'typestyle';

import { box, pm0 } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';
import { NestedCSSProperties } from 'typestyle/lib/types';

const focusOutline = style({
  $nest: {
    '&:focus': {
      textDecoration: 'none',
      position: 'relative',
      zIndex: 1,
      $nest: {
        '&::before': {
          position: 'absolute',
          borderRadius: 'inherit',
          content: '""',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          boxShadow:
            '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)'
        }
      }
    }
  }
});

const activeProps = {
  color: 'var(--maeven-button-color-active)',
  backgroundColor: 'var(--maeven-button-background-color-active)',
  backgroundImage: 'var(--maeven-button-background-image-active)',
  boxShadow: 'var(--maeven-button-box-shadow-active)'
};

const buttonText = style({
  fontSize: '0.95em',
  display: 'inline-block',
  margin: '0 calc(var(--maeven-base) / 4)'
});

const iconLeft = style({
  marginRight: 'calc(var(--maeven-base) / 4)',
  $nest: {
    '&:last-child': {
      marginRight: 0
    }
  }
});

const iconRight = style({
  marginLeft: 'calc(var(--maeven-base) / 4)',
  $nest: {
    '&:first-child': {
      marginLeft: 0
    }
  }
});

const button = style({
  color: 'var(--maeven-button-color)',
  backgroundColor: 'var(--maeven-button-background-color)',
  backgroundImage: 'var(--maeven-button-background-image)',
  boxShadow: 'var(--maeven-button-box-shadow)',
  display: 'inline-flex',
  position: 'relative',
  padding: '0 calc(var(--maeven-base) / 2)',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--maeven-typography-font-family)',
  fontSize: 'var(--maeven-base)',
  fontWeight: 'var(--maeven-typography-font-weight)' as CSSProperties['fontWeight'],
  lineHeight: 1,
  verticalAlign: 'middle',
  userSelect: 'none',
  height: 'calc(var(--maeven-base) * 2)',
  minWidth: 'calc(var(--maeven-base) * 2)',
  cursor: 'pointer',
  borderRadius: 'var(--maeven-size-border-radius-medium)',
  border: 0,
  $nest: {
    '&::-moz-focus-inner': {
      border: 0
    },
    '&:focus': {
      outline: 0,
      zIndex: 1
    },
    '&:hover, &:focus': {
      color: 'var(--maeven-button-color-focus)',
      backgroundColor: 'var(--maeven-button-background-color-focus)',
      backgroundImage: 'var(--maeven-button-background-image-focus)'
    },
    '&:active': activeProps
  }
});

const fluid = style({
  display: 'flex',
  width: '100%'
});

const sm = style({
  height: 'calc(var(--maeven-base) * 1.5)',
  minWidth: 'calc(var(--maeven-base) * 1.5)',
  padding: '0 calc(var(--maeven-base) / 4)',
  fontSize: 'calc(var(--maeven-base) * 0.85)',
  $nest: {
    [`& .${iconLeft}, & .${iconRight}`]: {
      fontSize: '0.95em'
    },
    [`& .${iconLeft}`]: {
      marginRight: 0
    },
    [`& .${iconRight}`]: {
      marginLeft: 0
    }
  }
});

const lg = style({
  height: 'calc(var(--maeven-base) * 3)',
  minWidth: 'calc(var(--maeven-base) * 3)',
  padding: '0 var(--maeven-base)',
  fontSize: 'calc(var(--maeven-base) * 1.15)',
  $nest: {
    [`& .${iconLeft}, & .${iconRight}`]: {
      fontSize: '1.25em'
    }
  }
});

const disabled = style({
  pointerEvents: 'none',
  backgroundColor: 'var(--maeven-button-background-color-disabled)',
  backgroundImage: 'none',
  $nest: {
    [`& > span`]: {
      opacity: 'var(--maeven-button-opacity-disabled)'
    }
  }
});

const active = style({
  ...activeProps,
  pointerEvents: 'none'
});

const outline = style({
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'var(--maeven-button-outline-box-shadow)',
  color: 'var(--maeven-button-outline-color)',
  $nest: {
    '&:disabled': {
      boxShadow:
        'inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)'
    }
  }
});

export const classes = {
  button: clsx(box, pm0, button),
  buttonText,
  disabled,
  iconLeft,
  iconRight,
  fluid,
  focusOutline,
  active,
  outline,
  sm,
  lg,
  buttonTypes: {
    default: style(makeVars('secondary')),
    link: style(
      makeVars('secondary', {
        '--maeven-button-background-color': 'transparent',
        '--maeven-button-background-color-focus': 'transparent',
        '--maeven-button-background-color-active': 'transparent',
        '--maeven-button-background-image': 'none',
        '--maeven-button-background-image-focus': 'none',
        '--maeven-button-box-shadow': 'none',
        '--maeven-button-color': 'var(--maeven-color-link)',
        '--maeven-button-color-focus': 'var(--maeven-color-link-hover)',
        '--maeven-button-color-active': 'var(--maeven-color-link-active)',
        '--maeven-button-opacity-disabled': '0.5',
        '--maeven-button-outline-color': 'var(--maeven-color-link)',

        $nest: {
          '&:focus:not(:active):not(:hover)': {
            color: 'var(--maeven-color-link)'
          },
          '&:hover:not(:active)': {
            boxShadow: `inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)`
          }
        }
      })
    ),
    danger: style(makeVars('danger')),
    info: style(makeVars('info')),
    primary: style(makeVars('primary')),
    secondary: style(makeVars('secondary')),
    success: style(makeVars('success')),
    warning: style(makeVars('warning'))
  }
};

export const themeOverride = themeOverrideFactory('Button');

function makeVars(
  type: string,
  override: VarsOverride = {}
): NestedCSSProperties {
  return {
    '--maeven-button-background-color': `var(--maeven-color-${type})`,
    '--maeven-button-background-color-focus': `var(--maeven-color-${type}-d05)`,
    '--maeven-button-background-color-active': `var(--maeven-color-${type}-d10)`,
    '--maeven-button-background-color-disabled': `var(--maeven-color-${type}-f50)`,
    '--maeven-button-background-image': linearGradient(
      '180deg',
      `var(--maeven-color-${type}-l05)`,
      `var(--maeven-color-${type}-d05)`
    ),
    '--maeven-button-background-image-focus': linearGradient(
      '180deg',
      `var(--maeven-color-${type})`,
      `var(--maeven-color-${type}-d10)`
    ),
    '--maeven-button-background-image-active': 'none',
    '--maeven-button-box-shadow': `inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)`,
    '--maeven-button-box-shadow-active': `inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 1px 2px var(--maeven-color-black-f20)`,
    '--maeven-button-color': `var(--maeven-color-${type}-text)`,
    '--maeven-button-color-focus': `var(--maeven-color-${type}-text)`,
    '--maeven-button-color-active': `var(--maeven-color-${type}-text)`,
    '--maeven-button-opacity-disabled': '0.65',
    '--maeven-button-outline-box-shadow': `var(--maeven-color-${type}-outline)`,
    '--maeven-button-outline-color': `var(--maeven-color-${type})`,
    ...override
  } as NestedCSSProperties;
}

interface VarsOverride {
  [key: string]: any;
}
