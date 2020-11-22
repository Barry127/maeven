import clsx from 'clsx';
import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useState
} from 'react';
import { animated, config, SpringConfig, useTransition } from 'react-spring';
import {
  close,
  danger,
  info,
  success,
  warning
} from '../../../common/defaultIcons';
import { useTheme } from '../../../hooks';
import { MaevenIcon } from '../../../types';
import { Block } from '../../Block';
import { ControlButton } from '../../Button';
import { Icon } from '../../Icon';
import classes from './alert.module.scss';

/**
 * Alerts are banners that communicate a message with a severity attached to it. They grab the user’s attention to provide critical information needed in context.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    const [isOpenState, setOpen] = useState(true);
    const { iconOverrides } = useTheme();

    const onClose = useCallback(
      (ev: MouseEvent<HTMLButtonElement>) => {
        if (typeof propsOnClose === 'function') {
          propsOnClose(ev);
        }
        if (ev.defaultPrevented) return;
        setOpen(false);
      },
      [propsOnClose]
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
        onDestroyed: (isDestroyed) =>
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

    const icons = {
      close: iconOverrides.close || close,
      danger: iconOverrides.danger || danger,
      info: iconOverrides.info || info,
      success: iconOverrides.success || success,
      warning: iconOverrides.warning || warning
    };

    return (
      <>
        {transitions.map(
          ({ item, key, props: styleProps }) =>
            item && (
              <animated.div
                {...props}
                className={clsx(
                  'mvn--alert',
                  classes.alert,
                  classes[type],
                  {
                    [classes.closable]: closable
                  },
                  className
                )}
                key={key}
                ref={ref}
                role="alert"
                style={{ ...style, ...styleProps }}
                aria-live="assertive"
              >
                {showIcon && (
                  <div
                    className={clsx(classes.icon, { [classes.h5]: !!title })}
                  >
                    <Icon icon={icon ? icon : icons[type]} />
                  </div>
                )}
                <Block className={classes.content}>
                  {title && (
                    <strong className={clsx(classes.title, classes.h5)}>
                      {title}
                    </strong>
                  )}
                  {children}
                </Block>
                {closable && (
                  <div className={classes.close}>
                    <ControlButton
                      icon={icons.close}
                      onClick={onClose}
                      aria-label="Close"
                    />
                  </div>
                )}
              </animated.div>
            )
        )}
      </>
    );
  }
);

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
