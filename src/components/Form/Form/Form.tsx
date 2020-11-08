import clsx from 'clsx';
import React, { forwardRef, FormHTMLAttributes } from 'react';
import classes from './form.module.scss';

/**
 * Forms are grouping of input controls that allow a user to submit information to your application.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, layout = 'horizontal', ...props }, ref) => (
    <form
      {...props}
      className={clsx('mvn--form', classes.form, classes[layout], className)}
      ref={ref}
    >
      {children}
    </form>
  )
);

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Form layout */
  layout?: 'horizontal' | 'vertical';
}
