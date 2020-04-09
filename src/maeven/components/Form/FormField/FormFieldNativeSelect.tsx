import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import {
  NativeSelect,
  AllNativeSelectProps
} from '../NativeSelect/NativeSelect';
import { FormField } from './FormField';

/**
 * A FormField for a NativeSelect
 */
export const FormFieldNativeSelect: FC<FormFieldNativeSelectProps> = ({
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
      <NativeSelect
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldNativeSelectF = forwardRef<
  HTMLSelectElement,
  FormFieldNativeSelectProps
>((props, ref) => <FormFieldNativeSelect {...props} forwardedRef={ref} />);

interface FormFieldNativeSelectProps extends AllNativeSelectProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
