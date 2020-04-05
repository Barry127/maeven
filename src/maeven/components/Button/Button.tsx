import React, { FC, ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import { useOutline } from '../../hooks/useOutline';
import { SemanticColorName, MaevenIcon } from '../../types';

import { Icon } from '../Icon';
import { Spinner } from '../Spinner';

/**
 * Buttons execute an action or change the state of an application. Button text helps users understand what action will occur when they click or tap.
 */
export const Button: FC<AllButtonProps> = ({
  active = false,
  buttonType = 'default',
  children,
  className,
  disabled = false,
  fluid = false,
  forwardedRef,
  icon,
  iconRight,
  loading = false,
  size = 'md',
  type = 'button',
  ...restProps
}) => {
  const styleOutline = useOutline(true);

  return (
    <button
      {...restProps}
      className={clsx(
        'mvn-button',
        buttonType !== 'default' && `mvn-button-${buttonType}`,
        {
          'mvn-button-fluid': fluid,
          'mvn-button-active': active && !disabled,
          'mvn-button-sm': size === 'sm',
          'mvn-button-lg': size === 'lg',
          'mvn-button-focus-outline': styleOutline,
        },
        className
      )}
      disabled={disabled || loading}
      ref={forwardedRef}
      type={type}
    >
      {icon && !loading && <Icon icon={icon} />}
      {loading && <Spinner />}
      {children && <span className="mvn-button-text">{children}</span>}
      {iconRight && <Icon icon={iconRight} />}
    </button>
  );
};

export const ButtonF = forwardRef<HTMLButtonElement, AllButtonProps>(
  (props, ref) => <Button {...props} forwardedRef={ref} />
);

type AllButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps {
  /** Should button be styles as active state */
  active?: boolean;

  /** type styling for button */
  buttonType?: 'default' | 'link' | SemanticColorName;

  /** Wether button is disabled */
  disabled?: boolean;

  /** Wether button should be full width */
  fluid?: boolean;

  forwardedRef?: Ref<HTMLButtonElement>;

  /** Icon to render before text */
  icon?: MaevenIcon;

  /** Icon to render after text */
  iconRight?: MaevenIcon;

  /** Wether button has loading state */
  loading?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}
