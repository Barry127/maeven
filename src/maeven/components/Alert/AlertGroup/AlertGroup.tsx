import React, {
  FC,
  HTMLAttributes,
  useState,
  useCallback,
  cloneElement,
  useEffect,
  ReactElement,
  isValidElement
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../../hooks/useTheme';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { chevronLeft, chevronRight } from '../../../common/defaultIcons';

import { Alert } from '../Alert/Alert';
import { classes, themeOverride } from './styles';

/**
 * AlertGroup groups several Alerts in one group.
 */
export const AlertGroup: FC<AlertGroupProps &
  HTMLAttributes<HTMLDivElement>> = ({ children, className, ...restProps }) => {
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
            child.type === Alert && child.props?.isOpen !== false
        )
    );
  }, [children]);

  const theme = useTheme();

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
      className={clsx(
        classes.alertGroup,
        {
          [classes.danger]: currentAlert.props.type === 'danger',
          [classes.info]:
            currentAlert.props.type === 'info' ||
            currentAlert.props.type === undefined,
          [classes.success]: currentAlert.props.type === 'success',
          [classes.warning]: currentAlert.props.type === 'warning'
        },
        themeOverride(theme),
        className
      )}
      {...restProps}
    >
      {alerts.length > 1 && (
        <Text className={classes.nav}>
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

export interface AlertGroupProps {}
