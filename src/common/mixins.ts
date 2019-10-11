import { CSSProperties } from 'typestyle/lib/types';

import { Theme } from '../themes/types';

export const box: CSSProperties = {
  boxSizing: 'border-box'
};

export const elevation = (height: number = 0) => {
  if (height === 0) return 'none';

  let px = 1;
  let boxShadow = '';
  for (let i = 0; i < Math.min(height, 4) + 2; i++) {
    boxShadow += `,0 ${px}px ${px}px rgba(0,0,0,0.15)`;
    px *= 2;
  }

  return boxShadow.substr(1);
};

export const pm0: CSSProperties = {
  padding: 0,
  margin: 0
};

export const textSelection = (theme: Theme): CSSProperties => ({
  color: theme.colors.types.textSelection,
  backgroundColor: theme.colors.types.textSelectionBackground
});

export const truncate: CSSProperties = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
};
