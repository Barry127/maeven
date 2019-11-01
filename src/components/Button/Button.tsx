import React, { FC, ButtonHTMLAttributes, forwardRef } from 'react';

import { Theme } from '../../themes/types';
import { IconType } from '../types';

import { useButton, renderChildren } from './helpers';

/**
 * Buttons execute an action or change the state of an application. Button text helps users understand what action will occur when they click or tap.
 */
export const Button = forwardRef<
  FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>((_props, ref) => {
  const { props, classes } = useButton<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >(_props, 'Button');

  return (
    <button ref={ref as any} {...props}>
      {renderChildren(_props, classes)}
    </button>
  );
});

Button.defaultProps = {
  active: false,
  color: 'default',
  disabled: false,
  fluid: false,
  link: false,
  outline: false,
  size: 'md',
  type: 'button'
};

export interface ButtonProps {
  /** Should button be styles as active state */
  active?: boolean;

  /** Color style for button */
  color?: 'default' | keyof Theme['colors']['semantic'];

  /** Wether button is disabled */
  disabled?: boolean;

  /** Wether button should be full width */
  fluid?: boolean;

  /** Icon to render before text */
  icon?: IconType;

  /** Icon to render after text */
  iconRight?: IconType;

  /** Style button as link */
  link?: boolean;

  /** Weher button is styled as outlined */
  outline?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}
