import React, { forwardRef, FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { IconType } from '../types';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';

import { inputStyles } from './styles';
import { Icon } from '../Icon';

/**
 * Inputs are the most commonly used form controls and allow for text input.
 */
export const TextInput = forwardRef<
  FC<TextInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>>,
  TextInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
>((props, ref) => {
  const theme = useTheme();

  const { classes } = inputStyles(theme, props);
  const {
    children,
    className,
    hasError,
    icon,
    iconRight,
    rightElement,
    size,
    ...restProps
  } = props;
  return (
    <div className={clsx(classes.container, className)}>
      <label className={clsx(classes.label)}>
        <input ref={ref as any} className={classes.input} {...restProps} />
        {icon && (
          <Icon className={clsx(classes.icon, classes.iconLeft)} icon={icon} />
        )}
        {iconRight && (
          <Icon
            className={clsx(classes.icon, classes.iconRight)}
            icon={iconRight}
          />
        )}
        {rightElement && (
          <div className={classes.rightElement}>{rightElement}</div>
        )}
      </label>

      {children && <Text className={classes.children}>{children}</Text>}
    </div>
  );
});

TextInput.defaultProps = {
  disabled: false,
  hasError: false,
  size: 'md',
  type: 'text'
};

export interface TextInputProps {
  /** Wether input is disabled */
  disabled?: boolean;

  /** Wether input contains an error */
  hasError?: boolean;

  /** Icon for input */
  icon?: IconType;

  /** Icon for right side of input */
  iconRight?: IconType;

  /** Element to render on right side of input */
  rightElement?: JSX.Element;

  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}
