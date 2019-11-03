import React, {
  useCallback,
  useState,
  KeyboardEvent,
  FocusEvent,
  HTMLAttributes,
  MouseEvent as SyntheticMouseEvent
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { ClassNamesDictionary } from '../../common/styleHelpers';

import { Icon } from '../Icon';

import { ButtonProps } from './Button';
import { buttonStyles, ButtonType } from './styles';

export function renderChildren(
  props: ButtonProps & HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
  classes: ClassNamesDictionary
) {
  const { children, icon, iconRight } = props;
  return (
    <>
      {icon && <Icon icon={icon} className={classes.iconLeft} />}
      {children && <span className={classes.text}>{children}</span>}
      {iconRight && <Icon icon={iconRight} className={classes.iconRight} />}
    </>
  );
}

export function useButton<P extends HTMLAttributes<any>, T>(
  props: ButtonProps & P,
  buttonType: ButtonType
) {
  const [focusOutline, setFocusOutline] = useState(
    //@ts-ignore
    props.autoFocus ? true : false
  );
  const theme = useTheme();
  const { classes } = buttonStyles(theme, props, buttonType);

  const {
    active,
    className,
    children,
    color,
    fluid,
    icon,
    link,
    onBlur,
    onKeyUp,
    onMouseDown,
    outline,
    iconRight,
    size,
    ...restProps
  } = props;

  const _onKeyUp = useCallback(
    (ev: KeyboardEvent<T>) => {
      if (ev.keyCode === 9) {
        setFocusOutline(true);
      }
      if (typeof onKeyUp === 'function') {
        onKeyUp(ev);
      }
    },
    [onKeyUp]
  );

  const _onBlur = useCallback(
    (ev: FocusEvent<T>) => {
      if (focusOutline) {
        setFocusOutline(false);
      }
      if (typeof onBlur === 'function') {
        onBlur(ev);
      }
    },
    [focusOutline, onBlur]
  );

  const _onMouseDown = useCallback(
    (ev: SyntheticMouseEvent<T>) => {
      if (focusOutline) {
        setFocusOutline(false);
      }
      if (typeof onMouseDown === 'function') {
        onMouseDown(ev);
      }
    },
    [focusOutline, onMouseDown]
  );

  return {
    props: {
      ...restProps,
      className: clsx(
        classes.button,
        focusOutline && classes.focusOutline,
        className
      ),
      onBlur: _onBlur,
      onMouseDown: _onMouseDown,
      onKeyUp: _onKeyUp
    },
    classes
  };
}
