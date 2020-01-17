import React, { FC, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { Row, Col } from '../../Grid';
import { Text } from '../../Text';

import { classes, themeOverride } from './styles';

/**
 * A FormField is a row in a form with or without a label
 */

export const FormField: FC<FormFieldProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  htmlFor,
  label,
  labelId,
  size = 'md',
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Row
      className={clsx(
        classes.container,
        classes.responsiveContainer(theme),
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg'
        },
        themeOverride(theme),
        className
      )}
      {...restProps}
      gutter={1}
    >
      <Col className={classes.labelCol} transparent={true}>
        {label && (
          <label htmlFor={htmlFor} id={labelId}>
            <Text>{label}</Text>
          </label>
        )}
      </Col>
      <Col className={classes.fieldCol} transparent={true}>
        {children}
      </Col>
    </Row>
  );
};

interface FormFieldProps {
  /** Label text */
  label?: ReactNode;

  /** id for label field (for use with aria-describedby) */
  labelId?: string;

  /** id label points to */
  htmlFor?: string;

  /** Size for FormField */
  size?: 'sm' | 'md' | 'lg';
}
