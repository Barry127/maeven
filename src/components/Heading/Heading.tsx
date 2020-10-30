import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import { Color } from '../../types';
import { Block } from '../Block';
import classes from './heading.module.scss';
/**
 * The Heading component renders headings in a larger size than regular text.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      className,
      level,
      size = level,
      title,
      truncate = false,
      ...props
    },
    ref
  ) => (
    <Block
      {...props}
      className={clsx(
        'mvn--heading',
        `mvn--${level}`,
        classes[size],
        { [classes['has-color']]: props.color, [classes.truncate]: truncate },
        className
      )}
      element={level}
      title={
        truncate && !title && typeof children === 'string' ? children : title
      }
      ref={ref}
    >
      {children}
    </Block>
  )
);

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Text color for Heading. Defaults to theme's heading color */
  color?: Color | 'inherit';

  /** Heading level */
  level: HeadingLevel;

  /** Render text as specified level. Defaults to level */
  size?: HeadingLevel;

  /** Wether the text should truncate after the first line */
  truncate?: boolean;
}
