import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Block } from '../Block';
import { ThemeColor } from '../../types';
import { useTheme } from '../../hooks/useTheme';

import { classes, themeOverride, styleHtmlThemeOverride } from './styles';

/**
 * The Text component is a low level component to style text.
 */
export const Text: FC<TextProps &
  (HTMLAttributes<HTMLDivElement> | HTMLAttributes<HTMLSpanElement>)> = ({
  children,
  className,
  color,
  inline = false,
  styleHtml = false,
  title,
  truncate = false,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Block
      component={inline ? 'span' : 'div'}
      className={clsx(
        classes.text,
        color && classes.color[color],
        {
          [classes.styleHtml]: styleHtml,
          [classes.truncate]: truncate && !inline
        },
        styleHtml && styleHtmlThemeOverride(theme),
        themeOverride(theme),
        className
      )}
      title={
        truncate && !title && typeof children === 'string' ? children : title
      }
      {...restProps}
    >
      {children}
    </Block>
  );
};

export interface TextProps {
  /** Color for Text. Defaults to theme's text color */
  color?: ThemeColor;

  /** Wether Text is inline (span) or block (div) */
  inline?: boolean;

  /** Style html elements inside text with theme styles */
  styleHtml?: boolean;

  /** Wether the text should truncate after the first line (block only) */
  truncate?: boolean;
}
