import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Theme } from '../../themes/types';
import { useTheme } from '../../hooks/useTheme';

import { textStyles } from './styles';

/**
 * The Text component is a low level component to style text.
 */
export const Text: FC<
  TextProps & (HTMLAttributes<HTMLDivElement> | HTMLAttributes<HTMLSpanElement>)
> = props => {
  const theme = useTheme();
  const { classes } = textStyles(theme, props);
  const {
    children,
    className,
    color,
    inline,
    styleHtml,
    title,
    truncate,
    ...restProps
  } = props;

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={clsx(classes.text, className)}
      title={truncate && !title ? String(children) : title}
      {...restProps}
    >
      {children}
    </Tag>
  );
};

Text.defaultProps = {
  inline: false,
  styleHtml: false,
  truncate: false
};

export interface TextProps {
  /** Color for Text. Defaults to theme's text color */
  color?: keyof Theme['colors']['name'] | keyof Theme['colors']['semantic'];

  /** Wether Text is inline (span) or block (div) */
  inline?: boolean;

  /** Style html elements inside text with theme styles */
  styleHtml?: boolean;

  /** Wether the text should truncate after the first line (block only) */
  truncate?: boolean;
}
