import clsx from 'clsx';
import React, {
  FocusEvent,
  forwardRef,
  useCallback,
  useRef,
  useState
} from 'react';
import { passwordHide, passwordShow } from '../../../common/defaultIcons';
import { useTheme } from '../../../hooks';
import { mergeRefs } from '../../../lib/mergeRefs';
import { MaevenIcon } from '../../../types';
import { ControlButton } from '../../Button';
import { TextInput, TextInputProps } from '../TextInput';

/**
 * PasswordInput is a TextInput to handle passwords.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      children,
      className,
      disabled = false,
      hasError = false,
      hideIcon,
      onBlur: propsOnBlur,
      showIcon,
      showToggle = true,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(false);
    const [selection, setSelection] = useState<Selection>({ start: 0, end: 0 });
    const { iconOverrides } = useTheme();

    const focusInput = useCallback(() => {
      const input = inputRef.current;
      if (!input) return;
      input.focus();
      setTimeout(() => {
        input.selectionStart = selection.start;
        input.selectionEnd = selection.end;
      });
    }, [selection]);

    const onBlur = useCallback(
      (ev: FocusEvent<HTMLInputElement>) => {
        if (typeof propsOnBlur === 'function') propsOnBlur(ev);
        if (ev.defaultPrevented) return;

        if (ev.relatedTarget === buttonRef.current) {
          setSelection({
            start: ev.target.selectionStart,
            end: ev.target.selectionEnd
          });
        } else {
          setSelection({
            start: ev.target.value.length,
            end: ev.target.value.length
          });
        }
      },
      [propsOnBlur]
    );

    const toggleVisible = useCallback(() => {
      setVisible(!visible);
      focusInput();
    }, [focusInput, visible]);

    return (
      <TextInput
        {...props}
        className={clsx('mvn--password-input', className)}
        disabled={disabled}
        hasError={hasError}
        onBlur={onBlur}
        ref={mergeRefs(ref, inputRef)}
        rightElement={
          showToggle && !disabled ? (
            <ControlButton
              icon={
                visible
                  ? hideIcon || iconOverrides.passwordHide || passwordHide
                  : showIcon || iconOverrides.passwordShow || passwordShow
              }
              onClick={toggleVisible}
              onFocus={focusInput}
              ref={buttonRef}
              size={size}
              tabIndex={-1}
            />
          ) : undefined
        }
        size={size}
        type={visible ? 'text' : 'password'}
      >
        {children}
      </TextInput>
    );
  }
);

export interface PasswordInputProps
  extends Omit<
    TextInputProps,
    'iconRight' | 'loading' | 'rightElement' | 'type'
  > {
  /** Icon for hide password toggle (defaults to Feather icons eyeOff) */
  hideIcon?: MaevenIcon;

  /** Icon for show password toggle (defaults to Feather icons eye) */
  showIcon?: MaevenIcon;

  /** Wether to show the button to toggle between password and text */
  showToggle?: boolean;
}

interface Selection {
  start: number | null;
  end: number | null;
}
