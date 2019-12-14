import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';
import { ThemeColor } from '../../types';

const container = style({
  display: 'inline-block',
  fontSize: '1em',
  lineHeight: 0,
  verticalAlign: '-.125em'
});

const icon = style({
  height: '1em',
  $nest: {
    // Ant Design Two Tone Styling
    '.secondaryFill': {
      opacity: 0.2
    },
    // Clarity Variations Styling
    '.clr-i-alert': {
      fill: 'var(--maeven-color-warning)'
    },
    '.clr-i-badge': {
      fill: 'var(--maeven-color-red)'
    }
  }
});

const fixedWidth = style({
  width: '1em'
});

export const classes = {
  container: clsx(box, pm0, container),
  containerInverted: (color?: ThemeColor) =>
    style({
      backgroundColor: color ? `var(--maeven-color-${color})` : 'currentColor'
    }),
  size: (size: string | number) =>
    style({
      fontSize: size,
      verticalAlign: 'middle'
    }),
  icon: clsx(box, icon),
  fixedWidth
};

export const themeOverride = themeOverrideFactory('Icon');
