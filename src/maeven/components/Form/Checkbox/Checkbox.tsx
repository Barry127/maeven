import React, { FC, Ref, InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { MaevenIcon } from '../../../types';

import { classes, themeOverride } from './styles';

/**
 * Checkbox description
 */
export const Checkbox: FC<CheckboxProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> = ({
  children,
  className,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(classes.checkbox, themeOverride(theme), className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const CheckboxForwardRef = forwardRef<
  HTMLInputElement,
  CheckboxProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <Checkbox {...props} forwardedRef={ref} />);

export interface CheckboxProps {
  /** Wether the Checkbos is checked */
  checked?: boolean;

  /** Check icon (defaults to Feather icons check) */
  checkIcon?: MaevenIcon;

  /** Wether checkbox is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLInputElement>;

  /** Wether Checkbox contains an error */
  hasError?: boolean;

  /** Wether Checkbox has indeterminate state (overwrites checked) */
  indeterminate?: boolean;

  /** Indeterminate icon (defaults to Feather icons minus) */
  indeterminateIcon?: MaevenIcon;

  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
}
