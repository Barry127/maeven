import React, { forwardRef, FC, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import TextAreaAutosize from 'react-autosize-textarea';

import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';

import { areaStyles } from './styles';

/**
 * Textareas allow for multiline input
 */
export const TextArea = forwardRef<
  FC<TextAreaProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>>,
  TextAreaProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>
>((props, ref) => {
  const theme = useTheme();

  const { classes, css } = areaStyles(theme, props);
  const { autoSize, children, className, hasError, size, ...restProps } = props;
  const { maxRows, ...nativeTextAreaProps } = restProps;

  return (
    <div className={clsx(classes.container, className)}>
      <label className={classes.label}>
        {autoSize ? (
          <TextAreaAutosize
            ref={ref as any}
            className={classes.textarea}
            {...restProps}
            style={{
              resize: 'none',
              padding: css.textarea.padding as number,
              ...restProps.style
            }}
          />
        ) : (
          <textarea
            ref={ref as any}
            className={classes.textarea}
            {...nativeTextAreaProps}
            style={{
              resize: 'none',
              ...restProps.style
            }}
          />
        )}
      </label>

      {children && <Text className={classes.children}>{children}</Text>}
    </div>
  );
});

TextArea.defaultProps = {
  autoSize: true,
  disabled: false,
  hasError: false,
  size: 'md',
  rows: 3
};

export interface TextAreaProps {
  /** Wether textarea grows in size when more lines are added */
  autoSize?: boolean;

  /** Wether textarea is disabled */
  disabled?: boolean;

  /** Wether textarea contains an error */
  hasError?: boolean;

  /** Maximum nomber of rows */
  maxRows?: number;

  /** (min) number of rows */
  rows?: number;

  /** Textarea size */
  size?: 'sm' | 'md' | 'lg';
}
