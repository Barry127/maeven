import React, {
  FC,
  InputHTMLAttributes,
  Ref,
  forwardRef,
  useState,
  useRef,
  useEffect
} from 'react';
import clsx from 'clsx';

import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';

/**
 * Inputs are the most commonly used form controls and allow for text input.
 */
export const TextInput: FC<AllTextInputProps> = ({
  children,
  className,
  disabled = false,
  forwardedRef,
  hasError = false,
  icon,
  iconRight,
  rightElement,
  size = 'md',
  style,
  type = 'text',
  ...restProps
}) => {
  const rightElementRef = useRef<HTMLDivElement>(null);
  const [rightElementWidth, setRightelementWidth] = useState(0);

  useEffect(() => {
    if (rightElement && rightElementRef.current) {
      setRightelementWidth(
        rightElementRef.current.getBoundingClientRect().width + 1
      );
    }
  }, [rightElement]);

  return (
    <div
      className={clsx(
        'mvn-text-input',
        {
          'mvn-text-input-sm': size === 'sm',
          'mvn-text-input-lg': size === 'lg',
          'mvn-has-left-icon': !!icon,
          'mvn-has-right-icon': !!iconRight,
          'mvn-text-input-error': hasError
        },
        className
      )}
      style={style}
    >
      <label className="mvn-text-input-label">
        <input
          {...restProps}
          ref={forwardedRef}
          disabled={disabled}
          type={type}
          style={
            rightElement
              ? {
                  paddingRight: rightElementWidth
                }
              : undefined
          }
        />
        {icon && <Icon className="mvn-text-input-left-icon" icon={icon} />}
        {iconRight && (
          <Icon className="mvn-text-input-right-icon" icon={iconRight} />
        )}
        {rightElement && (
          <div ref={rightElementRef} className="mvn-text-input-right-element">
            {rightElement}
          </div>
        )}
      </label>
      {children ? (
        <Text color={hasError ? 'danger' : undefined}>{children}</Text>
      ) : null}
    </div>
  );
};

export const TextInputF = forwardRef<HTMLInputElement, AllTextInputProps>(
  (props, ref) => <TextInput {...props} forwardedRef={ref} />
);

export type AllTextInputProps = TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface TextInputProps {
  /** Wether input is disabled */
  disabled?: boolean;

  forwardedRef?: Ref<HTMLInputElement>;

  /** Wether input contains an error */
  hasError?: boolean;

  /** Icon for input */
  icon?: MaevenIcon;

  /** Icon for right side of input */
  iconRight?: MaevenIcon;

  /** Element to render on right side of input */
  rightElement?: JSX.Element;

  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}
