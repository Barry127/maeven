import clsx from 'clsx';
import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactElement
} from 'react';
import { Button } from '../Button/Button';
import classes from './button-group.module.scss';

/**
 * A ButtonGroup groups a set of buttons together.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, fluid = false, size = 'md', ...props }, ref) => (
    <div
      {...props}
      className={clsx(
        'mvn--button-group',
        classes.group,
        { [classes.fluid]: fluid },
        className
      )}
      ref={ref}
    >
      {(Array.isArray(children) ? children : [children])
        .filter(isValidElement)
        .filter((child) => child.type === Button)
        .map((button: ReactElement<any>, i) =>
          cloneElement(button, { size, key: button.props.key || i })
        )}
    </div>
  )
);

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Button group size */
  size?: 'sm' | 'md' | 'lg';

  /** Wether button group should be full width */
  fluid?: boolean;
}
