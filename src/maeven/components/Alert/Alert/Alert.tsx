import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useState,
  useCallback
} from 'react';
import clsx from 'clsx';
import { animated, useTransition, config, SpringConfig } from 'react-spring';

import { useTheme } from '../../../hooks/useTheme';
import { MaevenIcon } from '../../../types';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { Button } from '../../Button';
import {
  close,
  danger,
  info,
  success,
  warning
} from '../../../common/defaultIcons';

import { classes, themeOverride } from './styles';

/**
 * Alerts are banners that communicate a message with a severity attached to it. They grab the user’s attention to provide critical information needed in context.
 */
export const Alert: FC<AlertProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'>> = ({
  afterClose,
  afterOpen,
  animateOnOpen = false,
  children,
  className,
  closable = true,
  icon,
  isOpen,
  onClose: propsOnClose,
  showIcon = true,
  springConfig,
  style,
  title,
  type = 'info',
  ...restProps
}) => {
  const [isOpenState, setOpen] = useState(true);
  const theme = useTheme();

  const onClose = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      if (typeof propsOnClose === 'function') propsOnClose(ev);
      if (ev.defaultPrevented) return;
      setOpen(false);
    },
    [propsOnClose, setOpen]
  );

  const transitions = useTransition(
    isOpen !== undefined ? isOpen : isOpenState,
    null,
    {
      from: animateOnOpen
        ? { opacity: 0, transform: 'scale(0.5)' }
        : { opacity: 1, transform: 'scale(1)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.5)' },
      onDestroyed: isDestroyed =>
        isDestroyed
          ? typeof afterClose === 'function'
            ? afterClose()
            : undefined
          : typeof afterOpen === 'function'
          ? afterOpen()
          : undefined,
      config: springConfig || config.stiff
    }
  );

  const defaultIcons = {
    danger: theme.iconOverrides?.danger || danger,
    info: theme.iconOverrides?.info || info,
    success: theme.iconOverrides?.success || success,
    warning: theme.iconOverrides?.warning || warning
  };

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className={clsx(
                classes.alert,
                classes[type],
                themeOverride(theme),
                className
              )}
              key={key}
              style={{ ...style, ...props }}
              aria-live="assertive"
              role="alert"
              {...restProps}
            >
              {showIcon && (
                <div
                  className={clsx(classes.iconContainer, {
                    [classes.title]: !!title
                  })}
                >
                  <Icon
                    className={classes.icon}
                    icon={icon ? icon : defaultIcons[type]}
                  />
                </div>
              )}
              <Text className={classes.content}>
                {title && <strong className={classes.title}>{title}</strong>}
                {children}
              </Text>
              {closable && (
                <div className={classes.closeContainer}>
                  <Button
                    buttonType="link"
                    onClick={onClose}
                    icon={theme.iconOverrides?.close || close}
                    className={classes.close}
                    aria-label="Close"
                  />
                </div>
              )}
            </animated.div>
          )
      )}
    </>
  );
};

export interface AlertProps {
  /** Called when close animation is finished, use this method to remove alert from state */
  afterClose?: () => void;

  /** Called when open animation is finished, (not on initial mount) */
  afterOpen?: () => void;

  /** Wether opening the alert and the first render should be animated */
  animateOnOpen?: boolean;

  /** Wether Alert is closable */
  closable?: boolean;

  /** Icon to render, defaults to default icon for alert type */
  icon?: MaevenIcon;

  /** When isOpen is set, the Alert becomes controlled and does not close by itself */
  isOpen?: boolean;

  /** Called when close button is clicked. Can prevent closing with ev.preventDefault() */
  onClose?: (ev: MouseEvent<HTMLButtonElement>) => void;

  /** Wether to show an icon */
  showIcon?: boolean;

  /** config for spring animation */
  springConfig?: SpringConfig;

  /** Alert title */
  title?: ReactNode;

  /** Type styling for Alert */
  type?: 'success' | 'info' | 'warning' | 'danger';
}
