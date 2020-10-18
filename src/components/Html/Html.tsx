import clsx from 'clsx';
import React, {
  AnchorHTMLAttributes,
  FC,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes
} from 'react';
import { Block, BlockProps } from '../Block';
import { BackgroundColor, Color } from '../../types';
import classes from './html.module.scss';

function createHtmlElement<
  P extends HTMLAttributes<HTMLElement>,
  E = HTMLElement
>(tagName: keyof JSX.IntrinsicElements) {
  const Element: FC<P & BlockProps & { forwardedRef: any }> = ({
    children,
    className,
    component,
    element,
    forwardedRef,
    padding,
    ...props
  }) => (
    <Block
      {...props}
      className={clsx(classes[tagName], className)}
      element={tagName}
      ref={forwardedRef}
    >
      {children}
    </Block>
  );

  return forwardRef<E, P>((props, ref) => (
    <Element {...props} forwardedRef={ref} />
  ));
}

export const A = createHtmlElement<
  AnchorHTMLAttributes<HTMLAnchorElement> & TextColorStylingProps,
  HTMLAnchorElement
>('a');
export const H1 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h1');
export const H2 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h2');
export const H3 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h3');
export const H4 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h4');
export const H5 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h5');
export const H6 = createHtmlElement<
  HTMLAttributes<HTMLHeadingElement> & ExtendedStylingProps,
  HTMLHeadingElement
>('h6');
export const Li = createHtmlElement<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>('li');
export const Ol = createHtmlElement<
  OlHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>('ol');
export const P = createHtmlElement<
  HTMLAttributes<HTMLParagraphElement> & ExtendedStylingProps,
  HTMLParagraphElement
>('p');
export const Span = createHtmlElement<
  HTMLAttributes<HTMLSpanElement> & ExtendedStylingProps,
  HTMLSpanElement
>('span');
export const Ul = createHtmlElement<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>('ul');

interface ExtendedStylingProps {
  /** Background color for Block */
  background?: BackgroundColor;

  /** Text color for Block */
  textColor?: Color | 'inherit';
}

interface TextColorStylingProps {
  /** Text color for Block */
  textColor?: Color | 'inherit';
}
