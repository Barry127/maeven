import clsx from 'clsx';
import React, {
  AllHTMLAttributes,
  ComponentClass,
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent
} from 'react';
import colorClasses from '../../common/colors.module.scss';
import { BackgroundColor, Color } from '../../types';
import classes from './block.module.scss';

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
      padding = false,
      textColor,
      ...props
    },
    ref
  ) => {
    const Element = component || element;

    return (
      <Element
        {...props}
        className={clsx(
          classes.block,
          { [classes.padding]: padding },
          background && colorClasses[`background-${background}`],
          textColor && colorClasses[`text-${textColor}`],
          className
        )}
        ref={ref}
      >
        {children}
      </Element>
    );
  }
);

export interface BlockProps extends AllHTMLAttributes<HTMLElement> {
  /** Background color for Block */
  background?: BackgroundColor;

  /** Type of component to render. (overwrites element) */
  component?: ComponentClass<any> | FunctionComponent<any>;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

  /** Wether block contains padding */
  padding?: boolean;

  /** Text color for Block */
  textColor?: Color;

  /** In order to work with custom custom components */
  [prop: string]: any;
}
