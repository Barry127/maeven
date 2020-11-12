import clsx from 'clsx';
import React, { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react';
import TextAreaAutosize from 'react-autosize-textarea';
import { useId } from '../../../hooks';
import { Block } from '../../Block';
import { OptionalField } from '../Form';
import classes from './text-area.module.scss';

/**
 * TextArea allows for multiline text input.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      autoSize = true,
      children,
      className,
      disabled = false,
      hasError = false,
      label,
      maxRows,
      size = 'md',
      style,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const id = useId(props);
    const labelId = useId();

    return (
      <OptionalField
        hasError={hasError}
        htmlFor={id}
        label={label}
        labelId={labelId}
        size={size}
      >
        <div
          className={clsx(
            'mvn--text-area',
            classes.container,
            classes[size],
            { [classes['has-error']]: hasError },
            className
          )}
          style={style}
        >
          <label className={classes.label}>
            {autoSize ? (
              <TextAreaAutosize
                {...props}
                className={classes.textarea}
                disabled={disabled}
                id={id}
                maxRows={maxRows}
                ref={ref}
                rows={rows}
              />
            ) : (
              <textarea
                {...props}
                className={clsx(classes.textarea, classes['no-autosize'])}
                disabled={disabled}
                id={id}
                ref={ref}
                rows={rows}
              />
            )}
          </label>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </div>
      </OptionalField>
    );
  }
);

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Wether textarea grows in size when more lines are added */
  autoSize?: boolean;

  /** Wether textarea is disabled */
  disabled?: boolean;

  /** Wether textarea contains an error */
  hasError?: boolean;

  /** Label text */
  label?: ReactNode;

  /** Maximum number of rows */
  maxRows?: number;

  /** (min) number of rows */
  rows?: number;

  /** TextArea size */
  size?: 'sm' | 'md' | 'lg';
}
