import clsx from 'clsx';
import { style } from 'typestyle';
import { linearGradient } from 'csx';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: 'calc(var(--maeven-base) * 2)'
});

const text = style({
  flexGrow: 1,
  fontSize: '1em'
});

const circle = style({
  lineHeight: 1,
  height: '1em',
  width: '1em',
  position: 'relative',
  background: `var(--maeven-color-background)`,
  border: '1px transparent var(--maeven-color-border)',
  boxShadow:
    'inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 -1px 0 var(--maeven-color-black-f10)',
  borderRadius: '50%',
  marginRight: 'calc(var(--maeven-base) / 2)',
  $nest: {
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      height: '1em',
      width: '1em',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0.5)',
      opacity: 0,
      backgroundColor: `var(--maeven-color-primary)`,
      backgroundImage: linearGradient(
        '180deg',
        'var(--maeven-color-primary-l05)',
        'var(--maeven-color-primary-d05)'
      ),
      transition:
        'opacity var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function), transform var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)'
    }
  }
});

const radioButton = style({
  opacity: 0,
  height: 0,
  width: 0,
  position: 'absolute',
  $nest: {
    [`&:focus + .${circle}`]: {
      zIndex: 1,
      border: '1px solid var(--maeven-color-focus-border)',
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)',
      $nest: {
        '&::after': {
          backgroundColor: 'var(--maeven-color-primary-d05)',
          backgroundImage: linearGradient(
            '180deg',
            'var(--maeven-color-primary)',
            'var(--maeven-color-primary-d10)'
          )
        }
      }
    },
    [`&:active:not(:disabled) + .${circle}`]: {
      boxShadow:
        'inset 0 0 0 1px var(--maeven-color-black-f20), inset 0 1px 2px var(--maeven-color-black-f20)',
      $nest: {
        '&::after': {
          backgroundColor: 'var(--maeven-color-primary-d10)',
          backgroundImage: 'none'
        }
      }
    },
    [`&:disabled + .${circle}`]: {
      background: 'var(--maeven-color-text-f10)',
      $nest: {
        '&::after': {
          backgroundColor: `var(--maeven-color-text-f50)`,
          backgroundImage: 'none'
        }
      }
    },
    [`&:disabled ~ .${text}`]: {
      backgroundColor: 'var(--maeven-color-secondary-f50)',
      opacity: 0.65
    },
    [`&:checked + .${circle}::after`]: {
      transform: 'translate(-50%, -50%) scale(0.65)',
      opacity: 1
    }
  }
});

const sm = style({
  height: 'calc(var(--maeven-base) * 1.5)',
  fontSize: 'calc(var(--maeven-base) * 0.85)',
  $nest: {
    [`.${radioButton}:checked + .${circle}::after`]: {
      transform: 'translate(-50%, -50%) scale(0.6)'
    },
    [`.${circle}`]: {
      marginRight: 'calc(var(--maeven-base) * 0.375)'
    }
  }
});

const lg = style({
  height: 'calc(var(--maeven-base) * 3)',
  fontSize: 'calc(var(--maeven-base) * 1.15)',
  $nest: {
    [`.${circle}`]: {
      marginRight: 'calc(var(--maeven-base) * 0.625)'
    }
  }
});

const hasError = style({
  $nest: {
    [`.${radioButton}`]: {
      $nest: {
        [`&:focus + .${circle}`]: {
          border: '1px solid var(--maeven-color-danger-l05)',
          boxShadow:
            '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-danger-f50)'
        },
        [`&:not(:checked) + .${circle}`]: {
          boxShadow:
            'inset 0 0 0 1px var(--maeven-color-danger), inset 0 -1px 0 var(--maeven-color-danger)'
        },
        [`&:checked + .${circle}::after`]: {
          backgroundColor: `var(--maeven-color-danger)`,
          backgroundImage: linearGradient(
            '180deg',
            'var(--maeven-color-danger-l05)',
            'var(--maeven-color-danger-d05)'
          )
        },
        [`&:checked:focus + .${circle}::after`]: {
          backgroundColor: 'var(--maeven-color-danger-d05)',
          backgroundImage: linearGradient(
            '180deg',
            'var(--maeven-color-danger)',
            'var(--maeven-color-danger-d10)'
          )
        },
        [`&:checked:active:not(:disabled) + .${circle}::after`]: {
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
  container,
  radioButton: clsx(pm0, radioButton),
  circle: clsx(box, circle),
  text,
  sm,
  lg,
  hasError
};

export const themeOverride = themeOverrideFactory('RadioButton');
