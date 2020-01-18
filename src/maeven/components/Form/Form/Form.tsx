import React, { FC, FormHTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';

import { classes, themeOverride } from './styles';

/**
 * Forms are grouping of input controls that allow a user to submit information to your application.
 */
export const Form: FC<FormProps & FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  className,
  layout = 'horizontal',
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <form
      className={clsx(
        classes.form,
        { [classes.vertical]: layout === 'vertical' },
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {children}
    </form>
  );
};

export interface FormProps {
  /** Form layout */
  layout?: 'horizontal' | 'vertical';
}
