import clsx from 'clsx';
import React, {
  AllHTMLAttributes,
  ComponentClass,
  forwardRef,
  FunctionComponent
} from 'react';
import { BackgroundColor, Color } from '../../types';
import classes from './block.module.scss';

/**
 * A Block is a low level component with sensible theme default styling.
 */
export const Block = forwardRef<HTMLElement, BlockProps | AnyProps>(
  (
    {
      background,
      children,
      color,
      className,
      component,
      element = 'div',
      padding = false,
      ...props
    },
    ref
  ) => {
    const Element = component || element;

    return (
      <Element
        {...props}
        className={clsx(
          'mvn--block',
          classes.block,
          {
            [classes.padding]: padding,
            [classes[`background-${background}`]]: background,
            [classes[`text-${color}`]]: color
          },
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

  /** Text color for Block */
  color?: Color | 'inherit';

  /** Type of component to render. (overwrites element) */
  component?: ComponentClass<any> | FunctionComponent<any>;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

  /** Wether block contains padding */
  padding?: boolean;
}

interface AnyProps extends BlockProps {
  /** In order to work with custom custom components */
  [prop: string]: any;
}
