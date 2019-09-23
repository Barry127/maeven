import { CSSProperties } from 'typestyle/lib/types';

import { Theme } from '../themes/types';

export const box: CSSProperties = {
  boxSizing: 'border-box'
};

export const pm0: CSSProperties = {
  padding: 0,
  margin: 0
};

export const textSelection = (theme: Theme): CSSProperties => ({
  color: theme.colors.types.textSelection,
  backgroundColor: theme.colors.types.textSelectionBackground
});
