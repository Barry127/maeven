import React, { FC, TextareaHTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';
import TextAreaAutosize from 'react-autosize-textarea';

import { useTheme } from '../../../hooks/useTheme';

import { classes, themeOverride } from './styles';
import { Text } from '../../Text';

/**
 * TextArea allows for multiline text input.
 */
export const TextArea: FC<TextAreaProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>> = ({
  autoSize = true,
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  maxRows,
  size = 'md',
  rows = 3,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <div
      className={clsx(
        classes.containter,
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
    >
      <label className={classes.label}>
        {autoSize ? (
          <TextAreaAutosize
            ref={forwardedRef}
            className={classes.textArea}
            disabled={disabled}
            rows={rows}
            maxRows={maxRows}
            {...restProps}
          />
        ) : (
          <textarea
            ref={forwardedRef}
            className={clsx(classes.box, classes.textArea)}
            disabled={disabled}
            rows={rows}
            {...restProps}
          />
        )}
      </label>
      {children ? <Text>{children}</Text> : null}
    </div>
  );
};

export const TextAreaForwardRef = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>
>((props, ref) => <TextArea {...props} forwardedRef={ref} />);

export interface TextAreaProps {
  /** Wether textarea grows in size when more lines are added */
  autoSize?: boolean;

  /** Wether textarea is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLTextAreaElement>;

  /** Wether textarea contains an error */
  hasError?: boolean;

  /** Maximum number of rows */
  maxRows?: number;

  /** (min) number of rows */
  rows?: number;

  /** TextArea size */
  size?: 'sm' | 'md' | 'lg';
}
