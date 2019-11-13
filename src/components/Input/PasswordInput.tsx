import React, {
  forwardRef,
  FC,
  InputHTMLAttributes,
  useState,
  useCallback
} from 'react';
import clsx from 'clsx';

import { IconType } from '../types';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Button';
import { eye, eyeOff } from '../../common/defaultIcons';

import { TextInputProps, TextInput } from './TextInput';
import { useId } from '../../hooks/useId';
import { passwordStyles } from './styles';

/**
 * PasswordInput is a TextInput to handle passwords.
 */
export const PasswordInput = forwardRef<
  FC<
    PasswordInputProps &
      Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>
  >,
  PasswordInputProps &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>
>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const id = useId(props);

  const { classes } = passwordStyles(theme, props);

  const focusInput = useCallback(() => {
    document.getElementById(id)!.focus();
  }, [id]);

  const toggleVisible = useCallback(() => {
    setVisible(!visible);
    focusInput();
  }, [visible, setVisible, focusInput]);

  const {
    children,
    className,
    hideIcon,
    showIcon,
    showToggle,
    ...restProps
  } = props;

  return (
    <TextInput
      {...restProps}
      className={clsx(classes.input, className)}
      type={visible ? 'text' : 'password'}
      ref={ref}
      id={id}
      rightElement={
        showToggle && !props.disabled ? (
          <Button
            className={classes.toggle}
            onClick={toggleVisible}
            onFocus={focusInput}
            size={props.size}
            icon={
              visible
                ? hideIcon || theme.iconOverrides.hidePassword || eyeOff
                : showIcon || theme.iconOverrides.showPassword || eye
            }
            tabIndex={-1}
          ></Button>
        ) : (
          undefined
        )
      }
    >
      {children}
    </TextInput>
  );
});

PasswordInput.defaultProps = {
  showToggle: true,
  size: 'md'
};

export interface PasswordInputProps
  extends Omit<TextInputProps, 'rightElement' | 'iconRight'> {
  /** Icon for hide password toggle (defaults to Feather icons eyeOff) */
  hideIcon?: IconType;

  /** Icon for show password toggle (defaults to Feather icons eye) */
  showIcon?: IconType;

  /** Wether to show the button to toggle between password and text */
  showToggle?: boolean;
}
