import clsx from 'clsx';
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef
} from 'react';
import { check, minus } from '../../../common/defaultIcons';
import { useId, useTheme } from '../../../hooks';
import { mergeRefs } from '../../../lib/mergeRefs';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { Icon } from '../../Icon';
import { OptionalField } from '../Form';
import classes from './check-box.module.scss';

/**
 * With Checkboxes users can select multiple options in a list.
 */
export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      checked,
      checkIcon,
      children,
      className,
      disabled = false,
      hasError = false,
      indeterminate = false,
      indeterminateIcon,
      label,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId(props);
    const labelId = useId();
    const { iconOverrides } = useTheme();
    const checkBoxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (indeterminate && checkBoxRef.current) {
        checkBoxRef.current.checked = false;
        checkBoxRef.current.indeterminate = true;
      }
      if (checkBoxRef.current?.indeterminate && !indeterminate) {
        checkBoxRef.current.indeterminate = false;
      }
    }, [indeterminate, checked]);

    return (
      <OptionalField
        hasError={hasError}
        htmlFor={id}
        label={label}
        labelId={labelId}
        size={size}
      >
        <label
          className={clsx(
            'mvn--check-box',
            classes.container,
            classes[size],
            {
              [classes['has-label']]: !!label,
              [classes['has-error']]: hasError,
              [classes['has-children']]: !!children
            },
            className
          )}
          style={style}
        >
          <input
            {...props}
            className={classes.input}
            checked={checked}
            disabled={disabled}
            id={id}
            ref={mergeRefs(ref, checkBoxRef)}
            type="checkbox"
            aria-describedby={label ? labelId : undefined}
          />
          <div className={classes.box}>
            <Icon
              className={classes.icon}
              icon={
                indeterminate
                  ? indeterminateIcon || iconOverrides.indeterminate || minus
                  : checkIcon || iconOverrides.check || check
              }
            />
          </div>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </label>
      </OptionalField>
    );
  }
);

export interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Wether the CheckBox is checked */
  checked?: boolean;

  /** Check icon (defaults to Feather icons check) */
  checkIcon?: MaevenIcon;

  /** Wether checkBox is disabled */
  disabled?: boolean;

  /** Wether CheckBox contains an error */
  hasError?: boolean;

  /** Wether CheckBox has indeterminate state (overwrites checked) */
  indeterminate?: boolean;

  /** Indeterminate icon (defaults to Feather icons minus) */
  indeterminateIcon?: MaevenIcon;

  /** Label text */
  label?: ReactNode;

  /** CheckBox size */
  size?: 'sm' | 'md' | 'lg';
}
