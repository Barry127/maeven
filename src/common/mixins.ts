import { CSSProperties, NestedCSSProperties } from 'typestyle/lib/types';
import { color } from 'csx';

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

export const scrollbars = (
  theme: Theme,
  background?: string
): NestedCSSProperties => ({
  $nest: {
    '&::-webkit-scrollbar': {
      background: 'transparent',
      position: 'absolute',
      width: 12
    },
    '&::-webkit-scrollbar-button': {
      display: 'none'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: color(theme.colors.types.text)
        .fade(0.15)
        .toString(),
      border: `2px solid ${background || theme.colors.types.background}`,
      borderRadius: 6,
      $nest: {
        '&:hover': {
          background: color(theme.colors.types.text)
            .fade(0.5)
            .toString()
        }
      }
    }
  }
});

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
