import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const checkbox = style({
  color: 'red'
});

export const classes = {
  checkbox: clsx(box, pm0, checkbox)
};

export const themeOverride = themeOverrideFactory('Checkbox');
