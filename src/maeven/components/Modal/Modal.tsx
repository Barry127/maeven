import React, {
  FC,
  HTMLAttributes,
  SyntheticEvent,
  ReactNode,
  useRef,
  useEffect,
  RefObject,
  useState,
  useCallback,
  MouseEvent,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { SpringConfig, useTransition, animated, config } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import useMeasure from 'react-use-measure';

import { useTheme } from '../../hooks/useTheme';
import { MaevenIcon } from '../../types';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import {
  close,
  maximize as maximizeIcon,
  minimize as minimizeIcon
} from '../../common/defaultIcons';

import { classes, themeOverride } from './styles';
import { createModalContainer, removeModalContainer } from './dom';
import { useCloseOnEscape, useFocusHandling } from './hooks';

const stopPropagation = (ev: MouseEvent<any>) => {
  ev.stopPropagation();
};

const SIZE_MAP = {
  sm: 300,
  md: 576,
  lg: 864,
  xl: 1152
};

/**
 * A Model presents content over other parts of the UI.
 */
export const Modal: FC<ModalProps & HTMLAttributes<HTMLDivElement>> = ({
  afterClose,
  afterOpen,
  children,
  className,
  closable = true,
  focusAfterClose,
  focusAfterOpen,
  icon,
  isOpen,
  maximizable = false,
  onClose,
  size = 'md',
  springConfig,
  style,
  title,
  type,
  ...restProps
}) => {
  const theme = useTheme();
  const modalContainer = useMemo(() => createModalContainer(), []);
  const modalRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const [containerRef, containerBounds] = useMeasure({
    debounce: 10,
    scroll: false
  });

  const maximize = useCallback(() => setMaximized(true), []);
  const restore = useCallback(() => setMaximized(false), []);

  useFocusHandling({
    focusAfterClose,
    focusAfterOpen: focusAfterOpen || modalRef,
    isOpen
  });
  useCloseOnEscape({ closable, isOpen, onClose });

  useEffect(() => {
    return () => {
      removeModalContainer(modalContainer);
    };
  }, [modalContainer]);

  const modalTransition = useTransition(isOpen, null, {
    from: {
      opacity: 0.5,
      transform: `translate3d(0, -50px, 0)`,
      backdropFilter: 'blur(0px)'
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      backdropFilter: 'blur(5px)'
    },
    leave: {
      opacity: 0,
      transform: `translate3d(0, -10px, 0)`,
      backdropFilter: 'blur(0px)'
    },
    config: isOpen
      ? springConfig || { tension: 180, friction: 15 }
      : config.stiff
  });

  return createPortal(
    modalTransition.map(
      ({ item, key, props }) =>
        item && (
          <animated.div
            key={key}
            className={classes.container}
            onClick={closable ? onClose : undefined}
            ref={containerRef}
            style={{
              backdropFilter: props.backdropFilter
            }}
          >
            <ThemeProvider theme={theme}>
              <Spring
                from={{ height: 'auto', width: SIZE_MAP[size] }}
                to={{
                  height:
                    maximizable && maximized ? containerBounds.height : 'auto',
                  width:
                    maximizable && maximized
                      ? containerBounds.width
                      : SIZE_MAP[size]
                }}
              >
                {springProps => (
                  <animated.div
                    className={clsx(
                      classes.modal,
                      {
                        [classes.hasTitle]: !!title,
                        [classes.isMaximized]: maximized
                      },
                      type && classes.type[type],
                      themeOverride(theme),
                      className
                    )}
                    onClick={stopPropagation}
                    ref={modalRef}
                    style={{
                      ...style,
                      ...props,
                      ...springProps,
                      backdropFilter: 'none'
                    }}
                    {...restProps}
                  >
                    {title ? (
                      <div className={classes.title}>
                        <Heading level="h3" size="h4">
                          {icon && (
                            <Icon icon={icon} className={classes.icon} />
                          )}
                          {title}
                        </Heading>
                        {maximizable && (
                          <Button
                            buttonType="link"
                            onClick={maximized ? restore : maximize}
                            icon={
                              maximized
                                ? theme.iconOverrides?.minimize || minimizeIcon
                                : theme.iconOverrides?.maximize || maximizeIcon
                            }
                            className={classes.button}
                            aria-label={
                              maximized ? 'Restore modal' : 'Maximize modal'
                            }
                          />
                        )}
                        {closable && (
                          <Button
                            buttonType="link"
                            onClick={onClose}
                            icon={theme.iconOverrides?.close || close}
                            className={classes.button}
                            aria-label="Close"
                          />
                        )}
                      </div>
                    ) : null}
                    <div className={classes.content}>{children}</div>
                  </animated.div>
                )}
              </Spring>
            </ThemeProvider>
          </animated.div>
        )
    ),
    modalContainer
  );
};

export interface ModalProps {
  /** Called when close animation is finished */
  afterClose?: () => void;

  /** Called when open animation is finished, (not on initial mount) */
  afterOpen?: () => void;

  /** Wether modal is closable by user */
  closable?: boolean;

  /** Ref of element to focus after close, defaults to element that was focussed when opening the modal */
  focusAfterClose?: RefObject<any>;

  /** Ref of element to focus after opening the modal, defaults to the modal itself */
  focusAfterOpen?: RefObject<any>;

  /** Icon to render in title */
  icon?: MaevenIcon;

  /** Wether the modal is open */
  isOpen: boolean;

  /** Wether the modal is maximizable */
  maximizable?: boolean;

  /** Function to handle close. The Modal does not close by itself because it is a controlled component controlled by isOpen. */
  onClose?: (ev: SyntheticEvent<HTMLElement> | Event) => void;

  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Config for spring animation */
  springConfig?: SpringConfig;

  /** Modal title, the title bar is not rendered when no title */
  title?: ReactNode;

  /** Type styling for Modal */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}
