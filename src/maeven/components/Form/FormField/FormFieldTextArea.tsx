import React, { FC, ReactNode, CSSProperties, forwardRef } from 'react';

import { useId } from '../../../hooks/useId';

import { TextArea, FullProps } from '../TextArea/TextArea';
import { FormField } from './FormField';

/**
 * A FormField for a TextArea
 */
export const FormFieldTextArea: FC<FormFieldTextAreaProps> = ({
  containerClassName,
  containerStyle,
  label,
  ...restProps
}) => {
  const id = useId(restProps);
  const labelId = useId();

  return (
    <FormField
      className={containerClassName}
      style={containerStyle}
      label={label}
      labelId={labelId}
      htmlFor={id}
    >
      <TextArea
        {...restProps}
        id={id}
        aria-describedby={label ? labelId : undefined}
      />
    </FormField>
  );
};

export const FormFieldTextAreaForwardRef = forwardRef<
  HTMLTextAreaElement,
  FullProps
>((props, ref) => <FormFieldTextArea {...props} forwardedRef={ref} />);

interface FormFieldTextAreaProps extends FullProps {
  /** Classname for FormField container */
  containerClassName?: string;

  /** Style for FormField container */
  containerStyle?: CSSProperties;

  /** Label text */
  label?: ReactNode;
}
