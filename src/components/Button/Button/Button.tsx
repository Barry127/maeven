import clsx from 'clsx';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { MaevenIcon, SemanticColor } from '../../../types';
import { Block } from '../../Block';
import { Icon } from '../../Icon';
import { Spinner } from '../../Spinner';
import classes from './button.module.scss';

/**
 * Buttons execute an action or change the state of an application. Button text helps users understand what action will occur when they click or tap.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      buttonType = 'default',
      disabled = false,
      fluid = false,
      icon,
      iconRight,
      loading = false,
      size = 'md',
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      {...props}
      className={clsx(
        'mvn--button',
        classes.button,
        [classes[buttonType]],
        classes[size],
        {
          [classes.fluid]: fluid,
          [classes['icon-button']]: icon && !iconRight && !children
        },
        className
      )}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {icon && !loading && (
        <Icon icon={icon} className={clsx(classes.icon, classes.left)} />
      )}
      {loading && <Spinner size="1em" className={classes.spinner} />}
      {children && (
        <Block element="span" className={classes.text}>
          {children}
        </Block>
      )}
      {iconRight && (
        <Icon icon={iconRight} className={clsx(classes.icon, classes.right)} />
      )}
    </button>
  )
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** type styling for button */
  buttonType?: 'default' | 'link' | SemanticColor;

  /** Wether button is disabled */
  disabled?: boolean;

  /** Wether button should be full width */
  fluid?: boolean;

  /** Icon to render before text */
  icon?: MaevenIcon;

  /** Icon to render after text */
  iconRight?: MaevenIcon;

  /** Wether button has loading state */
  loading?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}
