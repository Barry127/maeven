import { extend } from 'typestyle';

import { Theme } from '../../themes/types';
import { h1, h2, h3, h4, h5, h6 } from '../Html/styles';
import { exportStyles, getColorFromTheme } from '../../common/styleHelpers';
import { truncate } from '../../common/mixins';

import { HeadingProps } from './Heading';

const htmlStyles = { h1, h2, h3, h4, h5, h6 };

export const headingStyles = (theme: Theme, props: HeadingProps) => {
  const styleAsLevel = props.size ? props.size : props.level;
  const styleColor = getColorFromTheme(props.color || '', theme);

  return exportStyles({
    heading: extend(
      htmlStyles[styleAsLevel](theme).css.element,
      styleColor ? { color: styleColor } : null,
      props.truncate ? truncate : null,
      theme.overrides.Heading
    )
  });
};
