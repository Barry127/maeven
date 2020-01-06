import clsx from 'clsx';
import { style } from 'typestyle';
import { linearGradient } from 'csx';

import { pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 'calc(var(--maeven-base) * 2)'
});

const icon = style({
  fontSize: '.9em',
  opacity: 0,
  transform: 'scale(.5)',
  transition:
    'opacity var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function), transform var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)'
});

const box = style({
  height: '1em',
  width: '1em',
  lineHeight: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--maeven-color-secondary-text)',
  backgroundColor: `var(--maeven-color-secondary)`,
  backgroundImage: linearGradient(
    '180deg',
    'var(--maeven-color-secondary-l05)',
    'var(--maeven-color-secondary-d05)'
  ),
  boxShadow:
    'inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)',
  borderRadius: 'var(--maeven-size-border-radius-small)',
  marginRight: 'calc(var(--maeven-base) / 2)'
});

const text = style({
  flexGrow: 1,
  fontSize: '1em'
});

const checkbox = style({
  opacity: 0,
  height: 0,
  width: 0,
  position: 'absolute',
  $nest: {
    [`&:focus + .${box}`]: {
      zIndex: 1,
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)',
      backgroundColor: 'var(--maeven-color-secondary-d05)',
      backgroundImage: linearGradient(
        '180deg',
        'var(--maeven-color-secondary)',
        'var(--maeven-color-secondary-d10)'
      )
    },
    [`&:active:not(:disabled) + .${box}`]: {
      backgroundColor: 'var(--maeven-color-secondary-d10)',
      boxShadow:
        'inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 1px 2px var(--maeven-color-black-f20)',
      backgroundImage: 'none'
    },
    [`&:disabled + .${box}`]: {
      backgroundColor: 'var(--maeven-color-secondary-f50)',
      backgroundImage: 'none'
    },
    [`&:disabled ~ .${text}`]: {
      backgroundColor: 'var(--maeven-color-secondary-f50)',
      opacity: 0.65
    },
    [`&:checked + .${box} .${icon}, &:indeterminate + .${box} .${icon}`]: {
      opacity: 1,
      transform: 'scale(1)'
    },
    [`&:checked:not(:indeterminate) + .${box}`]: {
      color: 'var(--maeven-color-primary-text)',
      backgroundColor: `var(--maeven-color-primary)`,
      backgroundImage: linearGradient(
        '180deg',
        'var(--maeven-color-primary-l05)',
        'var(--maeven-color-primary-d05)'
      )
    },
    [`&:checked:focus:not(:indeterminate) + .${box}`]: {
      backgroundColor: 'var(--maeven-color-primary-d05)',
      backgroundImage: linearGradient(
        '180deg',
        'var(--maeven-color-primary)',
        'var(--maeven-color-primary-d10)'
      )
    },
    [`&:checked:active:not(:indeterminate):not(:disabled) + .${box}`]: {
      backgroundColor: 'var(--maeven-color-primary-d10)',
      backgroundImage: 'none'
    },
    [`&:indeterminate + .${box}`]: {
      color: 'var(--maeven-color-focus-border)',
      boxShadow:
        'inset 0 0 0 1px var(--maeven-color-focus-border), inset 0 -1px 0 var(--maeven-color-focus-border)'
    },
    [`&:checked + .${box}, &:indeterminate + .${box}`]: {}
  }
});

const sm = style({
  height: 'calc(var(--maeven-base) * 1.5)',
  fontSize: 'calc(var(--maeven-base) * 0.85)',
  $nest: {
    [`.${box}`]: {
      marginRight: 'calc(var(--maeven-base) * 0.375)'
    }
  }
});

const lg = style({
  height: 'calc(var(--maeven-base) * 3)',
  fontSize: 'calc(var(--maeven-base) * 1.15)',
  $nest: {
    [`.${box}`]: {
      marginRight: 'calc(var(--maeven-base) * 0.625)'
    }
  }
});

const hasError = style({
  $nest: {
    [`.${checkbox}`]: {
      $nest: {
        [`&:focus + .${box}`]: {
          boxShadow:
            '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-danger-f50)'
        },
        [`&:not(:checked) + .${box}`]: {
          color: 'var(--maeven-color-danger)',
          boxShadow:
            'inset 0 0 0 1px var(--maeven-color-danger), inset 0 -1px 0 var(--maeven-color-danger)'
        },
        [`&:checked:not(:indeterminate) + .${box}`]: {
          color: 'var(--maeven-color-danger-text)',
          backgroundColor: `var(--maeven-color-danger)`,
          backgroundImage: linearGradient(
            '180deg',
            'var(--maeven-color-danger-l05)',
            'var(--maeven-color-danger-d05)'
          )
        },
        [`&:checked:focus:not(:indeterminate) + .${box}`]: {
          backgroundColor: 'var(--maeven-color-danger-d05)',
          backgroundImage: linearGradient(
            '180deg',
            'var(--maeven-color-danger)',
            'var(--maeven-color-danger-d10)'
          )
        },
        [`&:checked:active:not(:indeterminate):not(:disabled) + .${box}`]: {
          backgroundColor: 'var(--maeven-color-danger-d10)',
          backgroundImage: 'none'
        }
      }
    },
    [`.${text}`]: {
      color: 'var(--maeven-color-danger)'
    }
  }
});

export const classes = {
  container: container,
  checkbox: clsx(pm0, checkbox),
  box,
  text,
  icon,
  sm,
  lg,
  hasError
};

export const themeOverride = themeOverrideFactory('Checkbox');
