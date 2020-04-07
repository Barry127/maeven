import React, { FC, TextareaHTMLAttributes, Ref, forwardRef } from 'react';
import clsx from 'clsx';
import TextAreaAutosize from 'react-autosize-textarea';

import { Text } from '../../Text';

/**
 * TextArea allows for multiline text input.
 */
export const TextArea: FC<AllTextAreaProps> = ({
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
}) => (
  <div
    className={clsx(
      'mvn-text-area',
      {
        'mvn-text-area-sm': size === 'sm',
        'mvn-text-area-lg': size === 'lg',
        'mvn-text-area-error': hasError
      },
      className
    )}
  >
    <label className="mvn-text-area-label">
      {autoSize ? (
        <TextAreaAutosize
          ref={forwardedRef}
          disabled={disabled}
          rows={rows}
          maxRows={maxRows}
          {...restProps}
        />
      ) : (
        <textarea
          ref={forwardedRef}
          className="mvn-text-area-no-auto-size"
          disabled={disabled}
          rows={rows}
          {...restProps}
        />
      )}
    </label>
    {children ? (
      <Text color={hasError ? 'danger' : undefined}>{children}</Text>
    ) : null}
  </div>
);

export const TextAreaF = forwardRef<HTMLTextAreaElement, AllTextAreaProps>(
  (props, ref) => <TextArea {...props} forwardedRef={ref} />
);

export type AllTextAreaProps = TextAreaProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

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
