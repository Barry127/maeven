import clsx from 'clsx';
import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { chevronLeft, chevronRight } from '../../../common/defaultIcons';
import { useTheme } from '../../../hooks';
import { Block } from '../../Block';
import { ControlButton } from '../../Button';
import { Alert } from '../Alert';
import classes from './alert-group.module.scss';

/**
 * AlertGroup groups several Alerts in one group.
 */
export const AlertGroup = forwardRef<HTMLDivElement, AlertGroupProps>(
  ({ children, className, ...props }, ref) => {
    const { iconOverrides } = useTheme();
    const [index, setIndex] = useState(0);
    const [alerts, setAlerts] = useState<ReactElement[]>([]);

    useEffect(() => {
      if (!children) {
        setAlerts([]);
      } else {
        const childrenArray = Array.isArray(children) ? children : [children];

        setAlerts(
          childrenArray
            .filter(isValidElement)
            .filter(
              (child: ReactElement<any>) =>
                child.type === Alert && child.props.isOpen !== false
            )
        );
      }
    }, [children]);

    const next = useCallback(() => {
      const currentIndex = Math.min(index, alerts.length - 1);
      setIndex((currentIndex + 1) % alerts.length);
    }, [alerts, index]);

    const prev = useCallback(() => {
      const currentIndex = Math.min(index, alerts.length - 1);
      setIndex((currentIndex + alerts.length - 1) % alerts.length);
    }, [alerts, index]);

    if (alerts.length === 0) return null;

    const currentIndex = Math.min(index, alerts.length - 1);
    const currentAlert = alerts[currentIndex];

    return (
      <div
        {...props}
        className={clsx(
          'mvn--alert-group',
          classes.group,
          classes[currentAlert.props.type || 'info'],
          className
        )}
        ref={ref}
      >
        {alerts.length > 1 && (
          <Block className={classes.nav}>
            <ControlButton
              icon={iconOverrides.chevronLeft || chevronLeft}
              onClick={prev}
              aria-label="Previous Alert"
            />
            <Block>
              {currentIndex + 1} / {alerts.length}
            </Block>
            <ControlButton
              icon={iconOverrides.chevronRight || chevronRight}
              onClick={next}
              aria-label="Next Alert"
            />
          </Block>
        )}
        {cloneElement(currentAlert, {
          closable: true,
          springConfig: { duration: 1 }
        })}
      </div>
    );
  }
);

export interface AlertGroupProps extends HTMLAttributes<HTMLDivElement> {}
