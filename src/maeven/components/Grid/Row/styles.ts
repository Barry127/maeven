import clsx from 'clsx';
import { style } from 'typestyle';

import { box } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

const row = style({
  display: 'flex'
});

const wrap = style({
  flexWrap: 'wrap'
});

const noWrap = style({
  flexWrap: 'nowrap'
});

export const classes = {
  row: clsx(box, row),
  wrap,
  noWrap,
  align: {
    normal: style({ alignItems: 'normal' }),
    top: style({ alignItems: 'flex-start' }),
    center: style({ alignItems: 'center' }),
    bottom: style({ alignItems: 'flex-end' }),
    baseline: style({ alignItems: 'baseline ' }),
    stretch: style({ alignItems: 'stretch' })
  }
};

export const themeOverride = themeOverrideFactory('Row');
