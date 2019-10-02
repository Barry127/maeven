import { extend } from 'typestyle';

import { Theme } from '../../themes/types';
import {
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  ol,
  p,
  ul,
  createTextStyles
} from '../Html/styles';
import { exportStyles, getColorFromTheme } from '../../common/styleHelpers';
import { truncate } from '../../common/mixins';

import { TextProps } from './Text';

export const textStyles = (theme: Theme, props: TextProps) => {
  const styleColor = getColorFromTheme(props.color || '', theme);

  return exportStyles({
    text: extend(
      createTextStyles(theme),
      styleColor ? { color: styleColor } : null,
      props.truncate && !props.inline ? truncate : null,
      props.styleHtml
        ? {
            $nest: {
              a: a(theme).css.element,
              h1: h1(theme).css.element,
              h2: h2(theme).css.element,
              h3: h3(theme).css.element,
              h4: h4(theme).css.element,
              h5: h5(theme).css.element,
              h6: h6(theme).css.element,
              li: li(theme).css.element,
              ol: ol(theme).css.element,
              p: p(theme).css.element,
              ul: ul(theme).css.element
            }
          }
        : null,
      theme.overrides.Text
    )
  });
};
