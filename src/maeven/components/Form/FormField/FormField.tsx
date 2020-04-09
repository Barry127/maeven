import React, { FC, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Row, Col } from '../../Grid';
import { Text } from '../../Text';

/**
 * A FormField is a row in a form with or without a label
 */
export const FormField: FC<FormFieldProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  hasError = false,
  htmlFor,
  label,
  labelId,
  size = 'md',
  ...restProps
}) => (
  <Row
    {...restProps}
    className={clsx(
      'mvn-form-field',
      {
        'mvn-form-field-sm': size === 'sm',
        'mvn-form-field-lg': size === 'lg'
      },
      className
    )}
    gutter={1}
  >
    <Col className="mvn-form-field-label">
      {label && (
        <label htmlFor={htmlFor} id={labelId}>
          <Text color={hasError ? 'danger' : undefined}>{label}</Text>
        </label>
      )}
    </Col>
    <Col className="mvn-form-field-field">{children}</Col>
  </Row>
);

interface FormFieldProps {
  /** Label text */
  label?: ReactNode;

  /** id for label field (for use with aria-describedby) */
  labelId?: string;

  /** Wether form field has an error */
  hasError?: boolean;

  /** id label points to */
  htmlFor?: string;

  /** Size for FormField */
  size?: 'sm' | 'md' | 'lg';
}
