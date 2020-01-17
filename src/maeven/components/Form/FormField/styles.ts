import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

import { Theme } from '../../../types';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';
import { responsiveStyle } from '../../../common/responsiveStyle';

const container = style({
  flexDirection: 'row'
});

const labelCol = style({
  flexGrow: '0 !important' as NestedCSSProperties['flexGrow'],
  width: '20% !important',
  maxWidth: 'calc(var(--maeven-base) * 16) !important',
  textAlign: 'right',
  display: 'flex',
  alignItems: 'center',
  height: 'calc(var(--maeven-base) * 2)',
  $nest: {
    label: {
      flexGrow: 1
    },
    div: {
      fontSize: '1em'
    }
  }
});

const fieldCol = style({
  flexGrow: 1
});

const sm = style({
  $nest: {
    [`.${labelCol}`]: {
      height: 'calc(var(--maeven-base) * 1.5)',
      fontSize: 'calc(var(--maeven-base) * 0.85)'
    }
  }
});

const lg = style({
  $nest: {
    [`.${labelCol}`]: {
      height: 'calc(var(--maeven-base) * 3)',
      fontSize: 'calc(var(--maeven-base) * 1.15)'
    }
  }
});

const responsiveContainer = (theme: Theme) =>
  responsiveStyle(theme, {
    xs: {
      $nest: {
        [`.${labelCol}`]: {
          flexGrow: '1 !important' as NestedCSSProperties['flexGrow'],
          width: '100% !important',
          height: 'auto',
          textAlign: 'left',
          marginBottom: 0,
          $nest: {
            label: {
              fontSize: '1.1em'
            }
          }
        }
      }
    }
  });

export const classes = {
  container,
  labelCol,
  fieldCol,
  sm,
  lg,
  responsiveContainer
};

export const themeOverride = themeOverrideFactory('FormField');
