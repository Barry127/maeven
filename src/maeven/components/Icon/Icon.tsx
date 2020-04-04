import React, {
  FC,
  HTMLAttributes,
  DOMElement,
  AllHTMLAttributes,
  createElement,
  Ref,
  forwardRef
} from 'react';
import clsx from 'clsx';

import { Block } from '../Block/Block';
import { MaevenIcon, Color } from '../../types';

/**
 * An Icon represents an action or concept in a visual way.
 */
export const Icon: FC<AllIconProps> = ({
  children,
  className,
  color,
  fixedWidth = false,
  icon,
  size = '1em',
  style,
  title,
  ...restProps
}) => {
  const attrs = {
    role: 'img',
    'aria-label': title,
    alt: icon.tag === 'img' ? title : undefined,
    ...icon.attrs,
    className: clsx(
      'mvn-icon',
      {
        'mvn-icon-fw': fixedWidth,
        'mvn-icon-stroke': icon.tag === 'svg' && !!icon.attrs.stroke,
        'mvn-icon-fill': icon.tag === 'svg' && !icon.attrs.stroke
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
      {...restProps}
      element="span"
      textColor={color}
      style={{
        fontSize: size,
        ...style
      }}
      className={clsx(
        'mvn-icon-container',
        size !== '1em' && 'mvn-icon-with-size',
        className
      )}
    >
      {renderChild({ ...icon, attrs })}
    </Block>
  );
};

export const IconF = forwardRef<HTMLSpanElement, AllIconProps>((props, ref) => (
  <Icon {...props} forwardedRef={ref} />
));

type AllIconProps = IconProps & HTMLAttributes<HTMLSpanElement>;

export interface IconProps {
  children?: never;

  /** Color for icon. Defaults to current text color */
  color?: Color;

  /** Wether icon has a fixed width (same width as size) */
  fixedWidth?: boolean;

  forwardedRef?: Ref<HTMLSpanElement>;

  /** Icon to render */
  icon: MaevenIcon;

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
