import clsx from 'clsx';
import { style } from 'typestyle';

import { box, scrollbars } from '../../../common/styles';
import { themeOverrideFactory } from '../../../common/themeOverrideFactory';

import {
  baseLabel,
  baseContainer,
  baseInput,
  baseInputError
} from '../baseStyles';

const textArea = style({
  resize: 'none',
  padding: 'calc(var(--maeven-base) / 2)'
});

const textAreaNoAutoSize = style({
  overflow: 'hidden',
  $nest: {
    '&:focus, &:hover': {
      overflowY: 'auto'
    }
  }
});

const sm = style({
  $nest: {
    [`.${textArea}`]: {
      padding: 'calc(var(--maeven-base) * 0.375)'
    },
    '& > label': {
      fontSize: 'calc(var(--maeven-base) * 0.85)'
    }
  }
});

const lg = style({
  $nest: {
    [`.${textArea}`]: {
      padding: 'var(--maeven-base)'
    },
    '& > label': {
      fontSize: 'calc(var(--maeven-base) * 1.15)'
    }
  }
});

const hasError = style({
  $nest: {
    '& > div:last-child': {
      color: 'var(--maeven-color-danger)'
    }
  }
});

export const classes = {
  containter: baseContainer,
  label: baseLabel,
  textArea: clsx(baseInput, textArea),
  textAreaNoAutoSize: clsx(box, scrollbars, textAreaNoAutoSize),
  sm,
  lg,
  hasError: clsx(baseInputError, hasError)
};

export const themeOverride = themeOverrideFactory('TextArea');
