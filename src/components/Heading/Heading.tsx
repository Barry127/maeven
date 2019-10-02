import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Theme } from '../../themes/types';
import { useTheme } from '../../hooks/useTheme';

import { headingStyles } from './styles';

/**
 * An Heading component renders headings in a larger size than regular text.
 */
export const Heading: FC<
  HeadingProps & HTMLAttributes<HTMLHeadingElement>
> = props => {
  const theme = useTheme();
  const { classes } = headingStyles(theme, props);
  const {
    children,
    className,
    color,
    level: Tag,
    size,
    title,
    truncate,
    ...restProps
  } = props;

  return (
    <Tag
      className={clsx(classes.heading, className)}
      title={truncate && !title ? String(children) : title}
      {...restProps}
    >
      {children}
    </Tag>
  );
};

Heading.defaultProps = {
  truncate: false
};

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  /** Text color for heading. Defaults to theme's heading color */
  color?: keyof Theme['colors']['name'] | keyof Theme['colors']['semantic'];

  /** Heading level */
  level: HeadingLevel;

  /** Render text size as. Defaults to level */
  size?: HeadingLevel;

  /** Wether the text should truncate after the first line */
  truncate?: boolean;
}
