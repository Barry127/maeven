import React, { FC, HTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';

import { Block } from '../Block/Block';

import { Color } from '../../types';

/**
 * The Heading component renders headings in a larger size than regular text.
 */
export const Heading: FC<AllHeadingProps> = ({
  children,
  className,
  color,
  level,
  size = level,
  title,
  truncate = false,
  ...restProps
}) => {
  return (
    <Block
      {...restProps}
      className={clsx(
        `mvn-${size}`,
        {
          [`mvn-heading-truncate`]: truncate
        },
        className
      )}
      element={level}
      title={
        truncate && !title && typeof children === 'string' ? children : title
      }
      textColor={color}
    >
      {children}
    </Block>
  );
};

export const HeadingF = forwardRef<HTMLHeadingElement, AllHeadingProps>(
  (props, ref) => <Heading {...props} forwardedRef={ref} />
);

type AllHeadingProps = HeadingProps & HTMLAttributes<HTMLHeadingElement>;

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  /** Text color for Heading. Defaults to theme's heading color */
  color?: Color;

  forwardedRef?: Ref<HTMLHeadingElement>;

  /** Heading level */
  level: HeadingLevel;

  /** Render text as specified level. Defaults to level */
  size?: HeadingLevel;

  /** Wether the text should truncate after the first line */
  truncate?: boolean;
}
