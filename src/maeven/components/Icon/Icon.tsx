import React, {
  FC,
  HTMLAttributes,
  DOMElement,
  AllHTMLAttributes,
  createElement
} from 'react';
import clsx from 'clsx';
import { style } from 'typestyle';

import { useTheme } from '../../hooks/useTheme';
import { ThemeColor, MaevenIcon } from '../../types';

import { classes, themeOverride } from './styles';

/**
 * An Icon represents an action or concept in a visual way.
 */
export const Icon: FC<IconProps & HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  color,
  fixedWidth = false,
  icon,
  inverted = false,
  size = '1em',
  style: cssStyle,
  title,
  ...restProps
}) => {
  const theme = useTheme();

  const attrs = {
    role: 'img',
    'aria-label': title,
    alt: icon.tag === 'img' ? title : undefined,
    ...icon.attrs,
    className: clsx(
      classes.icon,
      { [classes.fixedWidth]: fixedWidth },
      icon.tag === 'svg' &&
        style({
          fill: icon.attrs.stroke
            ? 'none'
            : inverted
            ? 'var(--maeven-color-text-inverted)'
            : color
            ? `var(--maeven-color-${color
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase()})`
            : 'currentColor',
          stroke: icon.attrs.stroke
            ? inverted
              ? 'var(--maeven-color-text-inverted)'
              : color
              ? `var(--maeven-color-${color
                  .replace(/([a-z])([A-Z])/g, '$1-$2')
                  .toLowerCase()})`
              : 'currentColor'
            : 'none'
        }),
      icon.attrs.className
    )
  };

  delete attrs.height;
  delete attrs.width;

  if (
    icon.tag === 'svg' &&
    title &&
    Array.isArray(icon.children) &&
    icon.children.filter(({ tag }) => tag === 'desc').length === 0
  ) {
    icon.children = [
      { tag: 'desc', attrs: {}, children: title },
      ...icon.children
    ];
  }

  return (
    <span
      className={clsx(
        classes.container,
        size !== '1em' && classes.size(size),
        inverted && classes.containerInverted(color),
        themeOverride(theme),
        className
      )}
      style={{
        fontSize: size,
        ...cssStyle
      }}
      {...restProps}
    >
      {renderChild({ ...icon, attrs })}
    </span>
  );
};

export interface IconProps {
  children?: never;

  /** Color for icon. Defaults to current text color */
  color?: ThemeColor;

  /** Wether icon has a fixed width (same width as size) */
  fixedWidth?: boolean;

  /** Icon to render */
  icon: MaevenIcon;

  /** Invert icon colors */
  inverted?: boolean;

  /** Size for the icon */
  size?: string | number;

  /** Icon title for native browser tooltip or voice assistent */
  title?: string;
}

function renderChild(
  { tag, attrs, children }: MaevenIcon,
  index?: number
): DOMElement<AllHTMLAttributes<Element>, Element> {
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
