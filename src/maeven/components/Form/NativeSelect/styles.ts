import clsx from 'clsx';
import { style } from 'typestyle';

import { box } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import {
  baseLabel,
  baseContainer,
  baseInput,
  baseInputError
} from '../baseStyles';

const toggle = style({
  position: 'absolute',
  top: '50%',
  right: 'calc(var(--maeven-base) / 2)',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  zIndex: 1,
  opacity: 0.6
});

const label = style({
  position: 'relative'
});

const select = style({
  height: 'calc(var(--maeven-base) * 2)',
  padding: '0 calc(var(--maeven-base) / 2)',
  paddingRight: 'calc(var(--maeven-base) * 1.75)',
  '-moz-appearance': 'none',
  '-webkit-appearance': 'none',
  $nest: {
    '&::-ms-expand': {
      display: 'none'
    },
    '&:focus ~ span': {
      opacity: 0.8
    }
  }
});

const hasIcon = style({
  $nest: {
    [`.${select}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.75)'
    }
  }
});

const icon = style({
  position: 'absolute',
  top: '50%',
  left: 'calc(var(--maeven-base) / 2)',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  zIndex: 1,
  opacity: 0.6
});

const sm = style({
  $nest: {
    [`.${select}`]: {
      height: 'calc(var(--maeven-base) * 1.5)',
      padding: '0 calc(var(--maeven-base) * 0.375)',
      paddingRight: 'calc(var(--maeven-base) * 1.5)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 0.85)'
    },
    [`&.${hasIcon} .${select}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.5)'
    }
  }
});

const lg = style({
  $nest: {
    [`.${select}`]: {
      height: 'calc(var(--maeven-base) * 3)',
      padding: '0 var(--maeven-base)',
      paddingRight: 'calc(var(--maeven-base) * 2.5)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 1.15)'
    },
    [`&.${hasIcon} .${icon}`]: {
      left: 'calc(var(--maeven-base) * 0.75)'
    },
    [`&.${hasIcon} .${select}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 2.5)'
    },
    [`.${toggle}`]: {
      right: 'calc(var(--maeven-base) * 0.75)'
    }
  }
});

const hasError = style({
  $nest: {
    [`.${label} + div`]: {
      color: 'var(--maeven-color-danger)'
    }
  }
});

export const classes = {
  container: baseContainer,
  label: clsx(baseLabel, label),
  select: clsx(box, baseInput, select),
  hasIcon,
  icon,
  toggle,
  sm,
  lg,
  hasError: clsx(baseInputError, hasError)
};

export const themeOverride = themeOverrideFactory('NativeSelect');
