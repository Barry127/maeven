import React, { FC, ReactNode } from 'react';
import { FormField } from './FormField';

/**
 * A optional field is renders a FormField when a label is present and only the children when no label is given.
 */
export const OptionalField: FC<OptionalFieldProps> = ({
  children,
  label,
  ...props
}) =>
  label ? (
    <FormField label={label} {...props}>
      {children}
    </FormField>
  ) : (
    <>{children}</>
  );

export interface OptionalFieldProps {
  /** Wether form field has an error */
  hasError?: boolean;

  /** id label points to */
  htmlFor: string;

  /** Label text */
  label?: ReactNode;

  /** id for label field (for use with aria-describedby) */
  labelId: string;

  /** Size for FormField */
  size: 'sm' | 'md' | 'lg';
}
