import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import { classes as alertClasses, alert, title } from '../Alert/styles';

const alertGroup = style({
  display: 'flex',
  transition:
    'background-color var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function), transform var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)',
  $nest: {
    [`.${alert}`]: {
      flex: 1,
      backgroundColor: 'transparent',
      padding: 0,
      margin: 0,
      color: 'inherit',
      border: 0,
      alignItems: 'center'
    },
    [`.${alertClasses.content}`]: {
      color: 'inherit'
    },
    [`.${title}`]: {
      color: 'inherit',
      lineHeight: 'inherit',
      display: 'inline-block',
      marginBottom: 0,
      fontSize: '1em',
      fontWeight: 'bold',
      $nest: {
        '&:last-child': {
          marginBottom: 0
        },
        '&:last-child::after': {
          content: '"\\00a0"'
        }
      }
    },
    [`.${alertClasses.iconContainer}`]: {
      color: 'inherit',
      marginLeft: 'calc(var(--maeven-base) / 2)'
    },
    [`.${alertClasses.closeContainer}`]: {
      position: 'unset'
    },
    [`.${alertClasses.close}`]: {
      color: 'inherit !important'
    }
  }
});

const nav = style({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  transition:
    'background-color var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function), transform var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)',
  $nest: {
    ' & > *': {
      color: 'inherit !important'
    },
    '& > div': {
      fontSize: '.85em',
      userSelect: 'none'
    },
    button: {
      boxShadow: 'none !important',
      opacity: 0.6,
      $nest: {
        '&:hover': {
          opacity: 0.8
        },
        '&:active': {
          opacity: 1
        }
      }
    }
  }
});

const danger = style({
  backgroundColor: 'var(--maeven-color-danger)',
  color: 'var(--maeven-color-danger-text)',
  $nest: {
    [`.${nav}`]: {
      backgroundColor: 'var(--maeven-color-danger-d10)'
    }
  }
});

const info = style({
  backgroundColor: 'var(--maeven-color-info)',
  color: 'var(--maeven-color-info-text)',
  $nest: {
    [`.${nav}`]: {
      backgroundColor: 'var(--maeven-color-info-d10)'
    }
  }
});

const success = style({
  backgroundColor: 'var(--maeven-color-success)',
  color: 'var(--maeven-color-success-text)',
  $nest: {
    [`.${nav}`]: {
      backgroundColor: 'var(--maeven-color-success-d10)'
    }
  }
});

const warning = style({
  backgroundColor: 'var(--maeven-color-warning)',
  color: 'var(--maeven-color-warning-text)',
  $nest: {
    [`.${nav}`]: {
      backgroundColor: 'var(--maeven-color-warning-d10)'
    }
  }
});

export const classes = {
  alertGroup: clsx(box, pm0, alertGroup),
  nav,
  danger,
  info,
  success,
  warning
};

export const themeOverride = themeOverrideFactory('AlertGroup');
