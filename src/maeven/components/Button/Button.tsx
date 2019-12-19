import React, { FC, ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { useOutline } from '../../hooks/useOutline';
import { SemanticColorName, MaevenIcon } from '../../types';

import { classes, themeOverride } from './styles';
import { Icon } from '../Icon';

/**
 * Buttons execute an action or change the state of an application. Button text helps users understand what action will occur when they click or tap.
 */
export const Button: FC<ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>> = ({
  active = false,
  buttonType = 'default',
  children,
  className,
  disabled = false,
  fluid = false,
  forwardedRef,
  icon,
  iconRight,
  outline = false,
  size = 'md',
  type = 'button',
  ...restProps
}) => {
  const theme = useTheme();
  const styleOutline = useOutline(true);

  return (
    <button
      className={clsx(
        classes.button,
        classes.buttonTypes[buttonType],
        {
          [classes.disabled]: disabled,
          [classes.fluid]: fluid,
          [classes.active]: active && !disabled,
          [classes.outline]: outline,
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.focusOutline]: styleOutline
        },
        themeOverride(theme),
        className
      )}
      disabled={disabled}
      ref={forwardedRef}
      type={type}
      {...restProps}
    >
      {icon && <Icon icon={icon} className={classes.iconLeft} />}
      {children && <span className={classes.buttonText}>{children}</span>}
      {iconRight && <Icon icon={iconRight} className={classes.iconRight} />}
    </button>
  );
};

export const ButtonForwardRef = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => <Button {...props} forwardedRef={ref} />);

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

  /** Weher button is styled as outlined */
  outline?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}
