import clsx from 'clsx';
import React, {
  AnchorHTMLAttributes,
  ComponentClass,
  forwardRef,
  FunctionComponent
} from 'react';
import { useOutline } from '../../hooks';
import { Color } from '../../types';
import { Block } from '../Block';
import htmlClasses from '../Html/html.module.scss';
import classes from './link.module.scss';

/**
 * Links are accessible elements used for navigation.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps | AnyProps>(
  ({ children, className, ...props }, ref) => {
    const outline = useOutline();

    return (
      <Block
        {...props}
        className={clsx(
          htmlClasses.a,
          classes.link,
          {
            [classes.outline]: outline,
            [htmlClasses['has-color']]: props.color
          },
          className
        )}
        element="a"
        ref={ref}
      >
        {children}
      </Block>
    );
  }
);

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Styling color for link, defaults to theme's link color */
  color?: Color;

  /** Custom component to use instead of html anchor element */
  component?: ComponentClass<any> | FunctionComponent<any>;
}

interface AnyProps {
  /** In order to work with custom custom components */
  [prop: string]: any;
}
