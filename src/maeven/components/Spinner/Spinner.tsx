import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useState,
  useCallback,
  useEffect
} from 'react';
import clsx from 'clsx';
import { useTransition, useSpring, animated } from 'react-spring';

import { Color } from '../../types';
import { Text } from '../Text';

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
  const isSizeNumber = typeof size === 'number';

  // useEffect(() => {
  //   setSpinning(spinning);
  // }, [spinning]);

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
          'mvn-spinner',
          !isSizeNumber && `mvn-spinner-${size}`,
          color && `mvn-text-color-${color}`,
          className
        )}
        style={isSizeNumber ? { ...style, fontSize: size } : style}
        {...restProps}
      >
        <Circle />
        {text && (
          <Text inline={!children} className="mvn-spinner-text">
            {text}
          </Text>
        )}
      </div>
    ),
    [children, className, color, isSizeNumber, size, style, text, restProps]
  );

  const spinnerTransition = useTransition(isSpinning, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const contentStyle = useSpring({
    opacity: isSpinning ? 0.3 : 1,
    filter: isSpinning ? 'blur(1px)' : 'blur(0px)'
  });

  return children ? (
    <div className="mvn-spinner-container">
      <animated.div className="mvn-spinner-content" style={contentStyle}>
        {children}
      </animated.div>
      {spinnerTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {renderSpinner()}
            </animated.div>
          )
      )}
    </div>
  ) : isSpinning ? (
    renderSpinner()
  ) : null;
};

export interface SpinnerProps {
  /** Color for spinner */
  color?: Color;

  /** Delay in ms before showing spinner after spinning is set to true */
  delay?: number;

  /** Size for spinner */
  size?: 'sm' | 'md' | 'lg' | number;

  /** Wether the Spinner is visually spinning  */
  spinning?: boolean;

  /** Loading text */
  text?: ReactNode;
}
