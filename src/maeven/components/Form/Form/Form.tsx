import React, { FC, FormHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

/**
 * Forms are grouping of input controls that allow a user to submit information to your application.
 */
export const Form: FC<AllFormProps> = ({
  children,
  className,
  forwardedRef,
  layout = 'horizontal',
  ...restProps
}) => (
  <form
    {...restProps}
    className={clsx(
      'mvn-form',
      { 'mvn-form-vertical': layout === 'vertical' },
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </form>
);

export const FormF = forwardRef<HTMLFormElement, AllFormProps>((props, ref) => (
  <Form {...props} forwardedRef={ref} />
));

type AllFormProps = FormProps & FormHTMLAttributes<HTMLFormElement>;

export interface FormProps {
  forwardedRef?: Ref<HTMLFormElement>;

  /** Form layout */
  layout?: 'horizontal' | 'vertical';
}
