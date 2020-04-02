import React, { FC, HTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';

import { Block } from '../Block/Block';
import { Color } from '../../types';

/**
 * The Text component is a low level component to style text.
 */
export const Text: FC<AllTextProps> = ({
  children,
  className,
  color,
  inline = false,
  styleHtml = false,
  title,
  truncate = false,
  ...restProps
}) => {
  return (
    <Block
      element={inline ? 'span' : 'div'}
      className={clsx(
        {
          'mvn-styled-text': styleHtml,
          'mvn-truncate': truncate && !inline
        },
        className
      )}
      title={
        truncate && !title && typeof children === 'string' ? children : title
      }
      textColor={color}
      {...restProps}
    >
      {children}
    </Block>
  );
};

export const TextF = forwardRef<HTMLDivElement | HTMLSpanElement, AllTextProps>(
  (props, ref) => <Text {...props} forwardedRef={ref} />
);

type AllTextProps = TextProps &
  HTMLAttributes<HTMLDivElement | HTMLSpanElement>;

export interface TextProps {
  /** Color for Text. Defaults to theme's text color */
  color?: Color;

  /** Wether Text is inline (span) or block (div) */
  inline?: boolean;

  forwardedRef?: Ref<HTMLDivElement | HTMLSpanElement>;

  /** Style html elements inside text with theme styles */
  styleHtml?: boolean;

  /** Wether the text should truncate after the first line (block only) */
  truncate?: boolean;
}
