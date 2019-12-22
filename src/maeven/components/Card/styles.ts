import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0, elevation } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';
import { createElevation } from '../../common/createElevation';

import { container as cardImageContainer } from './CardImage/styles';

const card = style({
  borderRadius: 'var(--maeven-size-border-radius-large)',
  border: '1px solid var(--maeven-color-border)'
});

const interactive = style({
  cursor: 'pointer',
  transition:
    'box-shadow var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)',
  $nest: {
    '&:hover': {
      boxShadow: createElevation(3)
    },
    '&:focus': {
      outline: 'none',
      boxShadow: createElevation(3)
    }
  }
});

const overlay = style({
  position: 'relative'
});

const overlayElement = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition:
    'opacity var(--maeven-animation-default-timing) var(--maeven-animation-default-timing-function)',

  borderRadius: 'var(--maeven-size-border-radius-large)',
  background: 'rgba(0,0,0,.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  $nest: {
    '&:hover': {
      opacity: 1
    },
    [`& + .${cardImageContainer}`]: {
      marginTop: 'calc(var(--maeven-base) * -1)',
      borderTopLeftRadius: 'var(--maeven-size-border-radius-large)',
      borderTopRightRadius: 'var(--maeven-size-border-radius-large)'
    }
  }
});

export const classes = {
  card,
  elevation,
  interactive,
  overlay,
  overlayElement: clsx(box, pm0, overlayElement)
};

export const themeOverride = themeOverrideFactory('Card');
