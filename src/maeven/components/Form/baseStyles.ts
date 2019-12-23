import clsx from 'clsx';
import { style } from 'typestyle';

import { box, pm0, defaultTypography } from '../../common/styles';

const _baseContainer = style({
  width: '100%'
});

export const baseContainer = clsx(box, pm0, _baseContainer);

const _baseLabel = style({
  display: 'flex',
  lineHeight: 1,
  $nest: {
    '&:not(:last-child)': {
      marginBottom: 'calc(var(--maeven-base) / 2)'
    }
  }
});

export const baseLabel = clsx(box, pm0, defaultTypography, _baseLabel);

const _baseInput = style({
  height: 'calc(var(--maeven-base) * 2)',
  padding: '0 calc(var(--maeven-base) / 2)',
  flexGrow: 1,
  color: `var(--maeven-color-text)`,
  background: `var(--maeven-color-background)`,
  fontSize: '0.95em',
  lineHeight: 1,
  border: '1px solid var(--maeven-color-border)',
  borderRadius: 'var(--maeven-size-border-radius-medium)',
  $nest: {
    '&:focus': {
      outline: 'none',
      zIndex: 1,
      borderColor: 'var(--maeven-color-focus-border)',
      boxShadow:
        '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-focus)'
    },
    '&[readonly]:focus': {
      borderColor: 'var(--maeven-color-border)',
      boxShadow: 'none'
    },
    '&::placeholder': {
      color: 'var(--maeven-color-text)',
      opacity: 0.4
    },
    '&:disabled': {
      background: 'var(--maeven-color-text-f10)',
      color: 'var(--maeven-color-text-f50)',
      borderColor: 'transparent'
    }
  }
});

export const baseInput = clsx(box, pm0, defaultTypography, _baseInput);

export const baseInputError = style({
  $nest: {
    [`.${_baseLabel}`]: {
      color: 'var(--maeven-color-danger)'
    },
    [`.${_baseInput}`]: {
      color: 'var(--maeven-color-danger)',
      borderColor: 'var(--maeven-color-danger-l05)',
      $nest: {
        '&:focus': {
          borderColor: 'var(--maeven-color-danger-d10)',
          boxShadow:
            '0 0 calc(var(--maeven-base) / 4) calc(var(--maeven-base) / 4) var(--maeven-color-danger-f50)'
        }
      }
    }
  }
});
