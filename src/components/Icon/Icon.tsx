import React, {
  FC,
  HTMLAttributes,
  createElement,
  DOMElement,
  AllHTMLAttributes
} from 'react';
import clsx from 'clsx';

import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../themes/types';
import { IconType } from '../types';

import { iconStyles } from './styles';

/**
 * An Icon represents an action or concept in a visual way.
 */
export const Icon: FC<IconProps & HTMLAttributes<HTMLSpanElement>> = props => {
  const theme = useTheme();
  const { classes } = iconStyles(theme, props);

  const {
    children,
    className,
    color,
    fixedWidth,
    icon,
    inverted,
    size,
    title,
    ...restProps
  } = props;

  const attrs = Object.assign(
    {
      role: 'icon',
      'aria-label': title,
      alt: (icon.tag === 'img' && title) || undefined
    },
    {
      ...icon.attrs,
      className: clsx(classes.icon, icon.attrs.className)
    }
  );

  delete attrs.height;
  delete attrs.width;

  if (
    icon.tag === 'svg' &&
    Array.isArray(icon.children) &&
    title &&
    icon.children.filter(({ tag }) => tag === 'desc').length === 0
  ) {
    icon.children = [
      { tag: 'desc', attrs: {}, children: title },
      ...icon.children
    ];
  }

  return (
    <span
      title={title}
      className={clsx(classes.span, className)}
      {...restProps}
    >
      {renderChild({ ...icon, attrs })}
    </span>
  );
};

Icon.defaultProps = {
  fixedWidth: false,
  inverted: false,
  size: '1em'
};

function renderChild(
  { tag, attrs, children }: IconType,
  index?: number
): DOMElement<AllHTMLAttributes<Element>, Element> {
  delete attrs.fill;

  return createElement(tag, {
    ...attrs,
    key: index,
    children: children
      ? typeof children === 'string'
        ? children
        : children.map(renderChild)
      : attrs.children
  });
}

export interface IconProps {
  children?: never;

  /** Color for icon. Defaults to current text color */
  color?: keyof Theme['colors']['name'] | keyof Theme['colors']['semantic'];

  /** Wether icon has a fixed width (same width as size) */
  fixedWidth?: boolean;

  /** Icon to render */
  icon: IconType;

  //** Invert icon colors */
  inverted?: boolean;

  /** Size for the icon */
  size?: string | number;

  /** Icon title for native browser tooltip or voice assistent */
  title?: string;
}
