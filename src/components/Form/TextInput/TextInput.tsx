import clsx from 'clsx';
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import { useId } from '../../../hooks';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { Icon } from '../../Icon';
import { Spinner } from '../../Spinner';
import { OptionalField } from '../Form';
import classes from './text-input.module.scss';

/**
 * Inputs are the most commonly used form controls and allow for text input.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      children,
      className,
      disabled = false,
      hasError = false,
      icon,
      iconRight,
      label,
      loading = false,
      rightElement,
      size = 'md',
      style,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const rightElementRef = useRef<HTMLDivElement>(null);
    const [rightElementWidth, setRightElementWidth] = useState(0);
    const id = useId(props);
    const labelId = useId();

    useEffect(() => {
      if (rightElement && rightElementRef.current) {
        setRightElementWidth(
          rightElementRef.current.getBoundingClientRect().width
        );
      }
    }, [rightElement]);

    return (
      <OptionalField
        hasError={hasError}
        htmlFor={id}
        label={label}
        labelId={labelId}
        size={size}
      >
        <div
          className={clsx(
            'mvn--text-input',
            classes.container,
            classes[size],
            {
              [classes['has-left-icon']]: !!icon,
              [classes['has-right-icon']]: !!iconRight || loading,
              [classes['has-error']]: hasError
            },
            className
          )}
          style={style}
        >
          <label className={classes.label}>
            <input
              {...props}
              className={classes.input}
              disabled={disabled}
              id={id}
              ref={ref}
              style={
                rightElement
                  ? {
                      paddingRight: `calc(${paddings[size]} / 2 + ${rightElementWidth}px)`
                    }
                  : undefined
              }
              type={type}
            />
            {icon && (
              <Icon className={clsx(classes.icon, classes.left)} icon={icon} />
            )}
            {iconRight && !loading && (
              <Icon
                className={clsx(classes.icon, classes.right)}
                icon={iconRight}
              />
            )}
            {loading && <Spinner size="1em" className={classes.spinner} />}
            {rightElement && (
              <div ref={rightElementRef} className={classes['right-element']}>
                {rightElement}
              </div>
            )}
          </label>
          {children ? <Block className={classes.text}>{children}</Block> : null}
        </div>
      </OptionalField>
    );
  }
);

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Wether input is disabled */
  disabled?: boolean;

  /** Wether input contains an error */
  hasError?: boolean;

  /** Icon for input */
  icon?: MaevenIcon;

  /** Icon for right side of input */
  iconRight?: MaevenIcon;

  /** Label text */
  label?: ReactNode;

  /** Wether button has loading state */
  loading?: boolean;

  /** Element to render on right side of input */
  rightElement?: JSX.Element;

  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: '0.8rem',
  md: '1.2rem',
  lg: '1.8rem'
};
