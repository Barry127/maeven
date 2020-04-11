import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useState,
  useCallback,
  Ref,
  forwardRef
} from 'react';
import clsx from 'clsx';
import { animated, useTransition, config, SpringConfig } from 'react-spring';

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

/**
 * Alerts are banners that communicate a message with a severity attached to it. They grab the user’s attention to provide critical information needed in context.
 */
export const Alert: FC<AllAlertProps> = ({
  afterClose,
  afterOpen,
  animateOnOpen = false,
  children,
  className,
  closable = true,
  forwardedRef,
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

  const defaultIcons = { danger, info, success, warning };

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className={clsx(
                'mvn-alert',
                `mvn-alert-${type}`,
                { 'mvn-alert-closable': closable },
                className
              )}
              key={key}
              style={{ ...style, ...props }}
              aria-live="assertive"
              role="alert"
              ref={forwardedRef}
              {...restProps}
            >
              {showIcon && (
                <div
                  className={clsx('mvn-alert-icon', {
                    'mvn-h4': !!title
                  })}
                >
                  <Icon icon={icon ? icon : defaultIcons[type]} />
                </div>
              )}
              <Text className="mvn-alert-content">
                {title && (
                  <strong className="mvn-h4 mvn-alert-title">{title}</strong>
                )}
                {children}
              </Text>
              {closable && (
                <div className="mvn-alert-close">
                  <Button
                    buttonType="link"
                    onClick={onClose}
                    icon={close}
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

export const AlertF = forwardRef<HTMLDivElement, AllAlertProps>(
  (props, ref) => <Alert {...props} forwardedRef={ref} />
);

type AllAlertProps = AlertProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface AlertProps {
  /** Called when close animation is finished, use this method to remove alert from state */
  afterClose?: () => void;

  /** Called when open animation is finished, (not on initial mount) */
  afterOpen?: () => void;

  /** Wether opening the alert and the first render should be animated */
  animateOnOpen?: boolean;

  /** Wether Alert is closable */
  closable?: boolean;

  forwardedRef?: Ref<HTMLDivElement>;

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
