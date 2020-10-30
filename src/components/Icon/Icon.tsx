import clsx from 'clsx';
import React, {
  AllHTMLAttributes,
  createElement,
  DOMElement,
  forwardRef,
  HTMLAttributes
} from 'react';
import { Color, MaevenIcon } from '../../types';
import { Block } from '../Block';
import classes from './icon.module.scss';

/**
 * An Icon represents an action or concept in a visual way.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      children,
      className,
      fixedWidth = false,
      icon,
      size = '1em',
      style,
      title,
      ...props
    },
    ref
  ) => {
    const attrs = {
      role: 'img',
      'aria-label': title,
      alt: icon.tag === 'img' ? title : undefined,
      ...icon.attrs,
      className: clsx(
        classes.icon,
        {
          [classes.fw]: fixedWidth,
          [classes.stroke]: icon.tag === 'svg' && !!icon.attrs.stroke,
          [classes.fill]: icon.tag === 'svg' && !icon.attrs.stroke
        },
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
      <Block
        {...props}
        element="span"
        style={{ fontSize: size, ...style }}
        className={clsx(
          'mvn--icon',
          classes.container,
          {
            [classes['with-size']]: size !== '1em'
          },
          className
        )}
        ref={ref}
      >
        {renderChild({ ...icon, attrs })}
      </Block>
    );
  }
);

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

export interface IconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  children?: never;

  /** Color for icon. Defaults to current text color */
  color?: Color;

  /** Wether icon has a fixed width (same width as size) */
  fixedWidth?: boolean;

  /** Icon to render */
  icon: MaevenIcon;

  /** Size for the icon */
  size?: string | number;

  /** Icon title for native browser tooltip or voice assistant */
  title?: string;
}
