import clsx from 'clsx';
import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { useId } from '../../../hooks';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { Icon } from '../../Icon';
import { OptionalField } from '../Form';
import classes from './toggle.module.scss';

/**
 * A Toggle is a control to toggle between 2 states.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      children,
      className,
      disabled = false,
      label,
      offIcon,
      onIcon,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const id = useId(props);
    const labelId = useId();

    return (
      <OptionalField htmlFor={id} label={label} labelId={labelId} size={size}>
        <label
          className={clsx(
            'mvn--toggle',
            classes.container,
            classes[size],
            {
              [classes['has-label']]: !!label,
              [classes['has-children']]: !!children
            },
            className
          )}
          style={style}
        >
          <input
            {...props}
            className={classes.input}
            disabled={disabled}
            id={id}
            ref={ref}
            type="checkbox"
            aria-describedby={label ? labelId : undefined}
          />
          <div className={classes.toggle}>
            {onIcon && (
              <Icon className={clsx(classes.icon, classes.on)} icon={onIcon} />
            )}
            {offIcon && (
              <Icon
                className={clsx(classes.icon, classes.off)}
                icon={offIcon}
              />
            )}
            <div className={classes.knob} />
          </div>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </label>
      </OptionalField>
    );
  }
);

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Wether the Toggle is checked (on) */
  checked?: boolean;

  /** Wether toggle is disabled */
  disabled?: boolean;

  /** Label text */
  label?: ReactNode;

  /** Icon for off state */
  offIcon?: MaevenIcon;

  /** Icon for on state */
  onIcon?: MaevenIcon;

  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}
