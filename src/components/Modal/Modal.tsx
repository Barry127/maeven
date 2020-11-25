import clsx from 'clsx';
import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { animated, config, SpringConfig, useTransition } from 'react-spring';
import { Spring } from 'react-spring/renderprops.cjs';
import useMeasure from 'react-use-measure';
import {
  close as closeIcon,
  maximize as maximizeIcon,
  minimize as minimizeIcon
} from '../../common/defaultIcons';
import { useTheme } from '../../hooks';
import { mergeRefs } from '../../lib/mergeRefs';
import { MaevenIcon } from '../../types';
import { Block } from '../Block';
import { ControlButton } from '../Button';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { createModalContainer, removeModalContainer } from './dom';
import { useCloseOnEscape, useFocusHandling } from './hooks';
import classes from './modal.module.scss';

const SIZE_MAP = {
  sm: 300,
  md: 576,
  lg: 864,
  xl: 1152
};

/**
 * A Model presents content over other parts of the UI.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      afterClose,
      afterOpen,
      children,
      className,
      closable = true,
      color,
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
      ...props
    },
    ref
  ) => {
    const { iconOverrides } = useTheme();
    const modalContainer = useMemo(() => createModalContainer(), []);
    const modalRef = useRef(null);
    const [maximized, setMaximized] = useState(false);
    const [containerRef, containerBounds] = useMeasure({
      debounce: 10,
      scroll: false
    });

    const maximize = useCallback(() => setMaximized(true), []);
    const minimize = useCallback(() => setMaximized(false), []);
    const width = typeof size === 'number' ? size : SIZE_MAP[size];

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

    const modalTransitions = useTransition(isOpen, null, {
      from: {
        opacity: 0.5,
        transform: 'translate3d(0, -50px, 0)',
        backdropFilter: 'blur(0px)'
      },
      enter: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        backdropFilter: 'blur(5px)'
      },
      leave: {
        opacity: 0,
        transform: 'translate3d(0, -10px, 0)',
        backdropFilter: 'blur(0px)'
      },
      config: isOpen
        ? springConfig || { tension: 180, friction: 15 }
        : config.stiff
    });

    if (!modalContainer) return null;

    return createPortal(
      modalTransitions.map(
        ({ item, key, props: styleProps }) =>
          item && (
            <animated.div
              className={classes.container}
              key={key}
              onClick={closable ? onClose : undefined}
              ref={containerRef}
              style={{ backdropFilter: styleProps.backdropFilter }}
            >
              <Spring
                from={{ height: 'auto', width }}
                to={{
                  height:
                    maximizable && maximized ? containerBounds.height : 'auto',
                  width:
                    maximizable && maximized ? containerBounds.width : width
                }}
              >
                {(springProps) => (
                  <animated.div
                    {...props}
                    className={clsx(
                      'mvn--modal',
                      classes.modal,
                      color && classes[color],
                      {
                        [classes['has-title']]: !!title,
                        [classes.maximized]: maximized
                      },
                      className
                    )}
                    onClick={stopPropagation}
                    ref={mergeRefs(modalRef, ref)}
                    style={{ ...style, ...styleProps, ...springProps }}
                  >
                    {title ? (
                      <Block
                        background="textBackground"
                        className={classes.title}
                        element="header"
                      >
                        <Heading color="inherit" level="h2" size="h3" truncate>
                          {icon && (
                            <Icon icon={icon} className={classes.icon} />
                          )}
                          {title}
                        </Heading>
                        {maximizable && (
                          <ControlButton
                            icon={
                              maximized
                                ? iconOverrides.minimize || minimizeIcon
                                : iconOverrides.maximize || maximizeIcon
                            }
                            onClick={maximized ? minimize : maximize}
                            aria-label={
                              maximized ? 'Restore modal' : 'Maximize modal'
                            }
                          />
                        )}
                        {closable && (
                          <ControlButton
                            icon={iconOverrides.close || closeIcon}
                            onClick={onClose}
                            aria-label="Close modal"
                          />
                        )}
                      </Block>
                    ) : null}
                    <Block
                      background="textBackground"
                      className={classes.content}
                    >
                      {children}
                    </Block>
                  </animated.div>
                )}
              </Spring>
            </animated.div>
          )
      ),
      modalContainer
    );
  }
);

const stopPropagation = (ev: MouseEvent<any>) => {
  ev.stopPropagation();
};

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Called when close animation is finished */
  afterClose?: () => void;

  /** Called when open animation is finished, (not on initial mount) */
  afterOpen?: () => void;

  /** Wether modal is closable by user */
  closable?: boolean;

  /** Type styling for Modal */
  color?: 'primary' | 'success' | 'warning' | 'danger';

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
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;

  /** Config for spring animation */
  springConfig?: SpringConfig;

  /** Modal title, the title bar is not rendered when no title */
  title?: ReactNode;
}
