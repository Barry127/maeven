import React, { FC, AllHTMLAttributes, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import {
  InstrinctElement,
  ReactComponent,
  Color,
  BackgroundColor
} from '../../types';

/**
 * A Block is a low level component with sensible theme default styling.
 */
export const Block: FC<AllBlockProps> = ({
  background,
  children,
  className,
  component,
  element = 'div',
  forwardedRef,
  padding = false,
  textColor,
  ...restProps
}) => {
  const Element = component || element;

  return (
    <Element
      className={clsx(
        'mvn-block',
        { 'mvn-block-padding': padding },
        background && `mvn-background-color-${background}`,
        textColor && `mvn-text-color-${textColor}`,
        className
      )}
      {...restProps}
      ref={forwardedRef}
    >
      {children}
    </Element>
  );
};

export const BlockF = forwardRef<HTMLElement, AllBlockProps>((props, ref) => (
  <Block {...props} forwardedRef={ref} />
));

type AllBlockProps = BlockProps & AllHTMLAttributes<HTMLElement | SVGElement>;

export interface BlockProps {
  /** Background color for Block */
  background?: BackgroundColor;

  /** Type of component to render. (overwrites element) */
  component?: ReactComponent;

  /** Type of html element to render. */
  element?: InstrinctElement;

  forwardedRef?: Ref<HTMLElement>;

  /** Wether block contains padding */
  padding?: boolean;

  /** Text color for Block */
  textColor?: Color;

  /** In order to work with custom custom components */
  [prop: string]: any;
}
