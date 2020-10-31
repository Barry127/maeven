import clsx from 'clsx';
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { Color } from '../../types';
import { Block } from '../Block';
import classes from './spinner.module.scss';

/**
 * A spinner is visual indicator of an ongoing, user-initiated process.
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      children,
      className,
      delay = 0,
      size = '1.5em',
      spinning = true,
      style,
      text,
      ...props
    },
    ref
  ) => {
    const [isSpinning, setSpinning] = useState(spinning);

    useEffect(() => {
      if (spinning && delay > 0) {
        const to = setTimeout(() => {
          setSpinning(true);
        }, delay);
        return () => clearTimeout(to);
      }

      setSpinning(spinning);
    }, [delay, spinning]);

    const renderSpinner = useCallback(
      () => (
        <Block
          {...props}
          className={clsx('mvn--spinner', classes.spinner, className)}
          style={{ fontSize: size, ...style }}
          ref={ref}
        >
          <svg
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.circle}
            role="img"
            aria-label="Loading`"
          >
            <circle cx="20" cy="20" r="18" />
          </svg>
          {text && (
            <Block element={children ? 'div' : 'span'} className={classes.text}>
              {text}
            </Block>
          )}
        </Block>
      ),
      [children, className, props, ref, size, style, text]
    );

    const spinnerTransitions = useTransition(isSpinning, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 }
    });

    const contentStyle = useSpring({
      opacity: isSpinning ? 0.3 : 1,
      filter: isSpinning ? 'blur(1px)' : 'blur(0px)'
    });

    return children ? (
      <div className={classes.container}>
        <animated.div className={classes.content} style={contentStyle}>
          {children}
        </animated.div>
        {spinnerTransitions.map(
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
  }
);

export interface SpinnerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Color for spinner */
  color?: Color | 'inherit';

  /** Delay in ms before showing spinner after spinning is set to true */
  delay?: number;

  /** Size for spinner */
  size?: number | string;

  /** Wether the Spinner is visually spinning  */
  spinning?: boolean;

  /** Loading text */
  text?: ReactNode;
}
