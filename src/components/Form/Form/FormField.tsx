import clsx from 'clsx';
import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { Col, Row } from '../../Grid';
import classes from './form.module.scss';

/**
 * A FormField is a row in a form with or without a label.
 */
export const FormField: FC<FormFieldProps> = ({
  children,
  className,
  hasError,
  htmlFor,
  label,
  labelId,
  size = 'md',
  ...props
}) => (
  <Row
    {...props}
    className={clsx(
      'mvn--form-field',
      classes.row,
      { [classes['has-error']]: hasError },
      classes[size],
      className
    )}
    gutter={1}
  >
    <Col
      className={classes.label}
      element={label ? 'label' : 'div'}
      {...(label ? { htmlFor, id: labelId } : {})}
    >
      {label}
    </Col>
    <Col className={classes.field}>{children}</Col>
  </Row>
);

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Wether form field has an error */
  hasError?: boolean;

  /** id label points to */
  htmlFor?: string;

  /** Label text */
  label?: ReactNode;

  /** id for label field (for use with aria-describedby) */
  labelId?: string;

  /** Size for FormField */
  size?: 'sm' | 'md' | 'lg';
}
