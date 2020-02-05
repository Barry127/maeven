import clsx from 'clsx';
import { style, keyframes } from 'typestyle';

import { box, pm0, textColor } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';

const circleAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
    strokeDashoffset: 26.4
  },
  '50%': {
    transform: 'rotate(720deg)',
    strokeDashoffset: 125.4
  },
  '100%': {
    transform: 'rotate(1080deg)',
    strokeDashoffset: 26.4
  }
});

const spinner = style({});

const text = style({
  display: 'inline-block',
  marginLeft: '.25em',
  verticalAlign: 'middle'
});

const sm = style({
  fontSize: 'calc(var(--maeven-base) * 0.75)'
});

const md = style({
  fontSize: 'calc(var(--maeven-base) * 1.5)'
});

const lg = style({
  fontSize: 'calc(var(--maeven-base) * 2)'
});

const circleContainer = style({
  height: '1em',
  width: '1em',
  verticalAlign: 'middle'
});

const circle = style({
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeWidth: 4,
  strokeDasharray: 125.4,
  transformOrigin: 'center center',
  animationName: circleAnimation,
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
});

const container = style({
  boxSizing: 'border-box',
  position: 'relative',

  $nest: {
    [`.maeven-spinner`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition:
        'opacity var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: -1,
      opacity: 0
    },
    [`.${text}`]: {
      marginLeft: 0,
      marginTop: 'var(--maeven-base)'
    }
  }
});

const content = style({
  transition:
    'opacity var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function), filter var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)'
});

const isSpinning = style({
  $nest: {
    [`.${content}`]: {
      filter: 'blur(1px)',
      opacity: 0.3
    },
    [`.maeven-spinner`]: {
      opacity: 1,
      zIndex: 1
    }
  }
});

export const classes = {
  container,
  isSpinning,
  content,
  spinner: clsx(box, pm0, 'maeven-spinner', spinner),
  text,
  color: textColor,
  sm,
  md,
  lg,
  circleContainer,
  circle
};

export const themeOverride = themeOverrideFactory('Spinner');
