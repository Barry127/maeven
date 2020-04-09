import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import {
  TypeAheadInput,
  AllTypeAheadInputProps
} from '../TypeAheadInput/TypeAheadInput';
import { FormField } from './FormField';

/**
 * A FormField for a TypeAheadInput
 */
export const FormFieldTypeAheadInput: FC<FormFieldTypeAheadInputProps> = ({
  containerClassName,
  containerStyle,
  hasError = false,
  size = 'md',
  label,
  ...restProps
}) => {
  const id = useId(restProps);
  const labelId = useId();

  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      size={size}
      label={label}
      labelId={labelId}
      htmlFor={id}
      hasError={hasError}
    >
      <TypeAheadInput
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTypeAheadInputF = forwardRef<
  HTMLInputElement,
  FormFieldTypeAheadInputProps
>((props, ref) => <FormFieldTypeAheadInput {...props} forwardedRef={ref} />);

interface FormFieldTypeAheadInputProps extends AllTypeAheadInputProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
