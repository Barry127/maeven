import clsx from 'clsx';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { MaevenIcon } from '../../../types';
import { Button } from '../Button';
import classes from './control-button.module.scss';

/**
 * Control Buttons are buttons for internal usage to be used inside other components.
 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(
  ({ children, className, ...props }, ref) => (
    <Button
      {...props}
      className={clsx(
        'mvn--control-button',
        classes['control-button'],
        className
      )}
      ref={ref}
    />
  )
);

export interface ControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: never;

  /** Wether button is disabled */
  disabled?: boolean;

  /** Icon to render before text */
  icon: MaevenIcon;

  /** Wether button has loading state */
  loading?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}
