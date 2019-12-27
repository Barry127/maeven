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

const label = style({
  position: 'relative'
});

const input = style({
  height: 'calc(var(--maeven-base) * 2)',
  padding: '0 calc(var(--maeven-base) / 2)',
  $nest: {
    '&:focus ~ span': {
      opacity: 0.8
    }
  }
});

const hasLeftIcon = style({
  $nest: {
    [`.${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.75)'
    }
  }
});

const hasRightIcon = style({
  $nest: {
    [`.${input}`]: {
      paddingRight: 'calc(var(--maeven-base) * 1.75)'
    }
  }
});

const icon = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  zIndex: 1,
  opacity: 0.6
});

const leftIcon = style({
  left: 'calc(var(--maeven-base) / 2)'
});

const rightIcon = style({
  right: 'calc(var(--maeven-base) / 2)'
});

const rightElement = style({
  right: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1
});

const sm = style({
  $nest: {
    [`.${input}`]: {
      height: 'calc(var(--maeven-base) * 1.5)',
      padding: '0 calc(var(--maeven-base) * 0.375)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 0.85)'
    },
    [`&.${hasLeftIcon} .${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 1.5)'
    },
    [`&.${hasRightIcon} .${input}`]: {
      paddingRight: 'calc(var(--maeven-base) * 1.5)'
    }
  }
});

const lg = style({
  $nest: {
    [`.${input}`]: {
      height: 'calc(var(--maeven-base) * 3)',
      padding: '0 var(--maeven-base)'
    },
    [`.${label}`]: {
      fontSize: 'calc(var(--maeven-base) * 1.15)'
    },
    [`&.${hasLeftIcon} .${leftIcon}`]: {
      left: 'calc(var(--maeven-base) * 0.75)'
    },
    [`&.${hasLeftIcon} .${input}`]: {
      paddingLeft: 'calc(var(--maeven-base) * 2.5)'
    },
    [`&.${hasRightIcon} .${leftIcon}`]: {
      right: 'calc(var(--maeven-base) * 0.75)'
    },
    [`&.${hasRightIcon} .${input}`]: {
      paddingRight: 'calc(var(--maeven-base) * 2.5)'
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
  input: clsx(box, baseInput, input),
  hasLeftIcon,
  hasRightIcon,
  leftIcon: clsx(icon, leftIcon),
  rightIcon: clsx(icon, rightIcon),
  rightElement: clsx(rightElement),
  sm,
  lg,
  hasError: clsx(baseInputError, hasError)
};

export const themeOverride = themeOverrideFactory('TextInput');
