import { extend } from 'typestyle';
import { color } from 'csx';

import { Theme } from '../../themes/types';
import { a } from '../Html/styles';
import { exportStyles, getColorFromTheme } from '../../common/styleHelpers';

import { LinkProps } from './Link';

export const linkStyles = (theme: Theme, props: LinkProps) => {
  const styleColor = getColorFromTheme(props.color || '', theme);

  return exportStyles({
    link: extend(
      a(theme).css.element,
      styleColor
        ? {
            color: styleColor,
            $nest: {
              '&:hover': {
                color: color(styleColor)
                  .darken(0.1)
                  .toString()
              },
              '&:focus': {
                color: color(styleColor)
                  .darken(0.1)
                  .toString()
              },
              '&:active': {
                color: color(styleColor)
                  .darken(0.15)
                  .toString()
              }
            }
          }
        : null
    )
  });
};
