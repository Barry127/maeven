import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { ThemeColor } from '../../types';
import { Text } from '../Text';

import { classes, themeOverride } from './styles';
import { Circle } from './Circle';

/**
 * A spinner is visual indicator of an ongoing, user-initiated process.
 */
export const Spinner: FC<SpinnerProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  color,
  delay = 0,
  size = 'md',
  spinning = true,
  style,
  text,
  ...restProps
}) => {
  const [isSpinning, setSpinning] = useState(spinning);
  const theme = useTheme();

  useEffect(() => {
    if (spinning && delay > 0) {
      const to = setTimeout(() => {
        setSpinning(spinning);
      }, delay);
      return () => {
        clearTimeout(to);
      };
    }

    setSpinning(spinning);
    return;
  }, [spinning, delay]);

  const renderSpinner = useCallback(
    () => (
      <div
        className={clsx(
          classes.spinner,
          className,
          color && classes.color[color],
          {
            [classes.sm]: size === 'sm',
            [classes.md]: size === 'md',
            [classes.lg]: size === 'lg'
          },
          themeOverride(theme)
        )}
        style={typeof size === 'number' ? { ...style, fontSize: size } : style}
        {...restProps}
      >
        <Circle />
        {text && <Text className={classes.text}>{text}</Text>}
      </div>
    ),
    [className, color, size, style, text, theme, restProps]
  );

  return children ? (
    <div
      className={clsx(classes.container, { [classes.isSpinning]: isSpinning })}
    >
      <div className={classes.content}>{children}</div>
      {renderSpinner()}
    </div>
  ) : isSpinning ? (
    renderSpinner()
  ) : null;
};

export interface SpinnerProps {
  /** Color for spinner */
  color?: ThemeColor;

  /** Delay in ms before showing spinner after spinning is set to true */
  delay?: number;

  /** Size for spinner */
  size?: 'sm' | 'md' | 'lg' | number;

  /** Wether the Spinner is visually spinning  */
  spinning?: boolean;

  /** Loading text */
  text?: ReactNode;
}
