import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0, elevation, scrollbars } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';
import { linearGradient } from 'csx';

const container = style({
  zIndex: 1000,
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const modal = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90vh',
  background: 'var(--maeven-color-background)',
  color: 'var(--maeven-color-text)',
  borderRadius: 'var(--maeven-size-border-radius-large)',
  transition:
    'border-radius var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)'
});

const title = style({
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  minHeight: 'calc(var(--maeven-base) * 2)',
  background: 'var(--maeven-color-background)',
  color: 'var(--maeven-color-text)',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 'calc(var(--maeven-size-border-radius-large) / 2)',
  $nest: {
    h3: {
      flexGrow: 1,
      marginBottom: 0,
      color: 'inherit'
    },
    '& > button:last-child': {
      borderTopRightRadius: 'var(--maeven-size-border-radius-large)'
    }
  }
});

const icon = style({
  marginRight: 'calc(var(--maeven-size-border-radius-large) / 2)'
});

const button = style({
  boxShadow: 'none !important',
  color: 'inherit !important',
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

const content = style({
  padding: 0,
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
  flexGrow: 1,
  overflow: 'auto'
});

const isMaximized = style({
  borderRadius: 0,
  maxHeight: 'none'
});

const hasTitle = style({
  $nest: {
    [`.${content}`]: {
      padding: 'var(--maeven-base)'
    }
  }
});

const primary = style({
  $nest: {
    [`.${title}`]: {
      backgroundColor: 'var(--maeven-color-primary)',
      backgroundImage: linearGradient(
        '180deg',
        `var(--maeven-color-primary-l05)`,
        `var(--maeven-color-primary-d05)`
      ),
      color: 'var(--maeven-color-primary-text)'
    }
  }
});

const success = style({
  $nest: {
    [`.${title}`]: {
      backgroundColor: 'var(--maeven-color-success)',
      backgroundImage: linearGradient(
        '180deg',
        `var(--maeven-color-success-l05)`,
        `var(--maeven-color-success-d05)`
      ),
      color: 'var(--maeven-color-success-text)'
    }
  }
});

const warning = style({
  $nest: {
    [`.${title}`]: {
      backgroundColor: 'var(--maeven-color-warning)',
      backgroundImage: linearGradient(
        '180deg',
        `var(--maeven-color-warning-l05)`,
        `var(--maeven-color-warning-d05)`
      ),
      color: 'var(--maeven-color-warning-text)'
    }
  }
});

const danger = style({
  $nest: {
    [`.${title}`]: {
      backgroundColor: 'var(--maeven-color-danger)',
      backgroundImage: linearGradient(
        '180deg',
        `var(--maeven-color-danger-l05)`,
        `var(--maeven-color-danger-d05)`
      ),
      color: 'var(--maeven-color-danger-text)'
    }
  }
});

const info = style({
  $nest: {
    [`.${title}`]: {
      backgroundColor: 'var(--maeven-color-info)',
      backgroundImage: linearGradient(
        '180deg',
        `var(--maeven-color-info-l05)`,
        `var(--maeven-color-info-d05)`
      ),
      color: 'var(--maeven-color-info-text)'
    }
  }
});

export const classes = {
  container,
  modal: clsx(box, pm0, modal, elevation[3]),
  title,
  icon,
  button,
  content: clsx(content, scrollbars),
  hasTitle,
  isMaximized,
  type: {
    primary,
    success,
    info,
    warning,
    danger
  }
};

export const themeOverride = themeOverrideFactory('Modal');
