import clsx from 'clsx';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

import { box, pm0 } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import { classes as formFieldClasses } from '../FormField/styles';

const form = style({
  $nest: {
    [`.${formFieldClasses.fieldCol} > button + button`]: {
      marginLeft: 'calc(var(--maeven-base) / 2)'
    }
  }
});

const vertical = style({
  $nest: {
    [`.${formFieldClasses.container}`]: {
      flexDirection: 'column'
    },
    [`.${formFieldClasses.labelCol}`]: {
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
});

export const classes = {
  form: clsx(box, pm0, form),
  vertical
};

export const themeOverride = themeOverrideFactory('Form');
