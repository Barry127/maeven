import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { ThemeColor } from '../../types';
import { useTheme } from '../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * The Heading component renders headings in a larger size than regular text.
 */
export const Heading: FC<HeadingProps & HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  color,
  level: Level,
  size = Level,
  title,
  truncate = false,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Level
      className={clsx(
        classes[size],
        color && classes.color[color],
        {
          [classes.truncate]: truncate
        },
        themeOverride(theme, Level),
        className
      )}
      title={
        truncate && !title && typeof children === 'string' ? children : title
      }
      {...restProps}
    >
      {children}
    </Level>
  );
};

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  /** Text color for Heading. Defaults to theme's heading color */
  color?: ThemeColor;

  /** Heading level */
  level: HeadingLevel;

  /** Render text as specified level. Defaults to level */
  size?: HeadingLevel;

  /** Wether the text should truncate after the first line */
  truncate?: boolean;
}
