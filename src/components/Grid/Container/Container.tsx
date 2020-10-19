import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';
import { Block } from '../../Block';
import { BackgroundColor } from '../../../types';
import classes from './container.module.scss';

/**
 * The Container component can contain the main content or a grid. It has a maxWidth and centers the content block.
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, fluid, ...props }, ref) => (
    <Block
      {...props}
      className={clsx(
        classes.container,
        { [classes.responsive]: !fluid },
        className
      )}
      ref={ref}
    >
      {children}
    </Block>
  )
);

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Background color for Container content */
  background?: BackgroundColor;

  /** Type of html element to render. */
  element?: keyof JSX.IntrinsicElements;

  /** When Container is fluid, it has no maxWidth */
  fluid?: boolean;
}
