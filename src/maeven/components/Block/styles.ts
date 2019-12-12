import clsx from 'clsx';
import { style } from 'typestyle';

import { box, defaultTypography, blockColors, pm0 } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';

const padding = style({
  padding: 'var(--maeven-base)'
});

export const classes = {
  block: clsx(box, pm0, defaultTypography, blockColors),
  padding
};

export const themeOverride = themeOverrideFactory('Block');
