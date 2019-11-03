import React, { FC, AnchorHTMLAttributes, forwardRef } from 'react';

import { ButtonProps } from './Button';
import { useButton, renderChildren } from './helpers';

/**
 * AnchorButtons are links styled as a button element.
 */
export const AnchorButton = forwardRef<
  FC<ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>>,
  ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>
>((_props, ref) => {
  const { props, classes } = useButton<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >(_props, 'AnchorButton');

  const { disabled, tabIndex, ...restProps } = props;

  return (
    <a ref={ref as any} {...restProps} tabIndex={disabled ? -1 : tabIndex}>
      {renderChildren(_props, classes)}
    </a>
  );
});

AnchorButton.defaultProps = {
  active: false,
  color: 'default',
  disabled: false,
  fluid: false,
  link: false,
  outline: false,
  size: 'md'
};
