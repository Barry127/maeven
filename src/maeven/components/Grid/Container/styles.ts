import { style } from 'typestyle';

import { themeOverrideFactory } from '../../../common/themeOverrideFactory';
import { responsiveStyle } from '../../../common/responsiveStyle';
import { Theme } from '../../../types';

const container = style({
  background: 'transparent',
  width: '100%',
  padding: 'calc(1.25 * var(--maeven-base))',
  marginRight: 'auto',
  marginLeft: 'auto'
});

const responsive = (theme: Theme) =>
  responsiveStyle(theme, {
    sm: { maxWidth: 540 },
    md: { maxWidth: 720 },
    lg: { maxWidth: 960 },
    xl: { maxWidth: 1140 }
  });

export const classes = {
  container,
  responsive
};

export const themeOverride = themeOverrideFactory('Container');
