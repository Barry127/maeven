import React, {
  FC,
  Ref,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { MaevenIcon } from '../../../types';
import { mergeRefs } from '../../../common/mergeRefs';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { check, minus } from '../../../common/defaultIcons';

import { classes, themeOverride } from './styles';

/**
 * With Checkboxes users can select multiple options in a list.
 */
export const Checkbox: FC<CheckboxProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> = ({
  checked,
  checkIcon,
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  indeterminate = false,
  indeterminateIcon,
  size = 'md',
  style,
  ...restProps
}) => {
  const theme = useTheme();
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (indeterminate && checkboxRef.current) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
  }, [indeterminate, checked]);

  return (
    <label
      className={clsx(
        classes.container,
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
      style={style}
    >
      <input
        type="checkbox"
        checked={checked}
        className={classes.checkbox}
        disabled={disabled}
        ref={mergeRefs(checkboxRef, forwardedRef)}
        {...restProps}
      />
      <div className={classes.box}>
        <Icon
          icon={
            indeterminate
              ? indeterminateIcon || theme.iconOverrides?.indeterminate || minus
              : checkIcon || theme.iconOverrides?.check || check
          }
          fixedWidth
          className={classes.icon}
        />
      </div>
      <Text className={classes.text}>{children}</Text>
    </label>
  );
};

export const CheckboxForwardRef = forwardRef<
  HTMLInputElement,
  CheckboxProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <Checkbox {...props} forwardedRef={ref} />);

export interface CheckboxProps {
  /** Wether the Checkbox is checked */
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
