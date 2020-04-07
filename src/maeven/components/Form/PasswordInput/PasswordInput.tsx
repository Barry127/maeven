import React, {
  FC,
  InputHTMLAttributes,
  forwardRef,
  useState,
  useCallback,
  FocusEvent,
  useRef
} from 'react';
import clsx from 'clsx';

import { useId } from '../../../hooks/useId';
import { MaevenIcon } from '../../../types';
import { eye, eyeOff } from '../../../common/defaultIcons';

import { TextInputProps, TextInput } from '../TextInput/TextInput';
import { Button } from '../../Button';

/**
 * PasswordInput is a TextInput to handle passwords.
 */
export const PasswordInput: FC<AllPasswordProps> = ({
  children,
  className,
  disabled = false,
  hasError = false,
  hideIcon,
  icon,
  id: propsId,
  onBlur: propsOnBlur,
  showIcon,
  showToggle = true,
  size = 'md',
  ...restProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState<Selection>({ start: 0, end: 0 });

  const id = useId(propsId);

  const focusInput = useCallback(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.focus();
    setTimeout(() => {
      input.selectionStart = selection.start;
      input.selectionEnd = selection.end;
    });
  }, [id, selection]);

  const onBlur = useCallback(
    (ev: FocusEvent<HTMLInputElement>) => {
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

      if (propsOnBlur) {
        propsOnBlur(ev);
      }
    },
    [setSelection, propsOnBlur, buttonRef]
  );

  const toggleVisible = useCallback(() => {
    setVisible(!visible);
    focusInput();
  }, [visible, setVisible, focusInput]);

  return (
    <TextInput
      className={clsx('mvn-password-input', className)}
      disabled={disabled}
      hasError={hasError}
      icon={icon}
      id={id}
      onBlur={onBlur}
      size={size}
      type={visible ? 'text' : 'password'}
      rightElement={
        showToggle && !disabled ? (
          <Button
            buttonType="link"
            onClick={toggleVisible}
            onFocus={focusInput}
            ref={buttonRef}
            size={size}
            icon={visible ? hideIcon || eyeOff : showIcon || eye}
            tabIndex={-1}
          />
        ) : (
          undefined
        )
      }
      {...restProps}
    >
      {children}
    </TextInput>
  );
};

export const PasswordInputF = forwardRef<HTMLInputElement, AllPasswordProps>(
  (props, ref) => <PasswordInput {...props} forwardedRef={ref} />
);

export type AllPasswordProps = PasswordInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface PasswordInputProps
  extends Omit<TextInputProps, 'rightElement' | 'iconRight'> {
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
