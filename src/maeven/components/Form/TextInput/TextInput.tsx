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

import { useTheme } from '../../../hooks/useTheme';
import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';

import { classes, themeOverride } from './styles';

/**
 * Inputs are the most commonly used form controls and allow for text input.
 */
export const TextInput: FC<TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> = ({
  children,
  className,
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
  const theme = useTheme();
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
        classes.container,
        {
          [classes.sm]: size === 'sm',
          [classes.lg]: size === 'lg',
          [classes.hasLeftIcon]: !!icon,
          [classes.hasRightIcon]: !!iconRight,
          [classes.hasError]: hasError
        },
        themeOverride(theme),
        className
      )}
      style={style}
    >
      <label className={classes.label}>
        <input
          ref={forwardedRef}
          className={classes.input}
          type={type}
          style={
            rightElement
              ? {
                  paddingRight: rightElementWidth
                }
              : undefined
          }
          {...restProps}
        />
        {icon && <Icon className={classes.leftIcon} icon={icon} />}
        {iconRight && <Icon className={classes.rightIcon} icon={iconRight} />}
        {rightElement && (
          <div ref={rightElementRef} className={classes.rightElement}>
            {rightElement}
          </div>
        )}
      </label>
      {children ? <Text>{children}</Text> : null}
    </div>
  );
};

export const TextInputForwardRef = forwardRef<
  HTMLInputElement,
  TextInputProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <TextInput {...props} forwardedRef={ref} />);

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
