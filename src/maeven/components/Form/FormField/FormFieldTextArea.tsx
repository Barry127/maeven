import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { TextArea, AllTextAreaProps } from '../TextArea/TextArea';
import { FormField } from './FormField';

/**
 * A FormField for a TextArea
 */
export const FormFieldTextArea: FC<FormFieldTextAreaProps> = ({
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
      <TextArea
        {...restProps}
        hasError={hasError}
        id={id}
        size={size}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTextAreaF = forwardRef<
  HTMLTextAreaElement,
  FormFieldTextAreaProps
>((props, ref) => <FormFieldTextArea {...props} forwardedRef={ref} />);

interface FormFieldTextAreaProps extends AllTextAreaProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
