import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import { classes as htmlClasses } from '../../Html/styles';

const alert = style({
  position: 'relative',
  display: 'flex',
  padding: 'calc(var(--maeven-base) / 2)',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 'var(--maeven-size-border-radius-medium)',
  marginBottom: 'var(--maeven-base)',
  $nest: {
    '&:last-child': {
      marginBottom: 0
    }
  }
});

const icon = style();

const iconContainer = style({
  marginRight: 'calc(var(--maeven-base) / 2)',
  marginBottom: '0 !important'
});

const title = style({
  display: 'block',
  marginBottom: 'calc(var(--maeven-base) / 2)',
  $nest: {
    '&:last-child': {
      marginBottom: 'calc(var(--maeven-base) / 2)'
    }
  }
});

const content = style({
  flexGrow: 1
});

const closeContainer = style({
  position: 'absolute',
  top: 0,
  right: 0
});

const close = style({
  boxShadow: 'none !important',
  color: 'var(--maeven-color-text) !important',
  opacity: 0.6,
  $nest: {
    '&:hover': {
      opacity: 0.8
    },
    '&:active': {
      opacity: 1
    }
  }
});

const danger = style({
  borderColor: 'var(--maeven-color-danger)',
  background: 'var(--maeven-color-danger-l35)',
  $nest: {
    [`.${iconContainer}`]: {
      color: 'var(--maeven-color-danger-d05)'
    }
  }
});

const info = style({
  borderColor: 'var(--maeven-color-info)',
  background: 'var(--maeven-color-info-l50)',
  $nest: {
    [`.${iconContainer}`]: {
      color: 'var(--maeven-color-info-d05)'
    }
  }
});

const success = style({
  borderColor: 'var(--maeven-color-success)',
  background: 'var(--maeven-color-success-l50)',
  $nest: {
    [`.${iconContainer}`]: {
      color: 'var(--maeven-color-success-d05)'
    }
  }
});

const warning = style({
  borderColor: 'var(--maeven-color-warning)',
  background: 'var(--maeven-color-warning-l40)',
  $nest: {
    [`.${iconContainer}`]: {
      color: 'var(--maeven-color-warning-d05)'
    }
  }
});

export const classes = {
  alert: clsx(box, pm0, alert),
  iconContainer,
  icon,
  title: clsx(htmlClasses.h4, title),
  content,
  closeContainer,
  close,
  danger,
  info,
  success,
  warning
};

export const themeOverride = themeOverrideFactory('Alert');
