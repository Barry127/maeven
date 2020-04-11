import React, {
  FC,
  HTMLAttributes,
  useState,
  useCallback,
  cloneElement,
  useEffect,
  ReactElement,
  isValidElement,
  Ref,
  forwardRef
} from 'react';
import clsx from 'clsx';

import { Text } from '../../Text';
import { Button } from '../../Button';
import { chevronLeft, chevronRight } from '../../../common/defaultIcons';

import { Alert, AlertF } from '../Alert/Alert';

/**
 * AlertGroup groups several Alerts in one group.
 */
export const AlertGroup: FC<AllAlertGroupProps> = ({
  children,
  className,
  forwardedRef,
  ...restProps
}) => {
  const [index, setIndex] = useState(0);
  const [alerts, setAlerts] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (!children) setAlerts([]);

    const childrenArray = Array.isArray(children) ? children : [children];

    setAlerts(
      childrenArray
        .filter(isValidElement)
        .filter(
          (child: ReactElement<any>) =>
            (child.type === Alert || child.type === AlertF) &&
            child.props?.isOpen !== false
        )
    );
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
      {...restProps}
      className={clsx(
        'mvn-alert-group',
        `mvn-alert-group-${currentAlert.props.type || 'info'}`,
        className
      )}
      ref={forwardedRef}
    >
      {alerts.length > 1 && (
        <Text className="mvn-alert-group-nav">
          <Button
            buttonType="link"
            onClick={prev}
            icon={chevronLeft}
            aria-label="Previous Alert"
          />
          <Text>
            {currentIndex + 1} / {alerts.length}
          </Text>
          <Button
            buttonType="link"
            onClick={next}
            icon={chevronRight}
            aria-label="Next Alert"
          />
        </Text>
      )}
      {cloneElement(currentAlert, {
        closable: true,
        springConfig: { duration: 1 }
      })}
    </div>
  );
};

export const AlertGroupF = forwardRef<HTMLDivElement, AllAlertGroupProps>(
  (props, ref) => <AlertGroup {...props} forwardedRef={ref} />
);

type AllAlertGroupProps = AlertGroupProps & HTMLAttributes<HTMLDivElement>;

export interface AlertGroupProps {
  forwardedRef?: Ref<HTMLDivElement>;
}
