import React, {
  AllHTMLAttributes,
  ComponentClass,
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent
} from 'react';
import { BackgroundColor, Color } from '../../types';

/**
 * A Block is a low level component with sensible theme default styling.
 */
export const Block: ForwardRefExoticComponent<BlockProps> = forwardRef<
  HTMLElement,
  BlockProps
>(
  (
    {
      background,
      children,
      className,
      component,
      element = 'div',
      textColor,
      ...props
    },
    ref
  ) => {
    const Element = component || element;

    return (
      <Element ref={ref} {...props}>
        {children}
      </Element>
    );
  }
);

export interface BlockProps
  extends AllHTMLAttributes<HTMLElement | SVGElement> {
  /** Background color for Block */
  background?: BackgroundColor;

  /** Type of component to render. (overwrites element) */
  component?: ComponentClass<any> | FunctionComponent<any>;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

  /** Wether block contains padding */
  // padding?: boolean;

  /** Text color for Block */
  textColor?: Color;

  /** In order to work with custom custom components */
  [prop: string]: any;
}
