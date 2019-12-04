import clsx from 'clsx';

import { box, defaultTypography, blockColors } from '../../common/styles';
import { themeOverrideFactory } from '../../common/themeOverrideFactory';

export const classes = {
  block: clsx(box, defaultTypography, blockColors)
};

export const themeOverride = themeOverrideFactory('Block');
