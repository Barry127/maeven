import clsx from 'clsx';
import { style } from 'typestyle';

import { textColor, box, defaultTypography } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';

import { aStyles, aColors } from '../Html/styles';

const focusOutline = style({
  $nest: {
    '&:focus': {
      textDecoration: 'none',
      position: 'relative',
      zIndex: 1,
      $nest: {
        '&::before': {
          position: 'absolute',
          borderRadius: 'var(--maeven-size-border-radius-medium)',
          content: '""',
          top: -2,
          left: -2,
          bottom: -2,
          right: -2,
          boxShadow:
            '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)'
        }
      }
    }
  }
});

export const classes = {
  link: clsx(box, defaultTypography, aStyles),
  default: aColors,
  color: textColor,
  colorStates: style({
    $nest: {
      '&:hover': {
        filter: 'brightness(85%)'
      },
      '&active': {
        filter: 'brightness(70%)'
      }
    }
  }),
  focusOutline
};

export const themeOverride = themeOverrideFactory('Link');
